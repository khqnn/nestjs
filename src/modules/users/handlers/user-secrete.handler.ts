import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt'; 


export class UserSecreteHandler extends BaseHandler{
    async handle(payload: any): Promise<{ success: boolean; statusCode: number; data: object; message: string; error?: any; }> {
        
        const createUser = payload.createUser

        const secrete = uuid()
        const password_hash = await bcrypt.hash(createUser.password, 10)

        createUser.secrete = secrete
        createUser.enabled = true
        createUser.verified = false
        createUser.password_temp = password_hash
        createUser.password_hash = null

        payload.createUser = createUser
        
        const nextHandlerResponse = await this.callNextHandler(payload)
        return nextHandlerResponse
    }
    
}