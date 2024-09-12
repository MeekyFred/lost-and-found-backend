import { Injectable } from '@nestjs/common';

import { AnalyticsProvider } from './analytics.provider';

import { Claim } from 'src/claims/claim.entity';
import { GetClaimsQueryDto } from 'src/claims/dtos/get-claims-query.dto';
import { PatchClaimDto } from 'src/claims/dtos/patch-claim.dto';
import { ClaimsService } from 'src/claims/providers/claims.service';
import { Item } from 'src/items/item.entity';
import { CreateItemDto } from 'src/items/dtos/create-item.dto';
import { PatchItemDto } from 'src/items/dtos/patch-item.dto';
import { ItemsService } from 'src/items/providers/items.service';
import { GetUsersQueryDto } from 'src/users/dtos/get-users-query.dto';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly analyticsProvider: AnalyticsProvider,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
    private readonly claimsService: ClaimsService,
  ) {}

  /**
   * The method to get analytics
   * @returns object
   * @throws RequestTimeoutException
   */
  public async analytics(): Promise<any> {
    return await this.analyticsProvider.analytics();
  }

  /**
   * The method to create a new item
   * @param createItemDto
   * @returns Item
   * @throws RequestTimeoutException
   */
  public async createItem(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  /**
   * The method to update an item
   * @param patchItemDto
   * @returns Item
   * @throws RequestTimeoutException
   */
  public async updateItem(patchItemDto: PatchItemDto): Promise<Item> {
    return await this.itemsService.update(patchItemDto);
  }

  /**
   * The method to get all users from the database
   * @param query GetPostsQueryDto for getting queries
   * @returns User[]
   */
  public async getUsers(query: GetUsersQueryDto) {
    return await this.usersService.findAll(query);
  }

  /**
   * The method to get all claims from the database
   * @param query GetClaimsQueryDto for getting queries
   * @returns Claim[]
   */
  public async getClaims(query: GetClaimsQueryDto) {
    return await this.claimsService.findAll(query);
  }

  /**
   * The method to update a claim
   * @param patchClaimDto
   * @returns Item
   * @throws RequestTimeoutException
   */
  public async updateClaim(patchClaimDto: PatchClaimDto): Promise<Claim> {
    return await this.claimsService.update(patchClaimDto);
  }
}
