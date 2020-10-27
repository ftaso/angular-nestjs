import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareReceiver } from '../../entity/care-receiver.entity';
import { getRepository, Repository } from 'typeorm';
import { Record } from '../../entity/record.entity';

@Injectable()
export class RecordService {

    constructor(
        @InjectRepository(Record)
        private repository: Repository<Record>
    ) {
    }

    getRecord(): object {
        return { id: 2 };
    }

    getToday(date): object {
        return { dt_: 2 };
    }

    findAll(): object {
        return this.repository.find({ relations: ['careReceiver'] }).then((result) => {
            return result;
        });
    }

    findDate(date: string): object {
        return this.repository.find({
            where: { dt_record: date },
            relations: ['careReceiver']
        }).then((result) => {
            return result;
        });
    }

    findOne(date: string): object {
        return this.repository.findOne({ dt_record: date }).then((result) => {
            return result;
        });
    }

    findFromParam(id): object {
        return this.repository.find({ id_record: id }).then((result) => {
            return result;
        });
    }

    async post(body) {
        const model = this.repository.create(body);
        await this.repository.save(model);
        return model;
    }

    async put(body) {
        await this.repository.update({ id_record: body.id_record }, body); // 指定したidをbodyの通りupdate
        // await this.repository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id) {
        await this.repository.delete({ id_record: id });
        return id;
    }
}

