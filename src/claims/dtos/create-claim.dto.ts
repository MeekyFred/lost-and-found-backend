import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsNotEmpty } from 'class-validator';

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
  @IsDate()
  @IsNotEmpty()
  readonly dateLost: Date;

  /**
   * The id of the item
   * @example ab123-cd456-ef789
   */
  @ApiProperty({
    type: 'string',
    required: true,
    format: 'string',
    description: 'The id of the item',
    example: 'ab123-cd456-ef789',
  })
  @IsNotEmpty()
  @IsString()
  readonly itemId: string;

  /**
   * The id of the user
   * @example ef456-gh789-ij012
   */
  @ApiProperty({
    type: 'string',
    required: true,
    format: 'string',
    description: 'The id of the user',
    example: 'ef456-gh789-ij012',
  })
  @IsNotEmpty()
  @IsString()
  readonly authorId: string;
}
