import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CareReceiver } from './care-receiver.entity';
import { Excretion } from './excretion.entity';
import { HandingOver } from './handing-over.entity';
import { Hydration } from './hydration.entity';
import { Meal } from './meal.entity';
import { Service } from './service.entity';
import { Vital } from './vital.entity';

@Entity({ name: 'tbl_record' })
export class Record {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_record?: number;

    @Column()
    dt_record: string;

    @Column()
    id_careReceiver!: number;

    @OneToOne(() => CareReceiver)
    @JoinColumn({ name: 'id_careReceiver' })
    careReceiver: CareReceiver;

    @Column('time')
    tm_start: string;

    @Column('time')
    tm_end: string;

    @Column('tinyint', { unsigned: true, default: 1 })
    is_attendance: number;

    @OneToMany(() => Excretion, excretions => excretions.record)
    excretions?: Excretion[] | undefined;

    @OneToMany(() => Hydration, hydrations => hydrations.record)
    hydrations?: Hydration[] | undefined;

    @OneToMany(() => Meal, meals => meals.record)
    meals?: Meal[] | undefined;


    @OneToMany(() => Service, services => services.record)
    services?: Service[] | undefined;


    @OneToMany(() => Vital, vitals => vitals.record)
    vitals?: Vital[] | undefined;

    @OneToMany(() => HandingOver, handingOvers => handingOvers.record)
    handingOvers?: HandingOver[] | undefined;

    constructor(dt_record: string, tm_start: string, tm_end: string, id_careReceiver: number, is_attendance?: number) {
        this.dt_record = dt_record;
        this.tm_start = tm_start;
        this.tm_end = tm_end;
        if (is_attendance) { this.is_attendance = is_attendance; }
        this.id_careReceiver = id_careReceiver;
    }

}
