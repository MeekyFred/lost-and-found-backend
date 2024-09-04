import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Claim } from '../claim.entity';
import { CreateClaimDto } from '../dtos/create-claim.dto';
import { GetClaimsQueryDto } from '../dtos/get-claims-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

/**
 * Service dealing with claims. It is used to provide the claim data.
 */
@Injectable()
export class ClaimsService {
  constructor(
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
  ) {}

  /**
   * The method to create a new item in the database
   * @param createItemDto
   * @returns Item
   * @throws RequestTimeoutException
   */
  public async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    // Create Claim
    let newClaim = this.claimRepository.create(createClaimDto);

    try {
      // Connect to db to save new claim
      newClaim = await this.claimRepository.save(newClaim);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save claim', {
        description: 'Database connection error',
      });
    }

    return newClaim;
  }

  /**
   * The method to get all claims from the database
   * @param query GetClaimsQueryDto for getting queries
   * @returns Item[]
   * @throws BadRequestException or RequestTimeoutException
   */
  public async findAll(query: GetClaimsQueryDto): Promise<Paginated<Claim>> {
    const { page, limit, ...queries } = query;

    const filters = Object.keys(queries).length ? queries : undefined;

    try {
      // prettier-ignore
      const claims = await this.paginationProvider.paginateQuery({ limit, page }, this.claimRepository, filters);

      return claims;
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }
  }

  /**
   * The method to find a single claim by ID
   * @param id
   * @returns Claim
   * @throws NotFoundException or RequestTimeoutException
   */
  public async findOneById(id: number): Promise<Claim> {
    let claim = undefined;

    try {
      claim = await this.claimRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!claim) {
      throw new NotFoundException('Claim id does not exist');
    }

    return claim;
  }
}
