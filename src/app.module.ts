import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RegisteredTimesModule } from './modules/registered-times/registered-times.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (headersRaw: Record<string, unknown>) => {
            // Lowercase each header key
            const headers = Object.keys(headersRaw).reduce((dest, key) => {
              dest[key.toLowerCase()] = headersRaw[key];
              return dest;
            }, {});
            return {
              req: {
                headers: headers,
              },
            };
          },
        },
      },
    }),
    AuthModule,
    UsersModule,
    RegisteredTimesModule,
  ],
  providers: [],
})
export class AppModule {}
