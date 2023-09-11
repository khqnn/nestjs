import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TenantService } from "src/modules/tenants/tenants.service";


@Module({
    controllers: [UserController],
    providers: [UserService, TenantService]
})
export class UserModule { }