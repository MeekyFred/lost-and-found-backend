import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RequestTimeoutException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { generateVerifyToken } from 'src/utils';

@Injectable()
export class CreateUserProvider {
  constructor(
    private readonly mailService: MailService,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /**
   * The method to create a new user in the database
   * @param createUserDto
   * @returns User
   * @throws RequestTimeoutException or BadRequestException
   */
  public async createUser(createUserDto: CreateUserDto) {
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

    // prettier-ignore
    const password = await this.hashingProvider.hashPassword(createUserDto.password);

    const verifyToken = generateVerifyToken(32);

    // Create User
    let newUser = this.userRepository.create({ ...createUserDto, password, verifyToken }); // prettier-ignore

    try {
      // Connect to db to save new user
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save user', {
        description: 'Database connection error',
      });
    }

    // Send welcome email
    const subject = 'Welcome to Lost and Found!';
    await this.mailService.sendUserWelcome(newUser, subject);
    // await this.mailService.sendMailjetEmail(newUser);

    return newUser;
  }
}
