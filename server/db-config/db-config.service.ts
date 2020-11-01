import { Injectable } from '@nestjs/common';
import { CareReceiver } from '../entity/care-receiver.entity';
import { Excretion } from '../entity/excretion.entity';
import { HandingOver } from '../entity/handing-over.entity';
import { Hydration } from '../entity/hydration.entity';
import { Meal } from '../entity/meal.entity';
import { RegularSchedule } from '../entity/regular-schedule.entity';
import { Vital } from '../entity/vital.entity';
import { Staff } from '../entity/staff.entity';
import { Record } from '../entity/record.entity';
import { Service } from '../entity/service.entity';
import { ServiceType } from '../entity/service-type.entity';
import { ServiceDetail } from '../entity/service-detail.entity';
import { ServiceDetailMap } from '../entity/service-detail-map.entity';
import { Session } from '../entity/session.entity';

@Injectable()
export class DbConfigService {

    is_dev = false;
    getTypeOrmConfig(): object {
        if (this.is_dev === false) {
            return {
                type: 'mysql',
                host: '34.84.74.246',
                port: 3306,
                username: 'root',
                password: 'rDzj6r0wvJ3qEGrs',
                database: 'db_ikoinoie',
                socketPath: `/cloudsql/${'ikoinoie26:asia-northeast1:db-ikoinoie26'}`,
                connectTimeout: 10000,  // タイムアウト(msec)
                supportBigNumbers: true,  // bigint, decimal をサポートする
                dateStrings: true,
                connectionLimit: 20,  // 一度に生成する接続インスタンスの数
                logging: true,
                charset: 'utf8',
                multipleStatements: true,
                entities: [
                    Staff,
                    Record,
                    CareReceiver,
                    Excretion,
                    HandingOver,
                    Hydration,
                    Meal,
                    RegularSchedule,
                    Vital,
                    Service,
                    ServiceType,
                    ServiceDetail,
                    ServiceDetailMap,
                    Session
                ],
                synchronize: false // true にするとforeign_key周りでerror吐く
            };
        } else {
            return {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'rDzj6r0wvJ3qEGrs',
                database: 'db_ikoinoie',
                connectTimeout: 10000,  // タイムアウト(msec)
                supportBigNumbers: true,  // bigint, decimal をサポートする
                dateStrings: true,
                connectionLimit: 20,  // 一度に生成する接続インスタンスの数
                debug: false,
                charset: 'utf8',
                multipleStatements: true,
                entities: [
                    Staff,
                    Record,
                    CareReceiver,
                    Excretion,
                    HandingOver,
                    Hydration,
                    Meal,
                    RegularSchedule,
                    Vital,
                    Service,
                    ServiceType,
                    ServiceDetail,
                    ServiceDetailMap,
                    Session
                ],
                synchronize: false // true にするとforeign_key周りでerror吐く
            };
        }
    }
}

const dbConfigService = new DbConfigService();
export { dbConfigService };
