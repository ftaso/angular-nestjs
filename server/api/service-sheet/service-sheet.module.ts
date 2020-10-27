import { Module } from '@nestjs/common';
import { ServiceSheetService } from './service-sheet.service';
import { ServiceSheetController } from './service-sheet.controller';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [ServiceSheetService],
  controllers: [ServiceSheetController],
  exports: [ServiceSheetService]
})
export class ServiceSheetModule { }



