import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { drive_v3 } from 'googleapis/build/src/apis/drive';
import { Readable } from 'stream';
import { UploadRepository } from '../repositories/upload.repository';

@Injectable()
export class GoogleDriveService {
    private drive: drive_v3.Drive;

    constructor(private readonly fileRepo: UploadRepository) {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        this.drive = google.drive({ version: 'v3', auth });
    }

    async upload(
        fileName: string,
        fileStream: Readable,
        mimeType: string
    ): Promise<string> {
        try {
            const file = await this.drive.files.create({
                requestBody: {
                    name: fileName,
                },
                media: {
                    mimeType: mimeType || 'application/octet-stream',
                    body: fileStream,
                },
            });

            const fileId = file.data.id;

            await this.drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                },
            });

            return `https://drive.google.com/uc?id=${fileId}`;
        } catch (err) {
            throw new Error(err);
        }
    }
}
