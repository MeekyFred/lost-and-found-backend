import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

/**
 * DTO for getting users
 */
export class GetUsersParamDto {
  /**
   * User ID
   * @example 1
   */
  @ApiPropertyOptional({ description: 'User ID', example: 'fgffg5-jdvj5' })
  @IsInt()
  @IsOptional()
  readonly id: string;
}
