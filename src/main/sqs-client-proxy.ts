//sns-client-proxy.ts
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { Producer } from 'sqs-producer';
import { SQSClient } from '@aws-sdk/client-sqs';

export class SQSClientProxy extends ClientProxy {
  async connect(): Promise<any> {
    return true;
  }

  async close() {
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

    await producer.send({
      id: Date.now().toString(),
      body: JSON.stringify(packet),
    });
  }

  publish(
    _packet: ReadPacket<any>,
    _callback: (packet: WritePacket<any>) => void,
  ): () => void {
    return () => {
      // noop
    };
  }
}
