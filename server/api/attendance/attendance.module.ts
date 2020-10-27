import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
  exports: [AttendanceService]
})
export class AttendanceModule {}
