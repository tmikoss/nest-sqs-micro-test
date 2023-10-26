import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';

export class SQSMicroClient extends Server implements CustomTransportStrategy {
  private consumers: Consumer[];
  private registeredQueues: string[];

  constructor() {
    super();
    console.log('hello world');

    this.registeredQueues = [];
    this.consumers = [];
  }

  public listen(callback: () => void) {
    this.messageHandlers.forEach((handler, queueName) => {
      console.log({ queueName });

      if (handler.isEventHandler) {
        console.log('checking')
        if (this.registeredQueues.includes(queueName)) return;

        console.log(`handling ${queueName}`);

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
            console.log(message);
            const { Body } = message;
            await handler(JSON.parse(Body));
          },
        });

        app.on('error', (err) => {
          console.error(`Error while consuming SQS: ${err.message}`);
        });

        app.on('processing_error', (err) => {
          console.error(`Error while processing SQS: ${err.message}`);
        });

        app.start();

        this.consumers.push(app);
        this.registeredQueues.push(queueName);
      }
    });

    callback();
  }

  public close() {
    console.log('close');
    for (const consumer of this.consumers) {
      consumer.stop();
    }
    this.registeredQueues = [];
    this.consumers = [];
  }
}

// import {
//     Server,
//     CustomTransportStrategy,
//   } from '@nestjs/microservices';

//   import { SQSOptions } from '../../interfaces/sqs-options.interface';
//   import { SQSContext } from '../ctx-host'

//   import { Consumer } from 'sqs-consumer'

//   export class ServerSQS {
//     private consumers: Consumer[]
//     private registeredQueues: string[]

//     constructor(private readonly options: SQSOptions) {
//       super();

//       // super class establishes the serializer and deserializer; sets up
//       // defaults unless overridden via `options`
//       this.initializeSerializer(options);
//       this.initializeDeserializer(options);
//       this.registeredQueues = [];
//       this.consumers = [];
//     }

//     /**
//      * listen() is required by `CustomTransportStrategy` It's called by the
//      * framework when the transporter is instantiated, and kicks off a lot of
//      * the machinery.
//      */
//     public listen(callback: () => void) {
//       this.start(callback);
//     }

//     public start(callback) {
//         // register sqs-consumer per queue
//         this.bindHandlers();
//         // call any user-supplied callback from `app.listen()` call
//         callback();
//     }

//     public bindHandlers() {
//       this.messageHandlers.forEach((handler, queueName) => {
//         if (handler.isEventHandler) {
//             const { sqsUri, waitTimeSeconds } = this.options
//             if (this.registeredQueues.includes(queueName)) return;
//             const app = Consumer.create({
//                 queueUrl: `${sqsUri}/${queueName}`,
//                 waitTimeSeconds: waitTimeSeconds ?? 0,
//                 handleMessage: async (message) => {
//                     const { Body, ...awsDetails } = message
//                     const sqsCtx = new SQSContext([queueName, awsDetails]);
//                     await handler(JSON.parse(Body), sqsCtx);
//                 }
//             });

//             app.on('error', (err) => {
//                 console.error(`Error while consuming SQS: ${err.message}`);
//             });

//             app.on('processing_error', (err) => {
//                 console.error(`Error while processing SQS: ${err.message}`);
//             });

//             app.start();
//             this.consumers.push(app)
//             this.registeredQueues.push(queueName)
//         }
//       });
//     }

//     public close() {
//         for (const consumer of this.consumers) {
//             consumer.stop()
//         }
//         this.registeredQueues = null;
//         this.consumers = null;
//     }
//   }
