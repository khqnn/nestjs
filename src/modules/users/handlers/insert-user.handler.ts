import { BaseHandler } from "src/utils/abstracts/BaseHandler";


export class InsertUserHandler extends BaseHandler{
    async handle(payload: any) {
        

        const nextHandlerResponse = await this.callNextHandler(payload)
        return nextHandlerResponse
    }
    
}