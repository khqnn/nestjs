import { Module } from '@nestjs/common';
import { TenantController } from './tenants.controller';
import { TenantService } from './tenants.service';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
