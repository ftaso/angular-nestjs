import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Record } from './record.entity';
import { Staff } from './staff.entity';

@Entity({ name: 'tbl_vital' })
export class Vital {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_vital?: number;

    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;

    @Column()
    id_record!: number;

    @Column({
        type: 'time',
        nullable: true
    })
    tm_check: string;

    @Column({
        type: 'float',
        nullable: true
    })
    num_bodyTemperature?: number | null;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    num_maximalBloodPressure: number | null;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    num_minimalBloodPressure: number | null;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    num_pulse: number | null;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    num_SpO2: number | null;

    @Column({ nullable: true })
    str_remark: string | null;


    @ManyToOne(() => Staff, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_fillOutStaff' })
    readonly staff?: Staff;

    @Column({ name: 'id_fillOutStaff' })
    id_fillOutStaff!: number;

    constructor(
        id_record: number,
        id_fillOutStaff: number,
        tm_check?: string,
        num_bodyTemperature?: number,
        num_maximalBloodPressure?: number,
        num_minimalBloodPressure?: number,
        num_pulse?: number,
        num_SpO2?: number,
        str_remark?: string
    ) {
        this.id_record = id_record;
        this.id_fillOutStaff = id_fillOutStaff;
        if (tm_check) { this.tm_check = tm_check; }
        if (num_bodyTemperature) { this.num_bodyTemperature = num_bodyTemperature; }
        if (num_maximalBloodPressure) { this.num_maximalBloodPressure = num_maximalBloodPressure; }
        if (num_minimalBloodPressure) { this.num_minimalBloodPressure = num_minimalBloodPressure; }
        if (num_pulse) { this.num_pulse = num_pulse; }
        if (num_SpO2) { this.num_SpO2 = num_SpO2; }
        if (str_remark) { this.str_remark = str_remark; }
    }

}
