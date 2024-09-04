import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';

import { AuthModule } from 'src/auth/auth.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    PaginationModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, FindOneUserByEmailProvider],
  exports: [UsersService],
})
export class UsersModule {}
