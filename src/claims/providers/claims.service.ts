import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Claim } from '../claim.entity';
import { CreateClaimDto } from '../dtos/create-claim.dto';
import { GetClaimsQueryDto } from '../dtos/get-claims-query.dto';
import { PatchClaimDto } from '../dtos/patch-claim.dto';

import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { ItemsService } from 'src/items/providers/items.service';
import { ItemStatus } from 'src/items/enums/itemStatus.enum';
import { UsersService } from 'src/users/providers/users.service';

/**
 * Service dealing with claims. It is used to provide the claim data.
 */
@Injectable()
export class ClaimsService {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
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
    // Find user by id
    const user = await this.usersService.findOneById(createClaimDto.authorId);

    // Find item by id
    const item = await this.itemsService.findOneById(createClaimDto.itemId);

    let newClaim: Claim;

    try {
      // Transaction to ensure atomicity
      await this.claimRepository.manager.transaction(async (entityManager) => {
        // Create and save the new claim
        newClaim = this.claimRepository.create({
          dateLost: createClaimDto.dateLost,
          author: user,
          item,
        });
        newClaim = await entityManager.save(newClaim);

        // Update item status and associate claim
        item.status = ItemStatus.PROCESSING;
        item.claim = newClaim;
        await entityManager.save(item);

        // Update user with new claim
        user.claims = user.claims ? [...user.claims, newClaim] : [newClaim];
        await entityManager.save(user);
      });
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
      const claims = await this.paginationProvider.paginateQuery(
        { limit, page },
        this.claimRepository,
        filters,
        ['item'],
      );

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
  public async findOneById(id: string): Promise<Claim> {
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

  /**
   * The method to update a claim in the database
   * @param patchClaimDto
   * @returns Claim
   * @throws NotFoundException or RequestTimeoutException
   */
  public async update(patchClaimDto: PatchClaimDto): Promise<Claim> {
    const claim = await this.findOneById(patchClaimDto.id);

    claim.status = patchClaimDto.status ?? claim.status;

    let updatedClaim = claim;

    try {
      updatedClaim = await this.claimRepository.save(claim);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save item', {
        description: 'Database connection error',
      });
    }

    return updatedClaim;
  }

  /**
   * The method to get claims analytics
   * @returns object
   * @throws RequestTimeoutException
   */
  public async analytics(): Promise<number> {
    let totalClaims = 0;

    try {
      totalClaims = await this.claimRepository.count();
    } catch (error) {
      throw new RequestTimeoutException('Failed to fetch claims count');
    }

    return totalClaims;
  }
}
