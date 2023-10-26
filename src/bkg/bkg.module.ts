import { Module } from '@nestjs/common';
import { BkgCOntroller } from './bkg.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Log } from 'src/entities/log.entity';

@Module({
  imports: [DatabaseModule, MikroOrmModule.forFeature([Log])],
  controllers: [BkgCOntroller],
  providers: [],
})
export class BkgModule {}
