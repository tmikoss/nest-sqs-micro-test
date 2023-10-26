import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { getDatabaseConfig } from './config';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
      inject: [],
    }),
  ],
})
export class DatabaseModule {}
