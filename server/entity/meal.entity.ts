import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Index } from 'typeorm';
import { Record } from './record.entity';
import { Staff } from './staff.entity';

@Entity({ name: 'tbl_meal' })
export class Meal {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_meal?: number;

    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;

    @Column()
    id_record!: number;


    @Column({ length: 45 })
    str_mealType: string;

    @Column({
        type: 'tinyint',
        unsigned: true
    })
    num_mainProportion: number;

    @Column({
        type: 'tinyint',
        unsigned: true
    })
    num_subProportion: number;

    @Column({ nullable: true })
    str_remark: string | null;


    @ManyToOne(() => Staff, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_fillOutStaff' })
    readonly staff?: Staff;

    @Column({ name: 'id_fillOutStaff' })
    id_fillOutStaff!: number;

    constructor(str_mealType: string, num_mainProportion: number, num_subProportion: number, id_record: number) {
        this.str_mealType = str_mealType;
        this.num_mainProportion = num_mainProportion;
        this.num_subProportion = num_subProportion;
        this.id_record = id_record;
    }

}
