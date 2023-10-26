import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BkgModule } from './bkg.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BkgModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
