import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Log } from 'src/entities/log.entity';
import { CreateRequestContext, MikroORM } from '@mikro-orm/core';

@Controller()
// @UseInterceptors(MikroOrmInterceptor)
export class BkgCOntroller {
  constructor(
    @InjectRepository(Log)
    private readonly logRepo: EntityRepository<Log>,
    private readonly em: EntityManager,
    private readonly orm: MikroORM,
  ) {}

  @EventPattern('helloCalled')
  @CreateRequestContext()
  async onHelloOne(data: any) {
    console.log(`one got: ${data}`);
    await this.em.persistAndFlush(
      this.logRepo.create({ handler: 'one', data: JSON.stringify(data) }),
    );
    console.log('one done');
  }

  @EventPattern('helloCalled')
  @CreateRequestContext()
  async onHelloTwo(data: any) {
    console.log(`two got: ${data}`);
    await this.em.persistAndFlush(
      this.logRepo.create({ handler: 'two', data: JSON.stringify(data) }),
    );
    console.log('two done');
  }
}
