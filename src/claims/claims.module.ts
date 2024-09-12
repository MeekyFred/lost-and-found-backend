import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Claim } from './claim.entity';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './providers/claims.service';

import { ItemsModule } from 'src/items/items.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ItemsModule,
    UsersModule,
    PaginationModule,
    TypeOrmModule.forFeature([Claim]),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
