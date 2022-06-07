import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
