import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StaffModule } from '../staff/staff.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    StaffModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '43200s' },
    }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: 'secretKey',
    //     signOptions: {
    //       expiresIn: `43200s`,
    //     },
    //   })
    // }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
