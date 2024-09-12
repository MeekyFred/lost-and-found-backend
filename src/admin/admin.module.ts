import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './providers/admin.service';
import { AnalyticsProvider } from './providers/analytics.provider';

import { ClaimsModule } from 'src/claims/claims.module';
import { ItemsModule } from 'src/items/items.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ClaimsModule, ItemsModule, PaginationModule, UsersModule],
  controllers: [AdminController],
  providers: [AdminService, AnalyticsProvider],
})
export class AdminModule {}
