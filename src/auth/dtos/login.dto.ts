import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for logging in
 */
export class LoginDto {
  /**
   * The email of the user
   * @example johndoe@example.com
   */
  @ApiProperty({
    type: String,
    required: true,
    format: 'email',
    description: 'The email of the user',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  /**
   * The password of the user
   * @example Password123@
   */
  @ApiProperty({
    type: String,
    required: true,
    description: 'The password of the user',
    example: 'password123@',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
