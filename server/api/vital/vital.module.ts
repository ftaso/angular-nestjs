import { Module } from '@nestjs/common';
import { VitalService } from './vital.service';
import { VitalController } from './vital.controller';
import { Vital } from '../../entity/vital.entity';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vital, Record])],
  providers: [VitalService],
  controllers: [VitalController],
  exports: [VitalService]
})
export class VitalModule {}

