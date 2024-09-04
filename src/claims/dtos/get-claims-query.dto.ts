import { IsEnum, IsISO8601, IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

import { ClaimStatus } from '../enums/claimStatus.enum';

import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * Base Data transfer object for getting claims
 */
class GetClaimsBaseDto {
  /**
   * The status query
   */
  @IsEnum(ClaimStatus)
  @IsOptional()
  status?: ClaimStatus;

  /**
   * The dateLost query
   */
  @IsISO8601()
  @IsOptional()
  dateLost?: Date;

  /**
   * The authorName query
   */
  @IsString()
  @IsOptional()
  authorName?: string;
}

/**
 * Final Data transfer object for getting items
 */
export class GetClaimsQueryDto extends IntersectionType(
  GetClaimsBaseDto,
  PaginationQueryDto,
) {}
