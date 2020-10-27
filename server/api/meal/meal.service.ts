import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from '../../entity/meal.entity';
import { Record } from '../../entity/record.entity';

@Injectable()
export class MealService {
    constructor(
        @InjectRepository(Meal)
        private mealRepository: Repository<Meal>,
        @InjectRepository(Record)
        private recordRepository: Repository<Record>
    ) { }

    getMeal(): object {
        return { id: 2 };
    }

    findAll(): object {
        return this.mealRepository.find().then((result) => {
            return result;
        });
    }


    findToday(date: string): object {
        console.log(date);
        return this.recordRepository.find({
            relations: ['careReceiver'],
            join: {
                alias: 'record',
                leftJoinAndSelect: {
                    meal: 'record.meals'
                }
            },
            where: {
                dt_record: date
            },
        }).then((result) => {
            return result;
        });
    }
    // findToday(date: string): object {
    //     return this.recordRepository.createQueryBuilder('record')
    //     .leftJoinAndSelect('record.meals', 'meals') .then((result) => {
    //         return result;
    //     });
    // }
    async findOne(accountName: string): Promise<Meal | undefined> {
        return this.mealRepository.findOne({ str_mealType: accountName });
    }

    // findToday(date: string): object {
    //     return this.mealRepository.find({
    //         relations: ['record'],
    //         where: {
    //             record: {
    //                 dt_record: date
    //             }
    //         },
    //     }).then((result) => {
    //         return result;
    //     });
    // }

    findFromParam(id): object {
        return this.mealRepository.find({ id_meal: id }).then((result) => {
            return result;
        });
    }

    async post(body) {
        const model = this.mealRepository.create(body);
        await this.mealRepository.save(model);
        return model;
    }

    async put(body) {
        await this.mealRepository.update({ id_meal: body.id_meal }, body); // 指定したidをbodyの通りupdate
        // await this.mealRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id) {
        await this.mealRepository.delete({ id_meal: id });
        return id;
    }
}
