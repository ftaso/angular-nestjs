import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Record } from './record.entity';

@Entity({ name: 'tbl_serviceTag_map' })
export class ServiceTagMap {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_serviceTag_map?: number;

    @ManyToOne(() => Record, { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_record' })
    readonly record?: Record;

    @Column()
    id_record!: number;

    @Column()
    id_serviceTag: number;

    constructor(id_record: number, id_serviceTag: number) {
        this.id_record = id_record;
        this.id_serviceTag = id_serviceTag;
    }

}
