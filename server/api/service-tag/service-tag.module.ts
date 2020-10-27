import { Module } from '@nestjs/common';
import { ServiceTagController } from './service-tag.controller';
import { ServiceTagService } from './service-tag.service';
import { ServiceTag } from '../../entity/service-tag.entity';
import { ServiceTagSubCategory } from '../../entity/service-tag-sub-category.entity';
import { ServiceTagCategory } from '../../entity/service-tag-category.entity';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTag, ServiceTagSubCategory, ServiceTagCategory, Record])],
  providers: [ServiceTagService],
  controllers: [ServiceTagController],
  exports: [ServiceTagService]
})
export class ServiceTagModule { }
