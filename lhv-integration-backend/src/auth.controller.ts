import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get()
  redirectToAuthUrl(@Res() res): string {
    return res.redirect(this.authService.getLhvAuthUrl());
  }

  @Get('/token')
  getToken(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('error') error: string,
    @Query('error_description') errorDescription: string): Observable<AxiosResponse<any, any>> {
      return this.authService.getLhvToken(code);
  }
}
