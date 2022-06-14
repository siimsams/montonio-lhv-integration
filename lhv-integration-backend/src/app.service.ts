import { Injectable } from '@nestjs/common';
import { Agent } from 'https';
import { readFileSync } from 'node:fs';
import { UsersService } from './users/users.service';
import axios from 'axios';

const newLocal = 'https://api.sandbox.lhv.eu/psd2/v1/accounts-list';
@Injectable()
export class AppService {
  constructor(
		private readonly usersService: UsersService  ){}
  
  async getAccounts(id: any): Promise<any> {
    const user = await this.usersService.getUserById(id);
    return await axios.get(
      newLocal, 
      {
				headers: { 
          Authorization: `Bearer ${ user.accessToken }`,
          accept: 'application/json',
          'X-Request-ID': require('crypto').randomUUID()
        }, httpsAgent: new Agent({
          cert: readFileSync(`${process.env.CERT_LOCATION}`),
          key: readFileSync(`${process.env.KEY_LOCATION}`)
        })
			}).then(response => {
        return response.data;
      }).catch(error => {
        return (error.message);
      });
  }
}
