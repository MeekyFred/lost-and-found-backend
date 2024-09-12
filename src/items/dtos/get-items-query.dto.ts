import { IsDate, IsEnum, IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

import { ItemCategory } from '../enums/itemCategory.enum';
import { ItemStatus } from '../enums/itemStatus.enum';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { Type } from 'class-transformer';

/**
 * Base Data transfer object for getting items
 */
class GetItemsBaseDto {
  /**
   * The search query
   */
  @IsString()
  @IsOptional()
  search?: string;

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
  category?: ItemCategory;

  /**
   * The start of the date range (from)
   */
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  from?: Date;

  /**
   * The end of the date range (to)
   */
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  to?: Date;
}

/**
 * Final Data transfer object for getting items
 */
export class GetItemsQueryDto extends IntersectionType(
  GetItemsBaseDto,
  PaginationQueryDto,
) {}
