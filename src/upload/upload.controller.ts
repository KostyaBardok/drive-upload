import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { UploadFileDto } from './dto/upload.dto';
import { File } from './entities/file.entity';

@Controller()
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('upload')
    async uploadFiles(@Body(new ValidationPipe()) body: UploadFileDto) {
        await this.uploadService.enqueueUrls(body.urls);
        return { message: 'Files queued for upload' };
    }

    @Get('files')
    async getFiles(): Promise<File[]> {
        return this.uploadService.getAllFiles();
    }
}
