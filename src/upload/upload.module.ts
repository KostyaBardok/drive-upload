import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UploadController } from './upload.controller';
import { UploadRepository } from './repositories/upload.repository';
import { UploadService } from './services/upload.service';
import { GoogleDriveService } from './services/google-drive.service';
import { UploadProcessor } from './queue/upload.processor';
import { File } from './entities/file.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
        BullModule.registerQueue({ name: 'upload' }),
    ],
    controllers: [UploadController],
    providers: [
        UploadRepository,
        UploadService,
        GoogleDriveService,
        UploadProcessor,
    ],
})
export class UploadModule {}
