import { Module } from '@nestjs/common';
import { ExcretionController } from './excretion.controller';
import { ExcretionService } from './excretion.service';
import { Excretion } from '../../entity/excretion.entity';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Excretion, Record])],
  providers: [ExcretionService],
  controllers: [ExcretionController],
  exports: [ExcretionService]
})
export class ExcretionModule {}

