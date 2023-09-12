import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { Repository } from "typeorm";
import { User } from "../user.entity";


export class UpdateUserHandler extends BaseHandler {
    async handle(payload: any): Promise<{ success: boolean; statusCode: number; data: object; message: string; error?: any; }> {

        const user_id = payload.user_id
        const user: User = payload.user
        const userRepository: Repository<User> = payload.userRepository

        try {
            await userRepository.update({id: user_id}, user)
        } catch (error) {
            return {success: false, statusCode: 400, data: {}, message: 'could not update user', error: error}
            
        }

        payload.user = user

        const nextHandlerResponse = await this.callNextHandler(payload);
        nextHandlerResponse.data['user'] = user
        return nextHandlerResponse;
    }

}