import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordService],
  controllers: [RecordController],
  exports: [RecordService]
})
export class RecordModule {}
