import { BaseHandler } from "src/common/abstracts/BaseHandler";
import { User } from "../user.entity";
import { USER_PERMISSIONS_LIST } from "src/common/constants/permissions.constants";

export class GenerateUserTokenHandler extends BaseHandler{
    async handle(payload: any){

        const jwt = require('jsonwebtoken')
        
        const user: User = payload.user
        const token = jwt.sign({sub: String(user.id), permissions: USER_PERMISSIONS_LIST}, process.env.SECRETE_KEY, {expiresIn: '12h'})


        const nextHandlerResponse = await this.callNextHandler(payload)
        nextHandlerResponse.data['token'] = token
        return nextHandlerResponse
    }
}