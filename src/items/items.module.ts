import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Item } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './providers/items.service';
import { ItemsAnalyticsProvider } from './providers/items-analytics.provider';

import jwtConfig from 'src/auth/config/jwt.config';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { Claim } from 'src/claims/claim.entity';

@Module({
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([Claim, Item]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsAnalyticsProvider],
  exports: [ItemsService],
})
export class ItemsModule {}
