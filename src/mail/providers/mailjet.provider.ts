import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailjet from 'node-mailjet';

/**
 * Mailjet provider
 */
@Injectable()
export class MailjetProvider {
  private readonly mailjet: Mailjet.Client;

  constructor(private readonly configService: ConfigService) {
    this.mailjet = Mailjet.Client.apiConnect(
      this.configService.get<string>('appConfig.mailjetApiKey'),
      this.configService.get<string>('appConfig.mailjetSecretKey'),
    );
  }

  async sendMailjetEmail(to: string, subject: string, context: any) {
    try {
      const request = this.mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'jesse.juwe@gotrustcrow.com', // Verified email address
              Name: 'Jesse',
            },
            To: [
              {
                Email: to,
                Name: context.name,
              },
            ],
            Subject: subject,
            TemplateID: 6287072, // Mailjet template ID
            TemplateLanguage: true,
            TextPart: subject,
            Variables: { data: { name: context.name } },
          },
        ],
      });

      const result = await request;
      return result.body;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
