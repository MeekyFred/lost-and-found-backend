import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RequestTimeoutException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class UpdateUserProvider {
  constructor(
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * The method to update a new user in the database
   * @param patchUserDto
   * @returns User
   * @throws RequestTimeoutException or BadRequestException
   */
  public async updateUser(patchUserDto: PatchUserDto): Promise<User> {
    const { id } = patchUserDto;

    let user = undefined;

    try {
      user = await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const password = patchUserDto.password
      ? await this.hashingProvider.hashPassword(patchUserDto.password)
      : user.password;

    user.firstName = patchUserDto.firstName ?? user.firstName;
    user.lastName = patchUserDto.lastName ?? user.lastName;
    user.email = patchUserDto.email ?? user.email;
    user.role = patchUserDto.role ?? user.role;
    user.phoneNumber = patchUserDto.phoneNumber ?? user.phoneNumber;
    user.password = password;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save user', {
        description: 'Database connection error',
      });
    }

    return user;
  }
}
