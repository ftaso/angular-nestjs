import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceDetailMap } from '../../entity/service-detail-map.entity';

@Injectable()
export class ServiceDetailMapService {

    constructor(
        @InjectRepository(ServiceDetailMap)
        private serviceDetailMapRepository: Repository<ServiceDetailMap>) { }

    async post(body): Promise<any> {
        const model = this.serviceDetailMapRepository.create(body);
        await this.serviceDetailMapRepository.save(model);
        return model;
    }

    async delete(id): Promise<any> {
        await this.serviceDetailMapRepository.delete({ id_service: id });
        return id;
    }
}
