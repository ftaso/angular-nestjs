import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Excretion } from '../../entity/excretion.entity';
import { Record } from '../../entity/record.entity';

@Injectable()
export class ExcretionService {

    constructor(
        @InjectRepository(Excretion)
        private excretionRepository: Repository<Excretion>,
        @InjectRepository(Record)
        private recordRepository: Repository<Record>
    ) { }

    findAll(): object {
        return this.excretionRepository.find().then((result) => {
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
                    excretion: 'record.excretions'
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
    //     return this.excretionRepository.findOne({ str_excretionType: accountName });
    // }


    findFromParam(id): object {
        return this.excretionRepository.find({ id_excretion: id }).then((result) => {
            return result;
        });
    }

    async post(body): Promise<any> {
        body = this.removeEmpty(body);
        console.log(body);
        const model = this.excretionRepository.create(body);
        await this.excretionRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        body = this.removeEmpty(body);
        await this.excretionRepository.update({ id_excretion: body.id_excretion }, body); // 指定したidをbodyの通りupdate
        // await this.excretionRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async putMultiple(body): Promise<any> {
        console.log(body.excretionList);
        const list = JSON.parse(body.excretionList);
        console.log(list);
        await this.excretionRepository.save(list); // 指定したidをbodyの通りupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.excretionRepository.delete({ id_excretion: id });
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
