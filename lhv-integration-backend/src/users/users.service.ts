import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.reporitory';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async getUserById(userId: string): Promise<User | undefined> {
		return this.usersRepository.findOne({userId: userId});
	}

	async findOneAndUpdate(
		field: string,
		fieldValue: string,
		user: UpdateUserDto
	): Promise<User | undefined> {
		return this.usersRepository.findOneAndUpdate({[field]: fieldValue}, user);
	}
}
