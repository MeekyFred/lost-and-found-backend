import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateItemDto } from './create-item.dto';

/**
 * Represents the data transfer object for patching an item.
 */
export class PatchItemDto extends PartialType(CreateItemDto) {
  /**
   * The ID of the item.
   * @example 1
   */
  @ApiProperty({
    type: 'number',
    required: true,
    readOnly: true,
    format: 'number',
    description: 'The ID of the item',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
