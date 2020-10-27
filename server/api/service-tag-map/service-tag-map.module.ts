import { Module } from '@nestjs/common';
import { ServiceTagMapController } from './service-tag-map.controller';
import { ServiceTagMapService } from './service-tag-map.service';
import { ServiceTagMap } from '../../entity/service-tag-map.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTagMap])],
  controllers: [ServiceTagMapController],
  providers: [ServiceTagMapService],
  exports: [ServiceTagMapService]
})
export class ServiceTagMapModule { }

