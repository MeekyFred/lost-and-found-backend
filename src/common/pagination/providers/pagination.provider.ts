import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    private readonly configService: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    queryConditions?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<Paginated<T>> {
    const { limit, page } = paginationQuery;
    let results: T[] = [];

    try {
      const found = await repository.find({
        where: queryConditions,
        relations: relations || [],
        skip: (page - 1) * limit,
        take: limit,
      });

      if (found) {
        results = found;
      }
    } catch (error) {
      throw new ConflictException(error);
    }

    const protocol = this.request.protocol;
    const host = this.request.headers.host;
    const baseURL = `${protocol}://${host}/`;
    const newUrl = new URL(this.request.url, baseURL);
    const { origin, pathname } = newUrl;

    const total = await repository.count({ where: queryConditions });
    const pages = Math.ceil(total / limit);
    const nextPage = page === pages ? page : page + 1;
    const previousPage = page === 1 ? page : page - 1;

    const response: Paginated<T> = {
      apiVersion: this.configService.get('appConfig.apiVersion'),
      message: `Data fetched successfully`,
      success: true,
      data: results,
      meta: { page, limit, total, pages },
      links: {
        first: `${origin}${pathname}?limit=${limit}&page=1`,
        last: `${origin}${pathname}?limit=${limit}&page=${pages}`,
        current: `${origin}${pathname}?limit=${limit}&page=${page}`,
        next: `${origin}${pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${origin}${pathname}?limit=${limit}&page=${previousPage}`,
      },
    };

    return response;
  }
}
