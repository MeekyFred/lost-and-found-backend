import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import jwtConfig from '../config/jwt.config';
import { IActiveUser } from '../interfaces/active-user.interface';

import { User } from 'src/users/user.entity';

/**
 * Service to generate tokens
 */
@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Sign a token
   * @param userId
   * @param expiresIn
   * @param payload
   * @returns token
   */
  public async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    const payloadData = { id: userId, ...payload };

    const options: JwtSignOptions = {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn,
    };

    const accessToken = await this.jwtService.signAsync(payloadData, options);

    return accessToken;
  }

  /**
   * Generate tokens
   * @param user
   * @returns tokens
   */
  public async generateTokens(user: User) {
    const payload: Partial<IActiveUser> = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.jwtConfiguration.accessTokenTTL, payload),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL),
    ]);
    return { accessToken, refreshToken };
  }
}
