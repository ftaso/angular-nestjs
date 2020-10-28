import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConfigService, dbConfigService } from './db-config/db-config.service';
import { StaffModule } from './api/staff/staff.module';
import { AuthModule } from './api/auth/auth.module';
import { AttendanceModule } from './api/attendance/attendance.module';
import { MealModule } from './api/meal/meal.module';
import { CareReceiverModule } from './api/care-receiver/care-receiver.module';
import { RecordModule } from './api/record/record.module';
import { HydrationModule } from './api/hydration/hydration.module';
import { VitalModule } from './api/vital/vital.module';
import { ExcretionModule } from './api/excretion/excretion.module';
import { ServiceSheetModule } from './api/service-sheet/service-sheet.module';
import { ServiceTagModule } from './api/service-tag/service-tag.module';
import { TimeFixedServiceModule } from './api/time-fixed-service/time-fixed-service.module';
import { ServiceTagMapModule } from './api/service-tag-map/service-tag-map.module';
import { HandingOverModule } from './api/handing-over/handing-over.module';
import { RegularScheduleModule } from './api/regular-schedule/regular-schedule.module';
import { ServiceDetailModule } from './api/service-detail/service-detail.module';
import { ServiceModule } from './api/service/service.module';
import { ServiceTypeModule } from './api/service-type/service-type.module';
import { ServiceDetailMapModule } from './api/service-detail-map/service-detail-map.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EventModule } from './websocket/event.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/angular-nestjs-ssr/browser')
    }),
    TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()),
    StaffModule,
    AuthModule,
    AttendanceModule,
    MealModule,
    CareReceiverModule,
    RecordModule,
    HydrationModule,
    VitalModule,
    ExcretionModule,
    ServiceSheetModule,
    ServiceTagModule,
    TimeFixedServiceModule,
    ServiceTagMapModule,
    HandingOverModule,
    RegularScheduleModule,
    ServiceDetailModule,
    ServiceModule,
    ServiceTypeModule,
    ServiceDetailMapModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DbConfigService
  ]})
export class AppModule {}


