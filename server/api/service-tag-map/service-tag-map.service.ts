import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceTagMap } from '../../entity/service-tag-map.entity';

@Injectable()
export class ServiceTagMapService {
    constructor(
        @InjectRepository(ServiceTagMap)
        private serviceTagMapRepository: Repository<ServiceTagMap>,
    ) { }

    async post(body): Promise<any> {
        const model = this.serviceTagMapRepository.create(body);
        await this.serviceTagMapRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        await this.serviceTagMapRepository.update({ id_serviceTag_map: body.id_serviceTag_map }, body); // 指定したidをbodyの通りupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.serviceTagMapRepository.delete({ id_serviceTag_map: id });
        return id;
    }
}
