import { Injectable } from '@nestjs/common';

import { ClaimsService } from 'src/claims/providers/claims.service';
import { ItemsService } from 'src/items/providers/items.service';
import { UsersService } from 'src/users/providers/users.service';

/**
 * Service dealing with analytics. It is used to provide the analytics data.
 */
@Injectable()
export class AnalyticsProvider {
  constructor(
    private readonly claimsService: ClaimsService,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  public async analytics(): Promise<any> {
    let totalClaims = 0;
    let totalItems = 0;
    let totalUsers = 0;

    totalClaims = await this.claimsService.analytics();
    totalItems = await this.itemsService.analytics();
    totalUsers = await this.usersService.analytics();

    return { totalClaims, totalItems, totalUsers };
  }
}
