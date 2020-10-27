import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../../entity/record.entity';

@Injectable()
export class ServiceSheetService {

    constructor(
        @InjectRepository(Record)
        private recordRepository: Repository<Record>,
    ) { }

    findOne(recordId: number): object {
        return this.recordRepository
            .createQueryBuilder('record')
            .leftJoinAndSelect('record.meals', 'meal')
            .leftJoinAndSelect('record.vitals', 'vital')
            .leftJoinAndSelect('record.excretions', 'excretion')
            .leftJoinAndSelect('record.hydrations', 'hydration')
            .leftJoinAndSelect('record.services', 'service')
            .leftJoinAndSelect('service.serviceType', 'serviceType')
            .leftJoinAndSelect('service.serviceDetailMaps', 'serviceDetailMap')
            .leftJoinAndSelect('serviceDetailMap.serviceDetail', 'serviceDetail')
            .leftJoinAndSelect('record.serviceTagMaps', 'serviceTagMap')
            .leftJoinAndSelect('record.timeFixedServices', 'timeFixedService')
            .leftJoinAndSelect('record.handingOvers', 'handingOver')
            .where({ id_record: recordId })
            .getOne().then(result => {
                return result;
            });
        // return this.recordRepository.findOne({
        //     join: {
        //         alias: 'record',
        //         leftJoinAndSelect: {
        //             meal: 'record.meals',
        //             vital: 'record.vitals',
        //             excretion: 'record.excretions',
        //             hydration: 'record.hydrations',
        //             serviceTagMap: 'record.serviceTagMaps',
        //             timeFixedService: 'record.timeFixedServices',
        //             handingOver: 'record.handingOvers',
        //         }
        //     },
        //     where: { id_record: recordId },
        // }).then((result) => {
        //     return result;
        // });
    }

    private removeEmpty(object: object): object {
        Object.entries(object).forEach(([key, val]) =>
            (val && typeof val === 'object') && this.removeEmpty(val) ||
            (val === null || val === '') && delete object[key]
        );
        return object;
    }

}
