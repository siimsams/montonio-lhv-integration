import {
	Controller,
	Get,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LhvOauthGuard } from './guards/lhv-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('lhv')
  @UseGuards(LhvOauthGuard)
  login() {
    return;
  }

  @Get('lhv/redirect')
  @UseGuards(LhvOauthGuard)
  async lhvLoginCallBack(@Req() req, @Res() res) {
    const jwt = await this.authService.login(req.user);
    
    if (jwt) {
      const querystring = require('querystring');
      const query = querystring.stringify({
        idToken: jwt.access_token
      });
      res.redirect(`${process.env.FRONT_END_URL}/accounts?` + query);
    } else {
      res.redirect(`${process.env.FRONT_END_URL}/login`);
    }
  }
}
