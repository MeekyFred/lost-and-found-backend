import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { CreateClaimDto } from './create-claim.dto';
import { ClaimStatus } from '../enums/claimStatus.enum';

/**
 * Represents the data transfer object for patching an item.
 */
export class PatchClaimDto extends PartialType(CreateClaimDto) {
  /**
   * The ID of the item.
   * @example id
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

  /**
   * Status of claim
   * @example DECLINED
   */
  @ApiProperty({
    type: 'enum',
    required: true,
    format: 'enum',
    description: 'Status of claim',
    example: 'DECLINED',
  })
  @IsEnum(ClaimStatus)
  @IsNotEmpty()
  status: ClaimStatus;
}
