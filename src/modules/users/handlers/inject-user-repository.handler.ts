import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { Repository } from "typeorm";
import { User } from "../user.entity";

export class InjectUserRepositoryHandler extends BaseHandler{
    constructor(private userRepository: Repository<User>){
        super()
    }
    async handle(payload: any) {
        payload.userRepository = this.userRepository
        return await this.callNextHandler(payload)
    }
    
}