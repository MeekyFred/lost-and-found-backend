import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'src/users/user.entity';

/**
 * Service for sending emails
 */
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /**
   * Send welcome email to user
   * @param user - user to send email to
   * @returns void
   */
  async sendUserWelcome(user: User): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        // override default from
        from: '"Onbaording Team" <support@lostandfound.com>',
        subject: 'Welcome to Lost and Found!',
        // `.ejs` extension is appended automatically to template
        template: './welcome',
        // Context is available in email template
        context: {
          name: user.firstName,
          email: user.email,
          loginUrl: 'http://localhost:3030',
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
