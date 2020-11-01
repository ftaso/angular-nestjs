import { Injectable } from '@nestjs/common';
import { StaffService } from '../staff/staff.service';
import { SessionService } from '../session/session.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private sessionService: SessionService,
    private jwtService: JwtService,
  ) { }

  public getCookiesJwtToken(staff: any): string {
    // アカウント名＋スタッフIDからトークンを作成
    console.log(staff);
    const payload = { accountName: staff.accountName, sub: staff.staffId };
    const token = this.jwtService.sign(payload);
    // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=43200;`;
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=600;`;
  }

  public publishSessionId(staff: any): string {
    // セッションIDを発行し、DBに保存
    const sessionId = this.generateSessionId();
    this.sessionService.post(sessionId, staff.staffId);
    return sessionId;
  }

  public generateSessionId(): string {
    const sessionId = uuid.v4();
    console.log(sessionId);
    return sessionId;
  }

  async login(staff: any): Promise<any> {
    // DBからユーザーデータを取得
    const userData = await this.staffService.findOne(staff.str_accountName);
    return {
      Error: false,
      auth: true,
      staffId: userData.id_staff,
      isAdministrator: userData.is_administrator,
      isDeveloper: userData.is_developer,
      accountName: userData.str_accountName
    };
  }

  async validateStaff(accontName: string, pass: string): Promise<any> {
    const staff = await this.staffService.findOne(accontName);
    const passwordIsValid = bcrypt.compareSync(pass, staff.hash_password);
    if (staff && passwordIsValid) {
      const { hash_password, ...result } = staff;
      return result;
    }
    return null;
  }

}
