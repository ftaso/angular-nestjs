import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../../entity/staff.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>
    ) { }


    public findAll(): object {
        return this.staffRepository.find({is_delete: 0}).then((result) => {
            return result;
        });
    }

    async findOne(accountName: string): Promise<Staff | undefined> {
        console.log(this.staffRepository.findOne({ str_accountName: accountName }))
        return this.staffRepository.findOne({ str_accountName: accountName });
    }

    findFromParam(id): object {
        return this.staffRepository.find({ id_staff: id }).then((result) => {
            return result;
        });
    }

    async post(body) {
        body.hash_password = bcrypt.hashSync(body.hash_password, 8);
        const model = this.staffRepository.create(body);
        await this.staffRepository.save(model);
        return model;
    }

    async put(body) {
        await this.staffRepository.update({ id_staff: body.id_staff}, body); // 指定したidをbodyの通りupdate
        // await this.staffRepository.update({ is_delete: 0 }, { is_delete: 1 }); // 1つ目の引数を2つ目の引数にupdate
        return body;
    }

    async delete(id) {
        await this.staffRepository.delete({ id_staff: id });
        return id;
    }
}
