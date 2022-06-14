import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersRepository } from './users.reporitory';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
