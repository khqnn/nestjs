import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { Repository } from "typeorm";
import { User } from "../user.entity";


export class GetUsersHandler extends BaseHandler{
    async handle(payload: any) {

        const userRepository: Repository<User> = payload.userRepository
        const users: User[] = await userRepository.find()
        
        const nextHandlerResponse = await this.callNextHandler(payload)
        nextHandlerResponse.data['users'] = users
        return nextHandlerResponse
    }
    
}