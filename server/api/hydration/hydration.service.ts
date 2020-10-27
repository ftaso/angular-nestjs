import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hydration } from '../../entity/hydration.entity';
import { Record } from '../../entity/record.entity';

@Injectable()
export class HydrationService {
    constructor(
        @InjectRepository(Hydration)
        private hydrationRepository: Repository<Hydration>,
        @InjectRepository(Record)
        private recordRepository: Repository<Record>
    ) { }

    findAll(): object {
        return this.hydrationRepository.find().then((result) => {
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
                    hydration: 'record.hydrations'
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
    //     return this.hydrationRepository.findOne({ str_hydrationType: accountName });
    // }


    findFromParam(id): object {
        return this.hydrationRepository.find({ id_hydration: id }).then((result) => {
            return result;
        });
    }

    async post(body): Promise<any> {
        const model = this.hydrationRepository.create(body);
        await this.hydrationRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        await this.hydrationRepository.update({ id_hydration: body.id_hydration }, body); // 指定したidをbodyの通りupdate
        // await this.hydrationRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.hydrationRepository.delete({ id_hydration: id });
        return id;
    }
}
