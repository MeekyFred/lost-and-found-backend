import { IsBoolean, IsEnum, IsISO8601, IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

import { ItemStatus } from '../enums/itemStatus.enum';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * Base Data transfer object for getting items
 */
class GetItemsBaseDto {
  /**
   * The status query
   */
  @IsEnum(ItemStatus)
  @IsOptional()
  status?: ItemStatus;

  /**
   * The category query
   */
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * The archived query
   */
  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;

  /**
   * The from date range query
   */
  @IsISO8601()
  @IsOptional()
  from?: Date;

  /**
   * The to date range query
   */
  @IsISO8601()
  @IsOptional()
  to?: Date;
}

/**
 * Final Data transfer object for getting items
 */
export class GetItemsQueryDto extends IntersectionType(
  GetItemsBaseDto,
  PaginationQueryDto,
) {}
