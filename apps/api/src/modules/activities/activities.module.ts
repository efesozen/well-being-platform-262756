import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ActivitysController } from './activities.controller';
import { ActivitysService } from './activities.service';
import { ActivitysRepository } from './activities.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    DatabaseModule,
  ],
  controllers: [ActivitysController],
  providers: [ActivitysService, ActivitysRepository],
  exports: [ActivitysService],
})
export class ActivitysModule {}
