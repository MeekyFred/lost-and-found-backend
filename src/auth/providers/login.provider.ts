import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';

import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';
import { LoginDto } from '../dtos/login.dto';

import { UserRole } from 'src/users/enums/user-role.enum';
import { UsersService } from 'src/users/providers/users.service';

/**
 * Login provider
 */
@Injectable()
export class LoginProvider {
  constructor(
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly hashingProvider: HashingProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Sign in a user
   * @param loginDto
   * @returns boolean
   * @throws RequestTimeoutException or UnauthorizedException
   */
  public async login(loginDto: LoginDto) {
    // Find user by email
    const user = await this.usersService.findOneByEmail(loginDto.email);

    // Compare password hash
    let isMatch: boolean = false;

    try {
      // prettier-ignore
      isMatch = await this.hashingProvider.comparePassword(loginDto.password, user.password);
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Failed to compare passowrd',
      });
    }

    if (!isMatch) {
      throw new UnauthorizedException('Incorect password');
    }

    // Generate access token and refresh token
    const tokens = await this.generateTokensProvider.generateTokens(user);

    return tokens;
  }

  /**
   * Sign in an admin
   * @param loginDto
   * @returns boolean
   * @throws RequestTimeoutException or UnauthorizedException
   */
  public async adminLogin(loginDto: LoginDto) {
    // Find user by email
    const user = await this.usersService.findOneByEmail(loginDto.email);

    // Compare password hash
    let isMatch: boolean = false;

    try {
      // prettier-ignore
      isMatch = await this.hashingProvider.comparePassword(loginDto.password, user.password);
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Failed to compare passowrd',
      });
    }

    if (!isMatch) {
      throw new UnauthorizedException('Incorect password');
    }

    if (user.role === UserRole.USER) {
      throw new UnauthorizedException('Not authorized to login as user');
    }

    // Generate access token and refresh token
    const tokens = await this.generateTokensProvider.generateTokens(user);

    return tokens;
  }
}
