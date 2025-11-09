import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wellbeingplan } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { WellbeingplansController } from './wellbeingplans.controller';
import { WellbeingplansService } from './wellbeingplans.service';
import { WellbeingplansRepository } from './wellbeingplans.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wellbeingplan]),
    DatabaseModule,
  ],
  controllers: [WellbeingplansController],
  providers: [WellbeingplansService, WellbeingplansRepository],
  exports: [WellbeingplansService],
})
export class WellbeingplansModule {}
