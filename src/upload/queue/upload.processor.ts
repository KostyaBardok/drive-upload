import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GoogleDriveService } from '../services/google-drive.service';
import axios from 'axios';
import path from 'path';
import { UploadRepository } from '../repositories/upload.repository';

@Processor('upload')
export class UploadProcessor {
    constructor(
        private readonly driveService: GoogleDriveService,
        private readonly fileRepo: UploadRepository
    ) {}

    @Process('upload')
    async handleUpload(job: Job<{ url: string }>) {
        const url = job.data.url;
        const fileName = path.basename(new URL(url).pathname);

        try {
            const downloadedFile = await axios({
                url: url,
                method: 'GET',
                responseType: 'stream',
            });

            const driveUrl = await this.driveService.upload(
                fileName,
                downloadedFile.data,
                downloadedFile.headers['content-type']
            );

            await this.fileRepo.createCompleted(url, fileName, driveUrl);
        } catch (err) {
            await this.fileRepo.createFailed(url, fileName, err.message);
        }
    }
}
