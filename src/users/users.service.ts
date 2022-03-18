import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { FindUserDto } from './dto/find-user-dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User) private userRepository: typeof User) { }

   getUserData(): string {
      return JSON.stringify({ id: 1, name: 'Misha' });
   }

   async createUser(dto: CreateUserDto) {
      const user = await this.userRepository.create(dto);
      return user;
   }

   async getUser(userFindDto: FindUserDto) {
      const user = await this.userRepository.findOne({
         where: {
            email: userFindDto.email,
            password: userFindDto.password
         },
      })
      return user;
   }

   async getAllUsers() {
      const users = await this.userRepository.findAll();
      return users;
   }
}
