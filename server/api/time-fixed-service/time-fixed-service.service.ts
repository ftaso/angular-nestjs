import { Injectable, Param, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeFixedService } from '../../entity/time-fixed-service.entity';

@Injectable()
export class TimeFixedServiceService {
    constructor(
        @InjectRepository(TimeFixedService)
        private timeFixedServiceRepository: Repository<TimeFixedService>,
    ) { }

    async find(recordId: number): Promise<any> {
        return this.timeFixedServiceRepository.find({ id_record: recordId })
            .then(result => {
                return result;
            });
    }

    async post(body): Promise<any> {
        const model = this.timeFixedServiceRepository.create(body);
        await this.timeFixedServiceRepository.save(model);
        console.log(model);
        return model;
    }

    async put(body): Promise<any> {
        await this.timeFixedServiceRepository.update({ id_timeFixedService: body.id_timeFixedService }, body); // 指定したidをbodyの通りupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.timeFixedServiceRepository.delete({ id_timeFixedService: id });
        return id;
    }
}
