import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      logging: false,
      synchronize: true,

      entities: [__dirname + '**/entities/*.js,modules/**/entities/*.js'],
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/../database/migrations/**/*.ts'],
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  autoLoadEntities: true,
  logging: false,
  synchronize: true,

  entities: [__dirname + '**/entities/*.js,modules/**/entities/*.js'],
  //migrationsTableName: 'migrations',
  migrations: [__dirname + '/../database/migrations/**/*.ts'],
  //seeds: [InitSeeder],
};
