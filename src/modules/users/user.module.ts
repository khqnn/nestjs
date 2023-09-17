import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TenantService } from 'src/modules/tenants/tenants.service';
import { userProvider } from './user.provider';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, TenantService, ...userProvider, UserResolver],
})
export class UserModule {}
