import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { GoogleUser } from '../interfaces/google-user-interface';

import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

/**
 * Service dealing with users. It is used to provide the user data.
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly paginationProvider: PaginationProvider,
    private readonly findOneByEmailProvider: FindOneUserByEmailProvider,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * The method to create a new user in the database
   * @param createUserDto
   * @returns newUser
   */
  public async create(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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
      const users = await this.paginationProvider.paginateQuery({ limit, page }, this.usersRepository);

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
   * @returns User
   * @throws RequestTimeOutException or NotFoundException
   */
  public async findOneById(id: string): Promise<User> {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
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

  /**
   * The method to find a single user by ID
   * @param id
   * @returns User
   * @throws RequestTimeOutException or UnauthorizedException
   */
  public async findOneByEmail(email: string): Promise<User> {
    return await this.findOneByEmailProvider.findOneByEmail(email);
  }

  /**
   * The method to find a single user by ID
   * @param id
   * @returns User
   * @throws RequestTimeOutException or NotFoundException
   */
  public async findOneBy(operator: FindOptionsWhere<User>) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ ...operator });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  /**
   * The method to find a single user by googleId
   * @param googleId
   * @returns User
   */
  public async findOneByGoogleId(googleId: string) {
    return await this.usersRepository.findOneBy({ googleId });
  }

  /**
   * The method to create a new user using Google OAuth
   * @param googleUser
   * @returns User
   * @throws ConflictException
   */
  public async createGoogleUser(googleUser: GoogleUser) {
    try {
      const user = this.usersRepository.create({
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        googleId: googleUser.googleId,
        email: googleUser.email,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Could not create a new user',
      });
    }
  }
}
