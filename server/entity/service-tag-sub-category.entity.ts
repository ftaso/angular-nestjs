import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, JoinTable } from 'typeorm';
import { ServiceTagCategory } from './service-tag-category.entity';
import { ServiceTag } from './service-tag.entity';

@Entity({ name: 'mst_serviceTagSubCategory' })
export class ServiceTagSubCategory {
    @PrimaryGeneratedColumn({ unsigned: true })
    // プライマリーキーを変更することはないので
    readonly id_serviceTagSubCategory?: number;

    @Column()
    str_serviceTagSubCategory: string;

    @ManyToOne(() => ServiceTagCategory, serviceTagCategory => serviceTagCategory.serviceTagSubCategorys,
        { cascade: true, nullable: false })
    @JoinColumn({ name: 'id_serviceTagCategory', referencedColumnName: 'id_serviceTagCategory' })
    serviceTagCategory: ServiceTagCategory;

    @Column()
    id_serviceTagCategory: number;

    @OneToMany(() => ServiceTag, serviceTags => serviceTags.serviceTagSubCategory)
    serviceTags?: ServiceTag[];


    @Column('tinyint', { unsigned: true, default: '0' })
    is_delete: number;

    constructor(str_serviceTagSubCategory: string, id_serviceTagCategory: number) {
        this.str_serviceTagSubCategory = str_serviceTagSubCategory;
        this.id_serviceTagCategory = id_serviceTagCategory;
        // this.serviceTagCategory = serviceTagCategory;
    }

}
