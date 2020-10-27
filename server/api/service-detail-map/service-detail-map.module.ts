import { Module } from '@nestjs/common';
import { ServiceDetailMap } from '../../entity/service-detail-map.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDetailMapController } from './service-detail-map.controller';
import { ServiceDetailMapService } from './service-detail-map.service';

@Module({
    imports: [TypeOrmModule.forFeature([ServiceDetailMap])],
    controllers: [ServiceDetailMapController],
    providers: [ServiceDetailMapService],
    exports: [ServiceDetailMapService]
  })
export class ServiceDetailMapModule {}
