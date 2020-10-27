import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Record } from './record.entity';
import { Staff } from './staff.entity';

@Entity({ name: 'tbl_timeFixedService' })
export class TimeFixedService {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_timeFixedService?: number;

    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;

    @Column()
    id_record!: number;

    @Column()
    str_service: string;

    @Column({
        type: 'time',
    })
    tm_serviceStart: string;

    @Column({
        type: 'time',
    })
    tm_serviceEnd: string;

    @Column({ nullable: true })
    str_remark: string | null;

    @ManyToOne(() => Staff, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_fillOutStaff' })
    readonly staff?: Staff;

    @Column()
    id_fillOutStaff!: number;

    constructor(id_record: number, str_service: string, tm_serviceStart: string, tm_serviceEnd: string, id_fillOutStaff: number) {
        this.id_record = id_record;
        this.str_service = str_service;
        this.tm_serviceStart = tm_serviceStart;
        this.tm_serviceEnd = tm_serviceEnd;
        this.id_fillOutStaff = id_fillOutStaff;
    }

}
