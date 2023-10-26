import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  getHello(): string {
    this.client.emit<number>('helloCalled', { at: new Date() });
    return 'Hello World!';
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
