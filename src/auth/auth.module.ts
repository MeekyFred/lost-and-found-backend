import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { HashingProvider } from './providers/hashing.provider';
import { LoginProvider } from './providers/login.provider';
import { GoogleAuthController } from './social/google-auth.controller';
import { GoogleAuthService } from './social/providers/google-auth.service';
import { UsersModule } from '../users/users.module';

/**
 * Module to handle authentication
 */
@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
    LoginProvider,
    GenerateTokensProvider,
    GoogleAuthService,
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
