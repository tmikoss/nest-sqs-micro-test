import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BkgCOntroller {
  @EventPattern('helloCalled')
  onHello(data: any) {
    console.log(`one ${JSON.stringify(data)}`);
  }

  @EventPattern('helloCalled')
  onHelloTwo(data: any) {
    console.log(`two ${JSON.stringify(data)}`);
  }
}
