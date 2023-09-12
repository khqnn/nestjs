import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";


export class GenerateVerificationTokenHandler extends BaseHandler {
    async handle(payload: any): Promise<{ success: boolean; statusCode: number; data: object; message: string; error?: any; }> {

        const jwt = require('jsonwebtoken')

        const user: User = payload.user
        const user_id = user.id

        const token = jwt.sign({sub: String(user_id)}, process.env.SECRETE_KEY, {expiresIn: '1h'})
        

        payload.verification_token = token

        console.log(token);
        

        const nextHandlerResponse = await this.callNextHandler(payload);
        return nextHandlerResponse;
    }

}