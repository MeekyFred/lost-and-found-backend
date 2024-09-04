import { IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * Base Data transfer object for getting users
 */
class GetUsersBaseDto {
  /**
   * The name query
   */
  @IsString()
  @IsOptional()
  name?: string;
}

/**
 * Final Data transfer object for getting users
 */
export class GetUsersQueryDto extends IntersectionType(
  GetUsersBaseDto,
  PaginationQueryDto,
) {}
