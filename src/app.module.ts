import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { TenantModule } from './modules/tenants/tenants.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, TenantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
