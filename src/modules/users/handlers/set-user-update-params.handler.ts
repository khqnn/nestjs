import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";
import { UpdateUserDto } from "../dto/user-update.dto";

export class SetUserUpdateParams extends BaseHandler {
    async handle(payload: any) {

        const user: User = payload.user
        const updateUser: UpdateUserDto = payload.updateUser

        Object.assign(user, updateUser)

        return await this.callNextHandler(payload);
    }

}