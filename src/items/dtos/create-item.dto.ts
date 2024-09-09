import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsString, IsUrl } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { MaxLength, MinLength } from 'class-validator';
import { ItemStatus } from '../enums/itemStatus.enum';

/**
 * Data transfer object for creating an item
 */
export class CreateItemDto {
  /**
   * Item name
   * @example iPhone 12 Pro
   */
  @ApiProperty({
    type: 'string',
    required: true,
    format: 'string',
    description: 'User name',
    example: 'iPhone 12 Pro',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  readonly name: string;

  /**
   * Category of item
   * @example Electronics
   */
  @ApiProperty({
    type: 'string',
    required: true,
    format: 'string',
    description: 'Category of item',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  readonly category: string;

  /**
   * Description of tag
   * @example This is a description.
   */
  @ApiProperty({
    type: 'string',
    required: false,
    format: 'string',
    description: 'Description of item',
    example: 'This is an iPhone 12 Pro.',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  /**
   * Status of item
   * @example UNCLAIMED
   */
  @ApiProperty({
    type: 'enum',
    required: true,
    format: 'enum',
    description: 'Status of item',
    example: 'UNCLAIMED',
  })
  @IsEnum(ItemStatus)
  @IsNotEmpty()
  status: ItemStatus;

  /**
   * Item image URL
   * @example https://example.com/image.jpg
   */
  @ApiProperty({
    type: 'url',
    required: true,
    format: 'url',
    description: 'Featured image URL of tag',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  @MaxLength(1024)
  readonly imageUrl: string;

  /**
   * Location where item was found
   * @example Lagos
   */

  @ApiProperty({
    type: 'string',
    required: true,
    format: 'string',
    description: 'Location where item was found',
    example: 'Lagos',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  readonly locationFound: string;

  /**
   * Date item was found
   * @example 2021-09-01
   */
  @ApiProperty({
    type: 'date',
    required: true,
    format: 'date',
    description: 'Date item was found',
    example: '2021-09-01',
  })
  @IsISO8601()
  @IsNotEmpty()
  readonly dateFound: Date;
}
