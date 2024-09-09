import { Controller, Param, Query } from '@nestjs/common';
import { Body, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateItemDto } from './dtos/create-item.dto';
import { GetItemsQueryDto } from './dtos/get-items-query.dto';
import { GetItemsParamDto } from './dtos/get-items-param.dto';
import { PatchItemDto } from './dtos/patch-item.dto';
import { ItemsService } from './providers/items.service';

import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { createSuccessResponse } from 'src/common/response/utils/success-response.util';

/**
 * Controller for items
 */

@ApiBearerAuth()
@Controller('items')
@ApiTags('Items')
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
    const item = await this.itemsService.create(createItemDto);
    return createSuccessResponse('Item created successfully', true, item);
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
  public async getItems(@Query() getItemsQueryDto: GetItemsQueryDto) {
    const items = await this.itemsService.findAll(getItemsQueryDto);
    return createSuccessResponse('Items fetched successfully', true, items);
  }

  /**
   * Route for handling get item request
   * @param getItemsParamsDto A DTO used to validate incoming GET request params
   * @example HTTP GET /items/1
   * @returns Items
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get an item by id' })
  @ApiResponse({ status: 200, description: 'Item fetched successfully' })
  @ApiParam({
    name: 'getItemsParamsDto',
    required: true,
    type: GetItemsParamDto,
    description: 'Items Param DTO',
    example: { id: 1 },
  })
  public async getItem(@Param() getItemsParamsDto: GetItemsParamDto) {
    const item = await this.itemsService.findOneById(getItemsParamsDto.id);
    return createSuccessResponse('Item fetched successfully', true, item);
  }

  /**
   * Route for handling get item analytics request
   * @example HTTP GET /items/analytics
   * @returns Items analytics
   */
  @Get('analytics/:id')
  @ApiOperation({ summary: 'Get items analytics' })
  @ApiResponse({ status: 200, description: 'Analytics fetched successfully' })
  public async getAnalytics(
    @ActiveUser() user: IActiveUser,
    @Param('id') id: string,
  ) {
    const analytics = await this.itemsService.analytics(user.id, id);
    return createSuccessResponse('Analytics fetched successfully', true, analytics); // prettier-ignore
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
  public async updateItem(@Body() patchItemDto: PatchItemDto) {
    const item = await this.itemsService.update(patchItemDto);
    return createSuccessResponse('Item updated successfully', true, item);
  }
}
