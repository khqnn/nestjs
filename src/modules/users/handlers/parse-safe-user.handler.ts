import { BaseHandler } from "src/common/abstracts/BaseHandler";


export class ParseSafeUser extends BaseHandler{
    async handle(payload: any): Promise<{ success: boolean; statusCode: number; data: object; message: string; error?: any; }> {
        
        const createUser = payload.createUser

        delete createUser.password_temp
        delete createUser.password_hash
        delete createUser.secrete
        
        const nextHandlerResponse = await this.callNextHandler(payload)
        nextHandlerResponse.data['user'] = createUser
        return nextHandlerResponse
    }
    
}