import { Module } from '@nestjs/common';
import { HandingOverController } from './handing-over.controller';
import { HandingOverService } from './handing-over.service';
import { HandingOver } from '../../entity/handing-over.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HandingOver])],
  controllers: [HandingOverController],
  providers: [HandingOverService],
  exports: [HandingOverService]
})
export class HandingOverModule { }

