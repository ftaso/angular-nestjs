import { Module } from '@nestjs/common';
import { CareReceiverService } from './care-receiver.service';
import { CareReceiverController } from './care-receiver.controller';
import { CareReceiver } from '../../entity/care-receiver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CareReceiver])],
  providers: [CareReceiverService],
  controllers: [CareReceiverController],
  exports: [CareReceiverService]
})
export class CareReceiverModule {}
