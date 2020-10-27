import { Module } from '@nestjs/common';
import { ServiceType } from '../../entity/service-type.entity';
import { ServiceDetail } from '../../entity/service-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDetailController } from './service-detail.controller';
import { ServiceDetailService } from './service-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceType, ServiceDetail])],
  controllers: [ServiceDetailController],
  providers: [ServiceDetailService],
  exports: [ServiceDetailService]
})
export class ServiceDetailModule {}

