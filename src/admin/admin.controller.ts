import { Controller, Body, Query } from '@nestjs/common';
import { Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AdminService } from './providers/admin.service';

import { GetClaimsQueryDto } from 'src/claims/dtos/get-claims-query.dto';
import { PatchClaimDto } from 'src/claims/dtos/patch-claim.dto';
import { createSuccessResponse } from 'src/common/response/utils/success-response.util';
import { CreateItemDto } from 'src/items/dtos/create-item.dto';
import { PatchItemDto } from 'src/items/dtos/patch-item.dto';
import { GetUsersQueryDto } from 'src/users/dtos/get-users-query.dto';

@ApiBearerAuth()
@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Route for handling get analytics request
   * @example HTTP GET /admin/analytics
   * @returns Items analytics
   */
  @Get('analytics')
  @ApiOperation({ summary: 'Get analytics' })
  @ApiResponse({ status: 200, description: 'Analytics fetched successfully' })
  public async getAnalytics() {
    const analytics = await this.adminService.analytics();
    return createSuccessResponse('Analytics fetched successfully', true, analytics); // prettier-ignore
  }

  /**
   * Route for handling create item request
   * @example HTTP POST /admin/create-item
   * @param createItemDto
   * @returns Item created successfully
   */
  @Post('create-item')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  public async createItem(@Body() createItemDto: CreateItemDto) {
    const item = await this.adminService.createItem(createItemDto);
    return createSuccessResponse('Item created successfully', true, item); // prettier-ignore
  }

  /**
   * Route for handling patch item request
   * @example HTTP PATCH /admin/update-item
   * @param patchItemDto
   * @returns Item updated successfully
   */
  @Patch('update-item')
  @ApiOperation({ summary: 'Update item' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  public async updateItem(@Body() patchItemDto: PatchItemDto) {
    const item = await this.adminService.updateItem(patchItemDto);
    return createSuccessResponse('Item updated successfully', true, item); // prettier-ignore
  }

  /**
   * Route for handling get users request
   * @example HTTP POST /admin/users
   * @param getUsersQueryDto
   * @returns Users fetched successfully
   */
  @Get('users')
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  public async getUsers(@Query() getUsersQueryDto: GetUsersQueryDto) {
    return await this.adminService.getUsers(getUsersQueryDto);
  }

  /**
   * Route for handling get claims request
   * @example HTTP POST /admin/claims
   * @param getClaimsQueryDto
   * @returns Claims fetched successfully
   */
  @Get('claims')
  @ApiOperation({ summary: 'Get claims' })
  @ApiResponse({ status: 200, description: 'Claims fetched successfully' })
  public async getClaims(@Query() getClaimsQueryDto: GetClaimsQueryDto) {
    return await this.adminService.getClaims(getClaimsQueryDto);
  }

  /**
   * Route for handling patch claim request
   * @example HTTP PATCH /admin/update-claim
   * @param patchClaimDto
   * @returns Claim updated successfully
   */
  @Patch('update-claim')
  @ApiOperation({ summary: 'Update claim' })
  @ApiResponse({ status: 200, description: 'Claim updated successfully' })
  public async updateClaim(@Body() patchClaimDto: PatchClaimDto) {
    const claim = await this.adminService.updateClaim(patchClaimDto);
    return createSuccessResponse('Claim updated successfully', true, claim); // prettier-ignore
  }
}
