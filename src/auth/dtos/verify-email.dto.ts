import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
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
  email: string;

  /**
   * The generated token
   * @example 24735rebufiwt
   */
  @ApiProperty({
    required: true,
    description: 'The generated token',
    example: '24735rebufiwt',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
