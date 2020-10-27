import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ServiceDetail } from './service-detail.entity';

@Entity({ name: 'mst_serviceType' })
export class ServiceType {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_serviceType?: number;

    @Column()
    str_serviceType: string;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_delete: number;


    @OneToMany(() => ServiceDetail, serviceDetail => serviceDetail.serviceType)
    serviceDetails?: ServiceDetail[];


    constructor(str_serviceType: string, serviceDetails: ServiceDetail[]) {
        this.str_serviceType = str_serviceType;
        this.serviceDetails = serviceDetails;
    }

}
