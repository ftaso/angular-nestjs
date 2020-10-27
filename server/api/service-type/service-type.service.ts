import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from '../../entity/service-type.entity';

@Injectable()
export class ServiceTypeService {

    constructor(
        @InjectRepository(ServiceType)
        private serviceTypeRepository: Repository<ServiceType>,
    ) { }

    async post(body): Promise<any> {
        body = this.removeEmpty(body);
        console.log(body);
        const model = this.serviceTypeRepository.create(body);
        await this.serviceTypeRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        body = this.removeEmpty(body);
        await this.serviceTypeRepository.update({ id_serviceType: body.id_serviceType }, body); // 指定したidをbodyの通りupdate
        // await this.serviceTypeRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.serviceTypeRepository.delete({ id_serviceType: id });
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
