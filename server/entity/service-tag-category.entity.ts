import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ServiceTagSubCategory } from './service-tag-sub-category.entity';

@Entity({ name: 'mst_serviceTagCategory' })
export class ServiceTagCategory {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_serviceTagCategory?: number;

    @Column()
    str_serviceTagCategory: string;

    @Column('tinyint', { unsigned: true, default: '0' })
    is_delete: number;

    @OneToMany(() => ServiceTagSubCategory, serviceTagSubCategory => serviceTagSubCategory.serviceTagCategory)
    serviceTagSubCategorys?: ServiceTagSubCategory[];


    constructor(str_serviceTagCategory: string, serviceTagSubCategory: ServiceTagSubCategory[]) {
        this.str_serviceTagCategory = str_serviceTagCategory;
        this.serviceTagSubCategorys = serviceTagSubCategory;
    }

}
