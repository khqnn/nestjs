import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { TenantModule } from './modules/tenants/tenants.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TenantModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
