import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
export const typeormAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const user = config.get('MONGO_USER');
    const password = config.get('MONGO_PASSWORD');
    const database = config.get('MONGO_DATABASE');

    const url = `mongodb+srv://${user}:${password}@node-mongo.no4qmpi.mongodb.net/?retryWrites=true&w=majority`;
    return {
      type: 'mongodb',
      url: url,
      database: database,
      entities: ['dist/**/*.entity.js'],
    };
  },
};
