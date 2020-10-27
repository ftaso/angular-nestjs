import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vital } from '../../entity/vital.entity';
import { Record } from '../../entity/record.entity';

@Injectable()
export class VitalService {

    constructor(
        @InjectRepository(Vital)
        private vitalRepository: Repository<Vital>,
        @InjectRepository(Record)
        private recordRepository: Repository<Record>
    ) { }

    findAll(): object {
        return this.vitalRepository.find().then((result) => {
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
                    vital: 'record.vitals'
                }
            },
            where: {
                dt_record: date
            },
        }).then((result) => {
            return result;
        });
    }

    // async findOne(accountName: string): Promise<Hydration | undefined> {
    //     return this.vitalRepository.findOne({ str_vitalType: accountName });
    // }


    findFromParam(id): object {
        return this.vitalRepository.find({ id_vital: id }).then((result) => {
            return result;
        });
    }

    async post(body): Promise<any> {
        body = this.removeEmpty(body);
        console.log(body);
        const model = this.vitalRepository.create(body);
        await this.vitalRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        body = this.removeEmpty(body);
        await this.vitalRepository.update({ id_vital: body.id_vital }, body); // 指定したidをbodyの通りupdate
        // await this.vitalRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.vitalRepository.delete({ id_vital: id });
        return id;
    }

    private removeEmpty(object: object): object {
        Object.entries(object).forEach(([key, val]) =>
            (val && typeof val === 'object') && this.removeEmpty(val) ||
            (val === null || val === '') && delete object[key]
        );
        return object;
    }

}
