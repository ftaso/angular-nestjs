// import 'reflect-metadata';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Excretion } from './excretion.entity';
import { HandingOver } from './handing-over.entity';
import { Hydration } from './hydration.entity';
import { Meal } from './meal.entity';
import { Vital } from './vital.entity';

@Entity({ name: 'mst_staff' })
export class Staff {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_staff?: number;

    @Column()
    str_staffName: string;

    @Column()
    str_accountName: string;

    @Column()
    hash_password: string;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_administrator: number;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_developer: number;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_delete: number;

    // 各入力に対してFillOutStaffが定義されているため
    // @OneToMany(() => Excretion, excretions => excretions.staff)
    // excretions?: Excretion[];

    // @OneToMany(() => HandingOver, handingOvers => handingOvers.staff)
    // handingOvers?: HandingOver[];

    // @OneToMany(() => Hydration, hydrations => hydrations.staff)
    // hydrations?: Hydration[];

    // @OneToMany(() => Meal, meals => meals.staff)
    // meals?: Meal[];

    // @OneToMany(() => Vital, vitals => vitals.staff)
    // vitals?: Vital[];

    constructor(
        str_staffName: string,
        str_accountName: string,
        hash_password: string,
        is_administrator: number,
        is_developer: number,
        is_delete: number
    ) {
        this.str_staffName = str_staffName;
        this.str_accountName = str_accountName;
        this.hash_password = hash_password;
        this.is_administrator = is_administrator;
        this.is_developer = is_developer;
        this.is_delete = is_delete;
    }

}
