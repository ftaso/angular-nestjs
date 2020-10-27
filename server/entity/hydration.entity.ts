import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Record } from './record.entity';
import { Staff } from './staff.entity';

@Entity({ name: 'tbl_hydration' })
export class Hydration {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_hydration?: number;

    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;

    @Column()
    id_record!: number;

    @Column('time')
    tm_hydrate: string;

    @Column({ unsigned: true })
    num_hydrate: number;

    @Column('tinyint', { unsigned: true })
    is_fixed: number;

    @Column({ nullable: true })
    str_remark: string | null;

    @ManyToOne(() => Staff, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_fillOutStaff' })
    readonly staff?: Staff;

    @Column({ name: 'id_fillOutStaff' })
    id_fillOutStaff!: number;

    constructor(tm_hydrate: string, num_hydrate: number, is_fixed: number, id_record: number) {
        this.tm_hydrate = tm_hydrate;
        this.num_hydrate = num_hydrate;
        this.is_fixed = is_fixed;
        this.id_record = id_record;
    }

}
