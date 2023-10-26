import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { SQSClientProxy } from 'src/main/sqs-client-proxy';
import { DatabaseModule } from 'src/database/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Log } from 'src/entities/log.entity';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'BKG_SERVICE', customClass: SQSClientProxy },
    ]),
    DatabaseModule,
    MikroOrmModule.forFeature([Log]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
