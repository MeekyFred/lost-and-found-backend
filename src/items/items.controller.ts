import { Controller, Query } from '@nestjs/common';
import { Body, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateItemDto } from './dtos/create-item.dto';
import { PatchItemDto } from './dtos/patch-item.dto';
import { GetItemsQueryDto } from './dtos/get-items-query.dto';
import { ItemsService } from './providers/items.service';

/**
 * Controller for items
 */
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * Route for handling create item request
   * @param createItemDto A DTO used to validate incoming POST request
   * @example HTTP POST /item
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  @ApiBody({
    required: true,
    type: CreateItemDto,
    description: 'Item creation details',
  })
  public async createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  /**
   * Route for handling get items request
   * @param getItemsQueryDto A DTO used to validate incoming GET request queries
   * @example HTTP GET /items
   * @returns Items[]
   */
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items fetched successfully' })
  @ApiQuery({
    name: 'getItemsQueryDto',
    required: false,
    type: GetItemsQueryDto,
    description: 'Items Query DTO',
    example: { page: 1, limit: 10 },
  })
  public getItems(@Query() getItemsQueryDto: GetItemsQueryDto) {
    return this.itemsService.findAll(getItemsQueryDto);
  }

  /**
   * Route for handling patch item request
   * @param patchItemDto A DTO used to validate incoming PATCH request
   * @example HTTP PATCH /item
   * @returns response
   */
  @Patch()
  @ApiOperation({ summary: 'Update a item' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiBody({
    required: true,
    type: PatchItemDto,
    description: 'Item update details',
  })
  public updateItem(@Body() patchItemDto: PatchItemDto) {
    return this.itemsService.update(patchItemDto);
  }
}
