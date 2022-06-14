import {
  Module,
} from '@nestjs/common';
import {
  HttpModule,
} from '@nestjs/axios';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LhvOauthStrategy } from './strategies/lhv-oauth.strategy';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LhvOauthStrategy,
    JwtStrategy,
    ConfigService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule
{
}
