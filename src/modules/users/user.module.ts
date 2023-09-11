import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TenantService } from 'src/modules/tenants/tenants.service';
import { userProvider } from './user.provider';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, TenantService, ...userProvider],
})
export class UserModule {}
