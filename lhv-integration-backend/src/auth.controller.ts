import { Controller, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get()
  redirectToAuthUrl(@Res() res): string {
    return res.redirect(this.authService.getLhvAuthUrl());
  }
}
