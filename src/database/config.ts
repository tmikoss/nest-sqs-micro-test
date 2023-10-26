import { Options } from '@mikro-orm/core';
import { ConsoleLogger } from '@nestjs/common';

export const getDatabaseConfig = (): Options => {
  const logger = new ConsoleLogger('Database');

  return {
    type: 'postgresql',
    clientUrl: 'postgresql://postgres:postgres@localhost:5445/nest-test',
    entities: ['./dist/entities/**/*.entity.js'],
    entitiesTs: ['./src/entities/**/*.entity.ts'],
    migrations: {
      tableName: 'migrations',
      path: 'dist/database/migrations',
      pathTs: 'src/database/migrations',
    },
    debug: ['query', 'query-params'],
    logger: (message) => logger.log(message),
    seeder: {
      path: 'dist/database/seeders',
      pathTs: 'src/database/seeders',
      defaultSeeder: 'DevSeeder',
    },
  };
};

export default getDatabaseConfig();
