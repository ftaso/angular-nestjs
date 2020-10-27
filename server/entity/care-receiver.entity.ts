import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mst_careReceiver' })
export class CareReceiver {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_careReceiver?: number;

    @Column()
    str_careReceiver: string;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_delete: number;

    constructor(str_careReceiver: string) {
        this.str_careReceiver = str_careReceiver;
    }

}
