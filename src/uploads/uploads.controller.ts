import { Controller, Post } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { UploadsService } from './providers/uploads.service';

import { createSuccessResponse } from 'src/common/response/utils/success-response.util';

/**
 * Controller for uploads
 */
@ApiBearerAuth()
@Controller('uploads')
@ApiTags('Uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  /**
   * Upload a file
   * @param file - File to upload
   */
  @Post('file')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer Token' },
  ])
  @ApiOperation({ summary: `Upload a new image` })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.uploadsService.uploadFile(file);
    return createSuccessResponse('File uploaded successfully', true, data);
  }
}
