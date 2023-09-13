import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";
import { UserLoginDto } from "../dto/user-login.dto";
import * as bcrypt from 'bcrypt';

export class CheckLoginPasswordHandler extends BaseHandler {
    async handle(payload: any) {

        const user: User = payload.user
        const userLogin: UserLoginDto = payload.userLogin


        if(!await bcrypt.compare(userLogin.password, user.password_hash)){
            return {success: false, statusCode: 401, data: {}, message: 'Not authorized!'}
        }
        

        return this.callNextHandler(payload)
    }

}