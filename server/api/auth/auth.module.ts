import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StaffModule } from '../staff/staff.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    StaffModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '43200s' },
    }),
    SessionModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
