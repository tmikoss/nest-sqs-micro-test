import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BkgCOntroller {
  @EventPattern('helloCalled')
  onHello(data: any) {
    console.log(JSON.stringify(data))
  }
}
