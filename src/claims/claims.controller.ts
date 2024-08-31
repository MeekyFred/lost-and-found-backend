import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('claims')
@ApiTags('Claims')
export class ClaimsController {}
