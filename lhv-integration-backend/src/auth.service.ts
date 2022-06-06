import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  getLhvAuthUrl(): string {
    const crypto = require('crypto');
    let lhvAuthUrl = this.createAuthUrl(
      this.configService.get<string>('LHV_API_BASE_URL'),
      this.configService.get<string>('LHV_CLIENT_ID'),
      'http://localhost:4200/',
      crypto.randomUUID().toString()
    );
    return lhvAuthUrl;
  }

  private createAuthUrl(lhvApiBaseUrl: string, lhvClientId: string, redirectUrl: string, uuid: string): string {
    let lhvAuthUrl = new URL(lhvApiBaseUrl + '/oauth/authorize');
    lhvAuthUrl.searchParams.set('scope', 'psd2');
    lhvAuthUrl.searchParams.set('response_type', 'code');
    lhvAuthUrl.searchParams.set('client_id', lhvClientId);
    lhvAuthUrl.searchParams.set('redirect_uri', redirectUrl);
    lhvAuthUrl.searchParams.set('state', uuid);
    return lhvAuthUrl.toString();
  }
}
