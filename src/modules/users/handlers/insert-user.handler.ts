import { BaseHandler } from "src/common/abstracts/BaseHandler";


export class InsertUserHandler extends BaseHandler{
    async handle(payload: any) {
        

        const nextHandlerResponse = await this.callNextHandler(payload)
        return nextHandlerResponse
    }
    
}