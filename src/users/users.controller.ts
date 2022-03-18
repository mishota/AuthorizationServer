import { UsersService } from './users.service';
import { Controller, Post, UploadedFile, UseInterceptors, Get, Body, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from './dto/create-user-dto';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { FindUserDto } from './dto/find-user-dto';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { };

   @Post('upload')
   @UseInterceptors(FileInterceptor('file', saveImageToStorage))
   uploadFile(@UploadedFile() file: Express.Multer.File) {
      const fileName = file?.filename;
      if (!fileName) {
         return of({ error: 'File did not upload' })
      }
      const imagesFolderPath = join(process.cwd(), 'avatars');
      const fullImagePath = join(imagesFolderPath + '/' + file.filename);
      return fullImagePath;
   }

   @Get('/user/image/:imagename')
   findUserImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
      return of(res.sendFile(join(process.cwd(), 'avatars/' + imagename)))
      // return of(res.sendFile(imagename))
   }

   @Post('create')
   create(@Body() userDto: CreateUserDto) {
      return this.usersService.createUser(userDto);
   }

   @Post('/user')
   getUser(@Body() userFindDto: FindUserDto) {
      return this.usersService.getUser(userFindDto);
   }

   @Get('/last-user')
   getLastUser() {
      return this.usersService.getLastUser();
   }

   @Get('/users')
   getAllUsers() {
      return this.usersService.getAllUsers();
   }
}
