import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { URLSearchParams } from 'url';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService
  ) {}

  getLhvAuthUrl(): string {
    const params = {
      scope: 'psd2',
      response_type: 'code',
      client_id: this.configService.get<string>('LHV_CLIENT_ID'),
      redirect_uri: 'http://localhost:3000/token',
      state: require('crypto').randomUUID().toString()
    };
    return this.createLhvUrl(
      this.configService.get<string>('LHV_API_BASE_URL'),
      '/oauth/authorize',
      params
    );
  }

  getLhvTokenUrl(): string {
    return this.createLhvUrl(
      this.configService.get<string>('LHV_API_BASE_URL'),
      '/oauth/token',
      null
    );
  }
  // I could not get this to work. Even when trying the example curl in the documentation with same dummy values i got an 401.
  getLhvToken(code: string): import("rxjs").Observable<import("axios").AxiosResponse<any, any>> {
    return this.http.post(this.getLhvTokenUrl(), new URLSearchParams({
      client_id: this.configService.get<string>('LHV_CLIENT_ID'),
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3000/token'
    }).toString());
  }

  private createLhvUrl(baseUrl: string, urlPath: string, searchParams: Record<string, string>): string {
    let lhvUrl = new URL(baseUrl + urlPath + (searchParams ? '?' + new URLSearchParams(searchParams).toString() : ''));
    return lhvUrl.toString();
  }
}
