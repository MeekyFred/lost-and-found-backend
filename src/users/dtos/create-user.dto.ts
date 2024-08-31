import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Matches, MaxLength, MinLength } from 'class-validator';

/**
 * Data transfer object for creating a user
 */
export class CreateUserDto {
  /**
   * User name
   * @example John Doe
   */
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  readonly name: string;

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
