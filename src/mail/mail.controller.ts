import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MailService } from './providers/mail.service';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Auth(AuthType.None)
@Controller('mail')
@ApiTags('Mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('mailjet')
  async sendMailjetEmail(@Body() createUserDto: CreateUserDto) {
    return await this.mailService.sendMailjetEmail(createUserDto);
  }
}
