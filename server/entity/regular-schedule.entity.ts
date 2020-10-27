import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CareReceiver } from './care-receiver.entity';


@Entity({ name: 'tbl_regularSchedule' })
export class RegularSchedule {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_regularSchedule?: number;

    @Column()
    num_day: number;

    @Column()
    id_careReceiver!: number;

    @OneToOne(() => CareReceiver)
    @JoinColumn({ name: 'id_careReceiver' })
    careReceiver: CareReceiver;

    @Column('time')
    tm_start: string;

    @Column('time')
    tm_end: string;


    constructor(num_day: number, tm_start: string, tm_end: string, id_careReceiver: number) {
        this.num_day = num_day;
        this.tm_start = tm_start;
        this.tm_end = tm_end;
        this.id_careReceiver = id_careReceiver;
    }

}
