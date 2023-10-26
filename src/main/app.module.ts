import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { SQSClientProxy } from 'src/sqs-client-proxy';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'MATH_SERVICE', customClass: SQSClientProxy },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
