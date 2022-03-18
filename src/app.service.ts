import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mishaaa!';
  }
  getUserData(): string {
    return JSON.stringify({ id: 1, name: 'Misha' });
  }
}
