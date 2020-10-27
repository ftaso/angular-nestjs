import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ServiceTagSubCategory } from './service-tag-sub-category.entity';

@Entity({ name: 'mst_serviceTag' })
export class ServiceTag {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_serviceTag?: number;

    @Column()
    str_serviceTag: string;

    @ManyToOne(() => ServiceTagSubCategory, serviceTagSubCategory => serviceTagSubCategory.serviceTags,
        { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_serviceTagSubCategory', referencedColumnName: 'id_serviceTagSubCategory'})
    readonly serviceTagSubCategory?: ServiceTagSubCategory;

    @Column()
    id_serviceTagSubCategory: number;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_delete: number;


    constructor(str_serviceTag: string, is_delete: number, id_serviceTagSubCategory: number, serviceTagSubCategory: ServiceTagSubCategory) {
        this.str_serviceTag = str_serviceTag;
        this.is_delete = is_delete;
        this.id_serviceTagSubCategory = id_serviceTagSubCategory;
        this.serviceTagSubCategory = serviceTagSubCategory;
    }

}
