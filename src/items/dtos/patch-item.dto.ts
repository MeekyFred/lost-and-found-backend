import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
    type: 'string',
    required: true,
    readOnly: true,
    format: 'string',
    description: 'The ID of the item',
    example: 'id',
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
