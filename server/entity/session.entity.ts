// import 'reflect-metadata';
import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Staff } from './staff.entity';

@Entity({ name: 'tbl_session' })
export class Session {
    @PrimaryColumn({ length: 36 })
    // プライマリーキーを変更することはないので
    id_session: string;


    @OneToOne(() => Staff)
    @JoinColumn({ name: 'id_staff' })
    staff: Staff;

    @Column({ unsigned: true })
    id_staff: number;

    @CreateDateColumn()
    readonly created_at?: string;


    constructor(
        id_session: string,
        id_staff: number
    ) {
        this.id_session = id_session;
        this.id_staff = id_staff;
    }

}
