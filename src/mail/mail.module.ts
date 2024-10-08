import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

import { MailController } from './mail.controller';
import { MailService } from './providers/mail.service';
import { MailjetProvider } from './providers/mailjet.provider';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('appConfig.mailHost'),
          port: config.get('appConfig.mailPort'),
          secure: false,
          auth: {
            user: config.get('appConfig.mailjetApiKey'),
            pass: config.get('appConfig.mailjetSecretKey'),
          },
          timeout: 5000,
        },
        defaults: {
          from: `"Lost and Found" <${config.get('appConfig.mailFrom')}>`,
        },
        template: {
          dir: join(__dirname, '../../mail', 'templates'),
          adapter: new EjsAdapter({ inlineCssEnabled: true }),
          options: {
            strict: false,
            cache: false,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailjetProvider],
  exports: [MailService, MailjetProvider],
})
export class MailModule {}
