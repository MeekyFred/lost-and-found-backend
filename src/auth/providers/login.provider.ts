import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { HashingProvider } from './hashing.provider';
import jwtConfig from '../config/jwt.config';
import { LoginDto } from '../dtos/login.dto';

import { UsersService } from 'src/users/providers/users.service';
import { IActiveUser } from '../interfaces/active-user.interface';

/**
 * Login provider
 */
@Injectable()
export class LoginProvider {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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

    const payload: IActiveUser = { sub: user.id, email: user.email };

    const options: JwtSignOptions = {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.accessTokenTTL,
    };

    const accessToken = this.jwtService.signAsync(payload, options);

    return accessToken;
  }
}
