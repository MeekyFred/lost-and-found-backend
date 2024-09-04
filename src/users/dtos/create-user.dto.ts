import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Matches, MaxLength, MinLength } from 'class-validator';

/**
 * Data transfer object for creating a user
 */
export class CreateUserDto {
  /**
   * User first name
   * @example John
   */
  @ApiProperty({ description: 'User first name', example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  readonly firstName: string;

  /**
   * User last name
   * @example Doe
   */
  @ApiPropertyOptional({ description: 'User last name', example: 'Doe' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  readonly lastName?: string;

  /**
   * User email
   * @example johndoe@example.com
   */
  @ApiProperty({ description: 'User email', example: 'johndoe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  readonly email: string;

  /**
   * User phone number
   * @example 08012345678
   */
  @ApiProperty({ description: 'User phone number', example: '08012345678' })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  /**
   * User password
   * @example password123@
   */
  @ApiProperty({ description: 'User password', example: 'password123@' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  readonly password: string;
}
