import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { Between, LessThanOrEqual, ILike, MoreThanOrEqual } from 'typeorm';

import { Item } from '../item.entity';
import { CreateItemDto } from '../dtos/create-item.dto';
import { PatchItemDto } from '../dtos/patch-item.dto';
import { GetItemsQueryDto } from '../dtos/get-items-query.dto';
import { ItemCategory } from '../enums/itemCategory.enum';
import { ItemStatus } from '../enums/itemStatus.enum';

import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

/**
 * Service dealing with items. It is used to provide the item data.
 */
@Injectable()
export class ItemsService {
  constructor(
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

  /**
   * The method to create a new item in the database
   * @param createItemDto
   * @returns Item
   * @throws RequestTimeoutException
   */
  public async create(createItemDto: CreateItemDto): Promise<Item> {
    // Create Item
    let newItem = this.itemsRepository.create(createItemDto);

    try {
      // Connect to db to save new item
      newItem = await this.itemsRepository.save(newItem);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save item', {
        description: 'Database connection error',
      });
    }

    return newItem;
  }

  /**
   * The method to get all items from the database
   * @param query GetItemsQueryDto for getting queries
   * @returns Item[]
   * @throws BadRequestException or RequestTimeoutException
   */
  public async findAll(query: GetItemsQueryDto): Promise<Paginated<Item>> {
    const { page, limit, search, from, to, ...otherQueries } = query;

    // Create the ILike query for partial matching on the 'name' field
    const name = search ? ILike(`%${search}%`) : undefined;
    const itemQueries = search ? { ...otherQueries, name } : otherQueries;

    // Filter out undefined, empty string values, and FindOperator instances
    const filteredQueries = Object.entries(itemQueries).filter(([, value]) => {
      // Skip undefined values
      if (value === undefined) return false;

      // If value is a string, check if it's empty
      if (typeof value === 'string') {
        return value.trim() !== ''; // Only keep non-empty strings
      }

      // If value is a FindOperator, allow it
      if (value instanceof FindOperator) {
        return true;
      }

      // Check for valid enum values (ItemCategory or ItemStatus)
      if (
        Object.values(ItemCategory).includes(value as ItemCategory) ||
        Object.values(ItemStatus).includes(value as ItemStatus)
      ) {
        return true;
      }

      // Allow numbers
      return typeof value === 'number';
    });

    // Rebuild the filtered object from entries
    const filters: { [key: string]: any } = Object.fromEntries(filteredQueries);

    // Add date range filtering in a simple way
    if (from && to) {
      filters.dateFound = Between(from, to);
    } else if (from) {
      filters.dateFound = MoreThanOrEqual(from);
    } else if (to) {
      filters.dateFound = LessThanOrEqual(to);
    }

    try {
      // Pass the pagination params and filtered queries to the repository
      const items = await this.paginationProvider.paginateQuery(
        { limit, page },
        this.itemsRepository,
        filters,
        ['claim'],
      );

      return items;
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }
  }

  /**
   * The method to find a single item by ID
   * @param id
   * @returns Item
   * @throws NotFoundException or RequestTimeoutException
   */
  public async findOneById(id: string): Promise<Item> {
    let item = undefined;

    try {
      item = await this.itemsRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!item) {
      throw new NotFoundException('Item id does not exist');
    }

    return item;
  }

  /**
   * The method to update an item in the database
   * @param patchItemDto
   * @returns Item
   * @throws NotFoundException or RequestTimeoutException
   */
  public async update(patchItemDto: PatchItemDto): Promise<Item> {
    const item = await this.findOneById(patchItemDto.id);

    item.name = patchItemDto.name ?? item.name;
    item.category = patchItemDto.category ?? item.category;
    item.description = patchItemDto.description ?? item.description;
    item.status = patchItemDto.status ?? item.status;
    item.imageUrl = patchItemDto.imageUrl ?? item.imageUrl;
    item.locationFound = patchItemDto.locationFound ?? item.locationFound;
    item.dateFound = patchItemDto.dateFound ?? item.dateFound;

    let updatedItem = item;

    try {
      updatedItem = await this.itemsRepository.save(item);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save item', {
        description: 'Database connection error',
      });
    }

    return updatedItem;
  }

  /**
   * The method to get items analytics
   * @returns object
   * @throws RequestTimeoutException
   */
  public async analytics(): Promise<number> {
    let totalItems = 0;

    try {
      totalItems = await this.itemsRepository.count();
    } catch (error) {
      throw new RequestTimeoutException('Failed to fetch items count');
    }

    return totalItems;
  }
}
