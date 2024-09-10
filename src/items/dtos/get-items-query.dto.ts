import { IsDate, IsEnum, IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

import { ItemStatus } from '../enums/itemStatus.enum';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

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
  category?: string;

  /**
   * The from date range query
   */
  @IsDate()
  // @IsISO8601()
  @IsOptional()
  dateFound?: Date;
}

/**
 * Final Data transfer object for getting items
 */
export class GetItemsQueryDto extends IntersectionType(
  GetItemsBaseDto,
  PaginationQueryDto,
) {}
