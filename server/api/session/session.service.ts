import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../../entity/session.entity';
import { getRepository, Repository } from 'typeorm';


@Injectable()
export class SessionService {

    constructor(
        @InjectRepository(Session)
        private repository: Repository<Session>) {

    }

    findOne(uuid: string): object {
        return this.repository.findOne(
            {
                relations: ['staff'],
                where: {
                    id_session: uuid
                }
            }
        ).then((result: Session) => {
            return {
                Error: false,
                auth: true,
                staffId: result.id_staff,
                isAdministrator: result.staff.is_administrator,
                isDeveloper: result.staff.is_developer,
                accountName: result.staff.str_accountName,
            };
        });
    }

    async post(sessionId: string, staffId: number): Promise<any> {
        const data = {
            id_session: sessionId,
            id_staff: staffId
        };
        const model = this.repository.create(data);
        await this.repository.save(model);
        return false;
    }

    async delete(sessionId: string): Promise<any> {
        await this.repository.delete({ id_session: sessionId });
        return sessionId;
    }

}
