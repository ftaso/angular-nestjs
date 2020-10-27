import { Injectable, Param, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../entity/service.entity';
import { ServiceDetailMap } from '../../entity/service-detail-map.entity';

@Injectable()
export class ServiceService {

    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
        @InjectRepository(ServiceDetailMap)
        private serviceDetailMapRepository: Repository<ServiceDetailMap>,
    ) { }

    async find(recordId: number): Promise<any> {
        return this.serviceRepository.createQueryBuilder('service')
            .leftJoinAndSelect('service.serviceType', 'serviceType')
            .leftJoinAndSelect('service.serviceDetailMaps', 'serviceDetailMap')
            .leftJoinAndSelect('serviceDetailMap.serviceDetail', 'serviceDetail')
            .where({ id_record: recordId })
            .getMany().then(result => {
                return result;
            });
    }

    async post(body): Promise<any> {
        const model = this.serviceRepository.create(body);
        await this.serviceRepository.save(model);
        console.log(model);
        return model;
    }

    async put(body): Promise<any> {
        await this.serviceRepository.update({ id_service: body.id_service }, body); // 指定したidをbodyの通りupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.serviceDetailMapRepository.delete({ id_service: id });
        await this.serviceRepository.delete({ id_service: id });
        return id;
    }
}
