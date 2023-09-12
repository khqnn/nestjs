import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";

export class SetUserVerifyHandler extends BaseHandler {
    async handle(payload: any): Promise<{ success: boolean; statusCode: number; data: object; message: string; error?: any; }> {

        const user: User = payload.user
        user.verified = true

        const nextHandlerResponse = await this.callNextHandler(payload);
        return nextHandlerResponse;
    }

}