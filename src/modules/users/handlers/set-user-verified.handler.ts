import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";

export class SetUserVerifyHandler extends BaseHandler {
    async handle(payload: any): Promise<{ success: boolean; statusCode: number; data: object; message: string; error?: any; }> {

        const user: User = payload.user
        user.verified = true
        user.password_hash = user.password_temp
        user.password_temp = null

        const nextHandlerResponse = await this.callNextHandler(payload);
        return nextHandlerResponse;
    }

}