import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { TenantModule } from './modules/tenants/tenants.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './common/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { IdentityGuard } from './common/guards/identity.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRETE_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
    UserModule,
    TenantModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    },
    {
      provide: APP_GUARD,
      useClass: IdentityGuard
    },
  ],
})
export class AppModule { }
