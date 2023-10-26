import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { BkgModule } from './bkg.module';
import { SQSMicroClient } from './sqs-micro-client';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BkgModule,
    {
      strategy: new SQSMicroClient(),
    },
  );
  await app.listen();
}
bootstrap();
