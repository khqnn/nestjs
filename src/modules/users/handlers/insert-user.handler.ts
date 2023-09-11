import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { Repository } from "typeorm";
import { User } from "../user.entity";


export class InsertUserHandler extends BaseHandler{
    async handle(payload: any) {
        console.log('insert user handler...');
        
        const userRepository: Repository<User> = payload.repository
        

        const nextHandlerResponse = await this.callNextHandler(payload)
        return nextHandlerResponse
    }
    
}