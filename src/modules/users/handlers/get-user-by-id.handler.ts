import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { Repository } from "typeorm";
import { User } from "../user.entity";


export class GetUserByIdHandler extends BaseHandler {
    async handle(payload: any): Promise<{ success: boolean; statusCode: number; data: object; message: string; error?: any; }> {

        const user_id = payload.user_id
        const userRepository: Repository<User> = payload.userRepository

        let user = undefined
        try {
            const results = await userRepository.findOneBy({id: user_id})
            if(!results){
                return {success: false, statusCode: 404, data: {}, message: 'User not found'}
            }

            user = results
        } catch (error) {
            return {success: false, statusCode: 400, data: {}, message: 'An error occured', error: error}
            
        }

        payload.user = user

        const nextHandlerResponse = await this.callNextHandler(payload);
        nextHandlerResponse.data['user'] = user
        return nextHandlerResponse;
    }

}