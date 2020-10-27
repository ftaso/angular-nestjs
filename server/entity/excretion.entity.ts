import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Record } from './record.entity';
import { Staff } from './staff.entity';

@Entity({ name: 'tbl_excretion' })
export class Excretion {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_excretion?: number;

    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;

    @Column()
    id_record!: number;

    @Column('time')
    tm_excrete: string;

    @Column()
    str_excretionState: string;

    @Column({ nullable: true })
    str_remark: string | null;

    @ManyToOne(() => Staff, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_fillOutStaff' })
    readonly staff?: Staff;

    @Column({ name: 'id_fillOutStaff' })
    id_fillOutStaff!: number;

    constructor(tm_excrete: string, str_excretionState: string, str_remark?: string) {
        this.tm_excrete = tm_excrete;
        this.str_excretionState = str_excretionState;
        if (str_remark) { this.str_remark = str_remark; }
    }

}
