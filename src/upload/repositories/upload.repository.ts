import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File, FileStatus } from '../entities/file.entity';

@Injectable()
export class UploadRepository {
    constructor(
        @InjectRepository(File)
        private readonly fileRepo: Repository<File>
    ) {}

    async findAll(): Promise<File[]> {
        return await this.fileRepo.find({
            select: { origName: true, driveUrl: true },
            where: { status: FileStatus.COMPLETED },
            order: { uploadedAt: 'DESC' },
        });
    }

    async createCompleted(
        origUrl: string,
        origName: string,
        driveUrl: string
    ): Promise<void> {
        await this.fileRepo.save({
            origName,
            origUrl,
            status: FileStatus.COMPLETED,
            driveUrl,
        });
    }

    async createFailed(
        origUrl: string,
        origName: string,
        errMsg: string
    ): Promise<void> {
        await this.fileRepo.save({
            origName,
            origUrl,
            status: FileStatus.FAILED,
            errMsg,
        });
    }
}
