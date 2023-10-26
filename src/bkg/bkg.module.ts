import { Module } from '@nestjs/common';
import { BkgCOntroller } from './bkg.controller';

@Module({
  imports: [],
  controllers: [BkgCOntroller],
  providers: [],
})
export class BkgModule {}
