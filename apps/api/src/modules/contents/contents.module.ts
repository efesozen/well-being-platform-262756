import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { ContentsRepository } from './contents.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    DatabaseModule,
  ],
  controllers: [ContentsController],
  providers: [ContentsService, ContentsRepository],
  exports: [ContentsService],
})
export class ContentsModule {}
