import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';
import { Agent } from 'https';
import { readFileSync } from 'node:fs';

@Injectable()
export class LhvOauthStrategy extends PassportStrategy(Strategy, 'lhv') { 
  constructor() {
    super({
      authorizationURL: `${process.env.LHV_API_OAUTH_AUTHORIZE}?${stringify({
				client_id    : `${process.env.LHV_CLIENT_ID}`,
				redirect_uri : `${process.env.BACK_END_AUTH_REDIRECT}`,
				response_type: 'code',
				scope        : 'psd2',
			}) }`,
			tokenURL:  `${process.env.LHV_API_OAUTH_TOKEN}`,
			callbackURL: `${process.env.BACK_END_AUTH_REDIRECT}`,
      clientID: `${process.env.LHV_CLIENT_ID}`
    });
    this._oauth2.setAgent(new Agent({
      cert: readFileSync(`${process.env.CERT_LOCATION}`),
      key: readFileSync(`${process.env.KEY_LOCATION}`)
    }));
  }

  async validate(accessToken: string, refreshToken: string): Promise<any> {
		return {accessToken, refreshToken};
	}

}