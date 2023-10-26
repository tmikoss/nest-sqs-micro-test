import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Log } from 'src/entities/log.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('BKG_SERVICE') private client: ClientProxy,
    @InjectRepository(Log)
    private readonly logRepo: EntityRepository<Log>,
  ) {}

  async getHello() {
    this.client.emit('helloCalled', { at: new Date() });

    const latest = await this.logRepo.find(
      {},
      {
        limit: 10,
        orderBy: { createdAt: 'DESC' },
        fields: ['data', 'handler', 'updatedAt'],
      },
    );

    return JSON.stringify(latest, null, 2);
  }
}
