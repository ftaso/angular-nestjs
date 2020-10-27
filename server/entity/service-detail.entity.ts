import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ServiceType } from './service-type.entity';
import { ServiceDetailMap } from './service-detail-map.entity';

@Entity({ name: 'mst_serviceDetail' })
export class ServiceDetail {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_serviceDetail?: number;

    @Column()
    str_serviceDetail: string;

    @ManyToOne(() => ServiceType, serviceType => serviceType.serviceDetails,
        { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_serviceType', referencedColumnName: 'id_serviceType'})
    readonly serviceType?: ServiceType;

    @Column()
    id_serviceType: number;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_delete: number;

    @OneToMany(() => ServiceDetailMap, serviceDetail => serviceDetail.serviceDetail)
    serviceDetail?: ServiceDetailMap[];

    constructor(str_serviceDetail: string, is_delete: number, id_serviceType: number, serviceType: ServiceType) {
        this.str_serviceDetail = str_serviceDetail;
        this.is_delete = is_delete;
        this.id_serviceType = id_serviceType;
        this.serviceType = serviceType;
    }

}
