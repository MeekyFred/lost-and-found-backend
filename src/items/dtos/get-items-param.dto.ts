import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

/**
 * Items param DTO
 */
export class GetItemsParamDto {
  /**
   * Claim ID
   * @example "id"
   */
  @ApiPropertyOptional({ description: 'Item id', example: 'id' })
  @IsString()
  @IsOptional()
  readonly id?: string;
}
