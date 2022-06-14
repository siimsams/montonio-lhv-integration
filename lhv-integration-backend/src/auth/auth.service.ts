import {
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService
{
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService
	) {
	}

	async login(user: any) {
		const userFromDb = await this.usersService.findOneAndUpdate('refreshToken', user.refreshToken, new UpdateUserDto(uuidv4(), user.accessToken))
		
		if (!userFromDb) {
			throw new UnauthorizedException();
		} 

		return {
			access_token: this.jwtService.sign({userId: userFromDb.userId}),
		};
	}
}
