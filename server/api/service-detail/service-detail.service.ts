import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ServiceType } from '../../entity/service-type.entity';
import { ServiceDetail } from '../../entity/service-detail.entity';
import { isNull } from 'util';

@Injectable()
export class ServiceDetailService {

    constructor(
        @InjectRepository(ServiceType)
        private serviceTypeRepository: Repository<ServiceType>,
        @InjectRepository(ServiceDetail)
        private serviceDetailRepository: Repository<ServiceDetail>,
    ) { }

    findAll(): object {
        // [TODO]不健全なクエリ
        return this.serviceTypeRepository.createQueryBuilder('serviceType')
            .leftJoinAndSelect('serviceType.serviceDetails', 'serviceDetail')
            .where({ is_delete: 0 })
            .getMany().then(result => {
                for (const serviceType of result) {
                    serviceType.serviceDetails = serviceType.serviceDetails.filter(a => a.is_delete === 0);
                }
                return result;
            });
    }

    findFromParam(id): object {
        return this.serviceDetailRepository.find({ id_serviceDetail: id }).then((result) => {
            return result;
        });
    }

    async post(body): Promise<any> {
        body = this.removeEmpty(body);
        console.log(body);
        const model = this.serviceDetailRepository.create(body);
        await this.serviceDetailRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        body = this.removeEmpty(body);
        await this.serviceDetailRepository.update({ id_serviceDetail: body.id_serviceDetail }, body); // 指定したidをbodyの通りupdate
        // await this.serviceDetailRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async putMultiple(body): Promise<any> {
        console.log(body.serviceTagList);
        const list = JSON.parse(body.serviceTagList);
        console.log(list);
        await this.serviceDetailRepository.save(list); // 指定したidをbodyの通りupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.serviceDetailRepository.delete({ id_serviceDetail: id });
        return id;
    }

    private removeEmpty(object: object): object {
        Object.entries(object).forEach(([key, val]) =>
            (val && typeof val === 'object') && this.removeEmpty(val) ||
            (val === null || val === '') && delete object[key]
        );
        return object;
    }

}
