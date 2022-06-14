import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { readFileSync } from 'fs';
import { Agent } from 'http';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/accounts')
  @UseGuards(JwtAuthGuard)
  async getAccounts(@Request() req) {    
    return await this.appService.getAccounts(req.user.userId);
  }
}
