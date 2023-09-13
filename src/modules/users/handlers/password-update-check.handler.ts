import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";
import bcrypt from 'bcrypt';
import { UpdatePasswordDto } from "../dto/update-password.dto";

export class PasswordUpdateCheckHandler extends BaseHandler {
    async handle(payload: any) {

        const user: User = payload.user
        const updatePassword: UpdatePasswordDto = payload.updatePassword

        if(!bcrypt.compare(updatePassword.old_password, user.password_hash)){
            return {success: false, statusCode: 401, data: {}, message: 'Not authorized!'}
        }
        
        user.password_hash = await bcrypt.hash(updatePassword.new_password, 10)

        return this.callNextHandler(payload)
    }

}