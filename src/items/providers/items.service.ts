import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../item.entity';
import { CreateItemDto } from '../dtos/create-item.dto';
import { PatchItemDto } from '../dtos/patch-item.dto';
import { GetItemsQueryDto } from '../dtos/get-items-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

/**
 * Service dealing with items. It is used to provide the item data.
 */
@Injectable()
export class ItemsService {
  constructor(
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  /**
   * The method to create a new item in the database
   * @param createItemDto
   * @returns Item
   * @throws RequestTimeoutException
   */
  public async create(createItemDto: CreateItemDto): Promise<Item> {
    // Create Item
    let newItem = this.itemRepository.create(createItemDto);

    try {
      // Connect to db to save new item
      newItem = await this.itemRepository.save(newItem);
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
    const { page, limit, ...queries } = query;

    const filters = Object.keys(queries).length ? queries : undefined;

    try {
      // prettier-ignore
      const items = await this.paginationProvider.paginateQuery({ limit, page }, this.itemRepository, filters);

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
  public async findOneById(id: number): Promise<Item> {
    let item = undefined;

    try {
      item = await this.itemRepository.findOneBy({ id });
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
   * The method to create a new item in the database
   * @param patchItemDto
   * @returns Item
   * @throws NotFoundException or RequestTimeoutException
   */
  public async update(patchItemDto: PatchItemDto): Promise<void> {
    const item = await this.findOneById(patchItemDto.id);

    item.name = patchItemDto.name ?? item.name;
    item.category = patchItemDto.category ?? item.category;
    item.description = patchItemDto.description ?? item.description;
    item.status = patchItemDto.status ?? item.status;
    item.imageUrl = patchItemDto.imageUrl ?? item.imageUrl;
    item.locationFound = patchItemDto.locationFound ?? item.locationFound;
    item.dateFound = patchItemDto.dateFound ?? item.dateFound;

    try {
      await this.itemRepository.save(item);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save item', {
        description: 'Database connection error',
      });
    }
  }
}
