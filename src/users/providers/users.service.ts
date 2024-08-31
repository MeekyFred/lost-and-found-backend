import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

/**
 * Service dealing with users. It is used to provide the user data.
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * The method to create a new user in the database
   * @param createUserDto
   * @returns newUser
   */
  public async create(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      // Connect to db to find user
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // Might save the details of the exception to db or log
      // Information which is sensitive
      throw new RequestTimeoutException(' ', {
        description: 'Database connection error',
      });
    }

    // Check if user already exists with same email
    // Handle exception
    if (existingUser) {
      throw new BadRequestException('User already exists. Use another email.');
    }

    // Create User
    let newUser = this.userRepository.create(createUserDto);

    try {
      // Connect to db to save new user
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save user', {
        description: 'Database connection error',
      });
    }

    return newUser;
  }

  /**
   * The method to get all users from the database
   * @param query GetPostsQueryDto for getting queries
   * @returns User[]
   */
  public async findAll(query: GetUsersQueryDto): Promise<Paginated<User>> {
    const { page, limit } = query;

    try {
      // prettier-ignore
      const users = await this.paginationProvider.paginateQuery({ limit, page }, this.userRepository);

      return users;
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }
  }

  /**
   * The method to find a single user by ID
   * @param id
   * @returns an empty array or an array of found user
   */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!user) {
      throw new NotFoundException('User id does not exist');
    }

    return user;
  }
}
