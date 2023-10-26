//sns-client-proxy.ts
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { Producer } from 'sqs-producer';
import { SQSClient } from '@aws-sdk/client-sqs';

export class SQSClientProxy extends ClientProxy {
  async connect(): Promise<any> {
    console.log('connect');
    return true;
  }

  async close() {
    console.log('close');
    return true;
  }

  async dispatchEvent(packet: ReadPacket<any>): Promise<any> {
    const producer = Producer.create({
      queueUrl: 'http://localhost:4566/000000000000/foo-jobs',
      region: 'eu-north-1',
      sqs: new SQSClient({
        region: 'eu-north-1',
        endpoint: 'http://localhost:4566',
        credentials: {
          accessKeyId: 'default',
          secretAccessKey: 'default',
        },
      }),
    });

    const message = JSON.stringify({
      ...packet.data,
      pattern: packet.pattern, //this is important for figuring out the handler
    });

    console.log(`sending: ${message}`);

    try {
      const res = await producer.send({
        id: Date.now().toString(),
        body: message,
      });

      console.log(`done: ${JSON.stringify(res)}`);
    } catch (error) {
      console.error(error);
    }
  }

  publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ): () => void {
    console.log('message:', packet);
    //we wont be using this in event based microservices
    return () => console.log('teardown');
  }
}
