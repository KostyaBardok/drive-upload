import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

export enum FileStatus {
    COMPLETED = 'completed',
    FAILED = 'failed',
}

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    origUrl: string;

    @Column({ type: 'varchar' })
    origName: string;

    @Column({ type: 'varchar', nullable: true })
    driveUrl: string;

    @Column({ type: 'enum', enum: FileStatus, nullable: true })
    status: FileStatus;

    @Column({ type: 'varchar', nullable: true })
    errMsg: string;

    @CreateDateColumn()
    uploadedAt: Date;
}
