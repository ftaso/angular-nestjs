import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'str_accountName',
            passwordField: 'password',
        });
    }

    async validate(accountName: string, pass: string): Promise<any> {
        const staff = await this.authService.validateStaff(accountName, pass);
        if (!staff) {
            throw new UnauthorizedException();
        }
        return staff;
    }
}