import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { File } from '../entities/file.entity';
import { UploadRepository } from '../repositories/upload.repository';

@Injectable()
export class UploadService {
    constructor(
        @InjectQueue('upload') private readonly uploadQueue: Queue,
        private readonly fileRepo: UploadRepository
    ) {}

    async enqueueUrls(urls: string[]) {
        for (const url of urls) {
            await this.uploadQueue.add('upload', { url });
        }
    }

    async getAllFiles(): Promise<File[]> {
        return this.fileRepo.findAll();
    }
}
