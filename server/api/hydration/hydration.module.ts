import { Module } from '@nestjs/common';
import { HydrationController } from './hydration.controller';
import { HydrationService } from './hydration.service';
import { Hydration } from '../../entity/hydration.entity';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hydration, Record])],
  controllers: [HydrationController],
  providers: [HydrationService],
  exports: [HydrationService]
})
export class HydrationModule {}
