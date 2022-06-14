import {
  HttpModule,
} from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    PassportModule,
    HttpModule, 
    ConfigModule.forRoot({isGlobal: true, cache: true, expandVariables: true }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_URL}`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
