import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    queryConditions?: FindOptionsWhere<T>,
  ): Promise<Paginated<T>> {
    const { limit, page } = paginationQuery;

    let results: T[] = [];

    try {
      const found = await repository.find({
        where: queryConditions,
        skip: (page - 1) * limit,
        take: limit,
      });

      results = found;
    } catch (error) {}

    if (!results) {
      throw new BadRequestException('Adjust page and limit query', {
        description: 'Posts not found',
      });
    }

    const protocol = this.request.protocol;
    const host = this.request.headers.host;
    const baseURL = `${protocol}://${host}/`;
    const newUrl = new URL(this.request.url, baseURL);
    const { origin, pathname } = newUrl;

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = await repository.count({ where: queryConditions });
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page === totalPages ? page : page + 1;
    const previousPage = page === 1 ? page : page - 1;

    const response: Paginated<T> = {
      data: results,
      meta: { currentPage, itemsPerPage, totalItems, totalPages },
      links: {
        first: `${origin}${pathname}?limit=${limit}&page=1`,
        last: `${origin}${pathname}?limit=${limit}&page=${totalPages}`,
        current: `${origin}${pathname}?limit=${limit}&page=${page}`,
        next: `${origin}${pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${origin}${pathname}?limit=${limit}&page=${previousPage}`,
      },
    };

    return response;
  }
}
