import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { MailjetProvider } from './mailjet.provider';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Claim } from 'src/claims/claim.entity';
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
  async sendUserWelcome(user: User): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to Lost and Found!',
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

  /**
   * Send email notification to user
   * @param user - Entity User
   * @param claim - Entity Claim
   * @returns void
   */
  async sendClaimNotification(user: User, claim: Claim): Promise<void> {
    const claimantName = `${user.firstName} ${user.lastName}`;
    const claimId = claim.id;
    const claimDate = claim.createdAt.toLocaleDateString();
    const claimStatus = claim.status;
    const dateLost = claim.dateLost.toLocaleDateString();
    const itemName = claim.item.name;
    const userName = user.firstName;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Your claim has been submitted',
        template: './claim-update-notification',
        context: {
          claimantName,
          claimId,
          claimDate,
          claimStatus,
          dateLost,
          itemName,
          userName,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * Send update email notification to user
   * @param user - Entity User
   * @param claim - Entity Claim
   * @returns void
   */
  async sendClaimUpdateNotification(user: User, claim: Claim): Promise<void> {
    const claimId = claim.id;
    const claimStatus = claim.status;
    const itemName = claim.item.name;
    const userName = user.firstName;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Your claim has been updated',
        template: './claim-update-notification',
        context: { claimId, claimStatus, itemName, userName },
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
