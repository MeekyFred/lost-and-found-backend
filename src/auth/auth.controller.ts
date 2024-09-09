import { Body, Controller, Post } from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './providers/auth.service';

import { createSuccessResponse } from 'src/common/response/utils/success-response.util';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

/**
 * Controller for authentication
 */
@Auth(AuthType.None)
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBody({
    required: true,
    type: CreateUserDto,
    description: 'User registration details',
  })
  public async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return createSuccessResponse('User created successfully', true, user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiBody({
    required: true,
    type: LoginDto,
    description: 'User login details',
  })
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return createSuccessResponse('User logged in successfully', true, token);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  public async logout() {
    return 'Logout user';
  }
}
