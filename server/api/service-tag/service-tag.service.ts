import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceTag } from '../../entity/service-tag.entity';
import { ServiceTagCategory } from '../../entity/service-tag-category.entity';
import { ServiceTagSubCategory } from '../../entity/service-tag-sub-category.entity';

@Injectable()
export class ServiceTagService {

    constructor(
        @InjectRepository(ServiceTag)
        private serviceTagRepository: Repository<ServiceTag>,
        @InjectRepository(ServiceTagSubCategory)
        private serviceTagSubCategoryRepository: Repository<ServiceTagSubCategory>,
        @InjectRepository(ServiceTagCategory)
        private serviceTagCategoryRepository: Repository<ServiceTagCategory>,
    ) { }

    findAll(): object {
        return this.serviceTagCategoryRepository.createQueryBuilder('serviceTagCategory')
            .innerJoinAndSelect('serviceTagCategory.serviceTagSubCategorys', 'serviceTagSubCategory')
            .innerJoinAndSelect('serviceTagSubCategory.serviceTags', 'serviceTag')
            .where({ is_delete: 0 })
            .andWhere('serviceTagSubCategory.is_delete = :serviceTagSubCategoryDelete', { serviceTagSubCategoryDelete: 0 })
            .andWhere('serviceTag.is_delete = :serviceTagDelete', { serviceTagDelete: 0 })
            .getMany().then(result => {
                return result;
            });
    }

    findFromParam(id): object {
        return this.serviceTagRepository.find({ id_serviceTag: id }).then((result) => {
            return result;
        });
    }

    async post(body): Promise<any> {
        body = this.removeEmpty(body);
        console.log(body);
        const model = this.serviceTagRepository.create(body);
        await this.serviceTagRepository.save(model);
        return model;
    }

    async put(body): Promise<any> {
        body = this.removeEmpty(body);
        await this.serviceTagRepository.update({ id_serviceTag: body.id_serviceTag }, body); // 指定したidをbodyの通りupdate
        // await this.serviceTagRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async putMultiple(body): Promise<any> {
        console.log(body.serviceTagList);
        const list = JSON.parse(body.serviceTagList);
        console.log(list);
        await this.serviceTagRepository.save(list); // 指定したidをbodyの通りupdate
        return body;
    }

    async delete(id): Promise<any> {
        await this.serviceTagRepository.delete({ id_serviceTag: id });
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
