import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../../entity/record.entity';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Record)
        private staffRepository: Repository<Record>
    ) { }

    getRecord(): object {
        return { id: 2 };
    }

    getToday(date): object {
        return { dt_: 2 };
    }

    findAll(): object {
        return this.staffRepository.find().then((result) => {
            return result;
        });
    }

    async findOne(date: any): Promise<Record | undefined> {
        return this.staffRepository.findOne({ dt_record: date });
    }

    findFromParam(id): object {
        return this.staffRepository.find({ id_record: id }).then((result) => {
            return result;
        });
    }

    async post(body) {
        const model = this.staffRepository.create(body);
        await this.staffRepository.save(model);
        return model;
    }

    async put(body) {
        await this.staffRepository.update({ id_record: body.id_record }, body); // 指定したidをbodyの通りupdate
        // await this.staffRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id) {
        await this.staffRepository.delete({ id_record: id });
        return id;
    }
}
