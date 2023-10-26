import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';

export class SQSMicroClient extends Server implements CustomTransportStrategy {
  private consumers: Consumer[];

  constructor() {
    super();

    this.consumers = [];
  }

  public listen(callback: () => void) {
    this.messageHandlers.forEach((handler, queueName) => {
      console.log({ queueName });

      if (handler.isEventHandler) {
        const app = Consumer.create({
          queueUrl: 'http://localhost:4566/000000000000/foo-jobs',
          sqs: new SQSClient({
            region: 'eu-north-1',
            endpoint: 'http://localhost:4566',
            credentials: {
              accessKeyId: 'default',
              secretAccessKey: 'default',
            },
          }),
          handleMessage: async (message) => {
            const { Body } = message;
            await handler(JSON.parse(Body));
          },
        });

        app.on('error', (err) => {
          console.error(`error: ${err.message}`);
        });

        app.on('processing_error', (err) => {
          console.error(`processing_error: ${err.message}`);
        });

        app.start();

        this.consumers.push(app);
      }
    });

    callback();
  }

  public close() {
    console.log('close');
    for (const consumer of this.consumers) {
      consumer.stop();
    }
    this.consumers = [];
  }
}
