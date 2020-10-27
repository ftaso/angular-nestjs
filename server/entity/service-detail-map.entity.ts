import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Service } from './service.entity';
import { ServiceDetail } from './service-detail.entity';

@Entity({ name: 'tbl_serviceDetail_map' })
export class ServiceDetailMap {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_serviceDetail_map?: number;

    @ManyToOne(() => Service, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_service' })
    readonly service?: Service;

    @Column()
    id_service: number;

    @Column()
    id_serviceDetail: number;

    @OneToOne(() => ServiceDetail)
    @JoinColumn({ name: 'id_serviceDetail' })
    readonly serviceDetail?: ServiceDetail;

    constructor(id_service: number, id_serviceDetail: number) {
        this.id_service = id_service;
        this.id_serviceDetail = id_serviceDetail;
    }

}
