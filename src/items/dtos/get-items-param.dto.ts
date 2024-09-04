import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

/**
 * Items param DTO
 */
export class GetItemsParamDto {
  /**
   * Claim ID
   * @example 1
   */
  @ApiPropertyOptional({ description: 'Item id', example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly id: number;
}
