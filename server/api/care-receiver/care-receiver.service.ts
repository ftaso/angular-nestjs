import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareReceiver } from '../../entity/care-receiver.entity';

@Injectable()
export class CareReceiverService {
    constructor(
        @InjectRepository(CareReceiver)
        private repository: Repository<CareReceiver>
    ) { }

    getCareReceiver(): object {
        return this.findAll();
    }

    public findAll(): object {
        return this.repository.find({is_delete: 0}).then((result) => {
            return result;
        });
    }

    async findOne(careReceiverId: number): Promise<CareReceiver | undefined> {
        return this.repository.findOne({ id_careReceiver: careReceiverId });
    }

    findFromParam(id): object {
        return this.repository.find({ id_careReceiver: id }).then((result) => {
            return result;
        });
    }

    async post(body): Promise<any | undefined> {
        const model = this.repository.create(body);
        await this.repository.save(model);
        return model;
    }

    async put(body): Promise<CareReceiver | undefined> {
        await this.repository.update({ id_careReceiver: body.id_careReceiver}, body); // 指定したidをbodyの通りupdate
        // await this.repository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id): Promise<number | undefined> {
        await this.repository.delete({ id_careReceiver: id });
        return id;
    }
}
