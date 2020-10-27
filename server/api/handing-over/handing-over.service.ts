import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandingOver } from '../../entity/handing-over.entity';

@Injectable()
export class HandingOverService {
    constructor(
        @InjectRepository(HandingOver)
        private handingOverRepository: Repository<HandingOver>,
    ) { }

    async find(recordId: number): Promise<any> {
        return this.handingOverRepository.find({ id_record: recordId })
            .then(result => {
                return result;
            });
    }

    async post(body): Promise<any> {
        const model = this.handingOverRepository.create(body);
        await this.handingOverRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        await this.handingOverRepository.update({ id_handingOver: body.id_handingOver }, body); // 指定したidをbodyの通りupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.handingOverRepository.delete({ id_handingOver: id });
        return id;
    }
}
