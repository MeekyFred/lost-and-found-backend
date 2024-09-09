import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

/**
 * Claims param DTO
 */
export class GetClaimsParamDto {
  /**
   * Claim ID
   * @example 1
   */
  @ApiPropertyOptional({ description: 'Claim id', example: 1 })
  @IsString()
  @IsOptional()
  readonly id: string;
}
