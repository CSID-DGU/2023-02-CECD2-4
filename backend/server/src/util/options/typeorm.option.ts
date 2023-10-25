import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
export const typeormAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const user = config.get('DB_USER');
    const password = config.get('DB_PASSWORD');
    const database = config.get('DB_DATABASE');
    const host = config.get('DB_HOST');
    return {
      type: 'mysql',
      host: host,
      database: database,
      username: user,
      password: password,
      entities: ['dist/**/*.entity.js'],
      charset: 'utf8mb4', // emoji까지 표현 가능,
      // migrations: ['dist/migration/*.js'],
      // synchronize: true,
      logging: process.env.NODE_ENV != 'production',
    };
  },
};
