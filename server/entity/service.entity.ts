import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Record } from './record.entity';
import { Staff } from './staff.entity';
import { ServiceType } from './service-type.entity';
import { ServiceDetailMap } from './service-detail-map.entity';

@Entity({ name: 'tbl_service' })
export class Service {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_service?: number;

    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;

    @Column()
    id_record!: number;

    @OneToMany(() => ServiceDetailMap, serviceDetailMaps => serviceDetailMaps.service)
    serviceDetailMaps?: ServiceDetailMap[] | undefined;

    @Column()
    id_serviceType: number;

    @OneToOne(() => ServiceType)
    @JoinColumn({ name: 'id_serviceType' })
    readonly serviceType?: ServiceType;

    @Column({
        type: 'time',
    })
    tm_start: string;

    @Column({
        type: 'time',
    })
    tm_end: string;

    @Column({ nullable: true })
    str_remark: string | null;

    @ManyToOne(() => Staff, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_fillOutStaff' })
    readonly staff?: Staff;

    @Column()
    id_fillOutStaff!: number;

    constructor(id_record: number, id_serviceType: number, tm_start: string, tm_end: string, id_fillOutStaff: number) {
        this.id_record = id_record;
        this.id_serviceType = id_serviceType;
        this.tm_start = tm_start;
        this.tm_end = tm_end;
        this.id_fillOutStaff = id_fillOutStaff;
    }

}
