import { BaseHandler } from "./abstracts/BaseHandler";


export const createChain = (handlers: BaseHandler[]): BaseHandler=>{

    for(let i=1; i<handlers.length; i++){
        const handler: BaseHandler = handlers[i-1]
        const nextHandler: BaseHandler = handlers[i]
        handler.setNextHandler(nextHandler)
    }

    return handlers[0]
}