import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'teste-backend-brainny',
        username: 'postgres',
        password: 'postgres',
        entities: ['**/entities/*.js,modules/**/entities/*.js'],
        migrations: ['src/database/migrations/*{.ts,.js}'],
        autoLoadEntities: true,
        logging: false,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
