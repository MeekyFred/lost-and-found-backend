import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { HashingProvider } from './hashing.provider';
import { LoginProvider } from './login.provider';
import { LoginDto } from '../dtos/login.dto';
import { VerifyEmailDto } from '../dtos/verify-email.dto';

import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
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
    private readonly hashingProvider: HashingProvider,
    private readonly loginProvider: LoginProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * The method to register a new user
   * @param createUserDto The user registration details
   * @returns The registered user
   */
  public async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
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
   * The method to login an admin
   * @param loginDto The user login details
   * @returns The logged in user
   */
  public async adminLogin(loginDto: LoginDto) {
    return await this.loginProvider.adminLogin(loginDto);
  }

  /**
   * The method to validate a user
   * @param loginDto The username of the user
   * @returns The user if found, otherwise null
   */
  public async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    // prettier-ignore
    const isMatch = await this.hashingProvider.comparePassword(loginDto.password, user.password);

    if (user && isMatch) {
      return user;
    }

    return null;
  }

  /**
   * The method to logout a user
   * @returns A message indicating the user has been logged out
   */
  public async logout() {
    return 'Logout user';
  }

  /**
   * The method to verify
   * @param verifyEmailDto The username of the user
   * @returns The user if found, otherwise null
   */
  public async verify(verifyEmailDto: VerifyEmailDto): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(verifyEmailDto.email);

    // prettier-ignore
    const isTokenMatch = user.verifyToken === verifyEmailDto.token;

    if (user && isTokenMatch) {
      user.isEmailVerified = true;
      this.usersService.save(user);
      return true;
    }

    return false;
  }
}
