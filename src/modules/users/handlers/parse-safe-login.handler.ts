import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";

export class ParseSafeLoginHandler extends BaseHandler{
    async handle(payload: any){

        const nextHandlerResponse = await this.callNextHandler(payload)

        const user: User = nextHandlerResponse.data['user']

        if(!nextHandlerResponse.success){
            delete user.secrete
            delete user.password_hash
            delete user.password_temp
        }
        

        return nextHandlerResponse
    }
}