import { Injectable } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../item.entity';

/**
 * Service dealing with items analytics. It is used to provide the item analytics data.
 */
@Injectable()
export class ItemsAnalyticsProvider {
  // This is a placeholder class for a real analytics provider
  // that would be used to track analytics for the items module
  // and its related entities
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

  public async analytics(): Promise<any> {
    let totalItems = 0;

    try {
      totalItems = await this.itemsRepository.count().catch((error) => {
        console.error('Items error: ', error);
        return 0; // Return 0 if it fails
      });
    } catch (error) {
      throw new RequestTimeoutException('Failed to fetch items count');
    }

    return totalItems;
  }
}
