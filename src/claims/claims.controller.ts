import { Controller, Param, Query } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateClaimDto } from './dtos/create-claim.dto';
import { GetClaimsParamDto } from './dtos/get-claims-param.dto';
import { GetClaimsQueryDto } from './dtos/get-claims-query.dto';
import { ClaimsService } from './providers/claims.service';

import { createSuccessResponse } from 'src/common/response/utils/success-response.util';

/**
 * Controller for Claims
 */
@ApiBearerAuth()
@Controller('claims')
@ApiTags('Claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  /**
   * Route for handling create claim request
   * @param createClaimDto A DTO used to validate incoming POST request
   * @example HTTP POST /claim
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Create a new claim' })
  @ApiResponse({ status: 201, description: 'Claim created successfully' })
  @ApiBody({
    required: true,
    type: CreateClaimDto,
    description: 'Claim creation details',
  })
  public async createClaim(@Body() createClaimDto: CreateClaimDto) {
    const claim = await this.claimsService.create(createClaimDto);
    return createSuccessResponse('Claim created successfully', true, claim);
  }

  /**
   * Route for handling get claims request
   * @param getClaimsQueryDto A DTO used to validate incoming GET request queries
   * @example HTTP GET /claims
   * @returns Claim[]
   */
  @Get()
  @ApiOperation({ summary: 'Get all claims' })
  @ApiResponse({ status: 200, description: 'Claims fetched successfully' })
  @ApiQuery({
    name: 'getClaimsQueryDto',
    required: false,
    type: GetClaimsQueryDto,
    description: 'Claims Query DTO',
    example: { page: 1, limit: 10 },
  })
  public async getClaims(@Query() getClaimsQueryDto: GetClaimsQueryDto) {
    const claims = await this.claimsService.findAll(getClaimsQueryDto);
    return createSuccessResponse('Claims fetched successfully', true, claims);
  }

  /**
   * Route for handling get claim request
   * @param getClaimsQueryDto A DTO used to validate incoming GET request params
   * @example HTTP GET /claims/1
   * @returns Claim
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a claim by id' })
  @ApiResponse({ status: 200, description: 'Claim fetched successfully' })
  @ApiParam({
    name: 'getClaimsQueryDto',
    required: true,
    type: GetClaimsParamDto,
    description: 'Claim Param DTO',
    example: { id: 1 },
  })
  public async getItem(@Param() getClaimsQueryDto: GetClaimsParamDto) {
    const claim = await this.claimsService.findOneById(getClaimsQueryDto.id);
    return createSuccessResponse('Claim fetched successfully', true, claim);
  }
}
