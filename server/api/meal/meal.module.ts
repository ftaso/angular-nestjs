import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { Meal } from '../../entity/meal.entity';
import { Record } from '../../entity/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, Record])],
  controllers: [MealController],
  providers: [MealService],
  exports: [MealService]
})
export class MealModule { }

