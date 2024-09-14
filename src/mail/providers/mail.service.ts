import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { MailjetProvider } from './mailjet.provider';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';

/**
 * Service for sending emails to users
 */
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailjetProvider: MailjetProvider,
  ) {}

  /**
   * Send welcome email to user
   * @param user - user to send email to
   * @returns void
   */
  async sendUserWelcome(user: User, subject: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject,
        // `.ejs` extension is appended automatically to template
        template: './welcome',
        // Context is available in email template
        context: {
          name: user.firstName,
          email: user.email,
          verifyToken: user.verifyToken,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  async sendMailjetEmail(user: CreateUserDto | User): Promise<any> {
    const to = user.email;
    const subject = 'Welcome to Lost and Found!';
    const context = { name: user.firstName };

    return await this.mailjetProvider.sendMailjetEmail(to, subject, context); // prettier-ignore
  }
}
