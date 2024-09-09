import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

/**
 * Data transfer object (DTO) for updating a user.
 */
export class PatchUserDto extends PartialType(CreateUserDto) {
  /**
   * The ID of the user.
   * @example dfej45-3fj3-3fj3-3fj3
   */
  @ApiProperty({
    type: 'string',
    required: true,
    readOnly: true,
    format: 'string',
    description: 'The ID of the user',
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
