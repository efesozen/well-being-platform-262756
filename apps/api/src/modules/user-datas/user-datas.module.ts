import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdata } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { UserdatasController } from './userdatas.controller';
import { UserdatasService } from './userdatas.service';
import { UserdatasRepository } from './userdatas.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userdata]),
    DatabaseModule,
  ],
  controllers: [UserdatasController],
  providers: [UserdatasService, UserdatasRepository],
  exports: [UserdatasService],
})
export class UserdatasModule {}
