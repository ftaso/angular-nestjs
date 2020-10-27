import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Record } from './record.entity';
import { Staff } from './staff.entity';

@Entity({ name: 'tbl_handingOver' })
export class HandingOver {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_handingOver?: number;

    
    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;
    
    @Column()
    id_record!: number;

    @Column({ nullable: true, width: 2048, default: null })
    str_handingOver: string | null = null;

    @Column({ nullable: true, width: 2048, default: null })
    str_report: string | null = null;

    @Column({ nullable: true, width: 2048, default: null })
    str_note: string | null = null;

    @ManyToOne(() => Staff, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_fillOutStaff' })
    readonly staff?: Staff;

    @Column()
    id_fillOutStaff!: number;

}
