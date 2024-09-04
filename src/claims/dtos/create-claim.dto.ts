import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty } from 'class-validator';

/**
 * Represents the data transfer object for creating a claim.
 */
export class CreateClaimDto {
  /**
   * Date item was lost
   * @example 2021-09-01
   */
  @ApiProperty({
    type: 'date',
    required: true,
    format: 'date',
    description: 'Date item was lost',
    example: '2021-09-01',
  })
  @IsISO8601()
  @IsNotEmpty()
  readonly dateLost: Date;
}
