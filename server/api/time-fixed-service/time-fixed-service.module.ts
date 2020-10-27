import { Module } from '@nestjs/common';
import { TimeFixedServiceController } from './time-fixed-service.controller';
import { TimeFixedServiceService } from './time-fixed-service.service';
import { TimeFixedService } from '../../entity/time-fixed-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeFixedService])],
  controllers: [TimeFixedServiceController],
  providers: [TimeFixedServiceService],
  exports: [TimeFixedServiceService]
})
export class TimeFixedServiceModule { }

