import { Module } from '@nestjs/common';
import { RegularSchedule } from '../../entity/regular-schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegularScheduleController } from './regular-schedule.controller';
import { RegularScheduleService } from './regular-schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegularSchedule])],
  providers: [RegularScheduleService],
  controllers: [RegularScheduleController],
  exports: [RegularScheduleService]
})
export class RegularScheduleModule {}

