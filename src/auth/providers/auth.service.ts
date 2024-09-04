import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { LoginProvider } from './login.provider';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

import { UsersService } from 'src/users/providers/users.service';

/**
 * Service to handle authentication
 */
@Injectable()
export class AuthService {
  /**
   * Constructor of Auth service
   * @description Injects LoginProvider
   */
  constructor(
    private readonly loginProvider: LoginProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * The method to register a new user
   * @param registerDto The user registration details
   * @returns The registered user
   */
  public async register(registerDto: RegisterDto) {
    return registerDto;
  }

  /**
   * The method to login a user
   * @param loginDto The user login details
   * @returns The logged in user
   */
  public async login(loginDto: LoginDto) {
    return await this.loginProvider.login(loginDto);
  }

  /**
   * The method to logout a user
   * @returns A message indicating the user has been logged out
   */
  public async logout() {
    return 'Logout user';
  }
}
