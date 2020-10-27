import { Injectable } from '@nestjs/common';
import { StaffService } from '../staff/staff.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
    private configServie: ConfigService
  ) { }

  public getCookiesJwtToken(staff: any){
    const payload = { accountName: staff.str_accountName, sub: staff.id_staff };
    const token =  this.jwtService.sign(payload);
    console.log(`Authentication=${token}; HttpOnly; Path=/; Max-Age=43200`);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=43200`;
    // return this.staffService.findOne(staff.str_accountName).then(result => {
    //   return {
    //     Error: false,
    //     auth: true,
    //     staffId: result.id_staff,
    //     isAdministrator: result.is_administrator,
    //     isDeveloper: result.is_developer,
    //     accountName: result.str_accountName,
    //     token: this.jwtService.sign(payload),
    //     // token: jwt.sign({
    //     //   staffId: rows[0].id_staff
    //     // }, config.secret, { expiresIn: 43200 }) // expires in 12 hours
    //     // // }, config.secret, { expiresIn: 60 }) // expires in 60 seconds
    //   };
    // });
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

  async login(staff: any) {
    const payload = { accountName: staff.str_accountName, sub: staff.id_staff };
    return this.staffService.findOne(staff.str_accountName).then(result => {
      return {
        Error: false,
        auth: true,
        staffId: result.id_staff,
        isAdministrator: result.is_administrator,
        isDeveloper: result.is_developer,
        accountName: result.str_accountName,
        token: this.jwtService.sign(payload),
        // token: jwt.sign({
        //   staffId: rows[0].id_staff
        // }, config.secret, { expiresIn: 43200 }) // expires in 12 hours
        // // }, config.secret, { expiresIn: 60 }) // expires in 60 seconds
      };
    });
  }
}
