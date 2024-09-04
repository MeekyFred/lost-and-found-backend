import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

/**
 * Claims param DTO
 */
export class GetClaimsParamDto {
  /**
   * Claim ID
   * @example 1
   */
  @ApiPropertyOptional({ description: 'Claim id', example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly id: number;
}
