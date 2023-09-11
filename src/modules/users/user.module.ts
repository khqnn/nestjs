import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserMiddleware } from "./user.middleware";
import { TenantService } from "src/modules/tenants/tenants.service";


@Module({
    controllers: [UserController],
    providers: [UserService, TenantService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserMiddleware).forRoutes(UserController)
    }

}