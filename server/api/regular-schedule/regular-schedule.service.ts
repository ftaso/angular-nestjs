import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegularSchedule } from '../../entity/regular-schedule.entity';

@Injectable()
export class RegularScheduleService {

    constructor(
        @InjectRepository(RegularSchedule)
        private regularScheduleRepository: Repository<RegularSchedule>
    ) { }

    findAll(): object {
        return this.regularScheduleRepository.find().then((result) => {
            return result;
        });
    }

    async findOne(day: number): Promise<RegularSchedule | undefined> {
        return this.regularScheduleRepository.findOne({ num_day: day });
    }

    findFromParam(id): object {
        return this.regularScheduleRepository.find({ id_regularSchedule: id }).then((result) => {
            return result;
        });
    }

    async post(body): Promise<any> {
        const model = this.regularScheduleRepository.create(body);
        await this.regularScheduleRepository.save(model);
        return model;
    }

    async put(body): Promise<object> {
        await this.regularScheduleRepository.update({ id_regularSchedule: body.id_regularSchedule }, body); // 指定したidをbodyの通りupdate
        // await this.regularScheduleRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id): Promise<number> {
        await this.regularScheduleRepository.delete({ id_regularSchedule: id });
        return id;
    }
}
