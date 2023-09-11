import { DataSource, QueryRunner, Repository } from "typeorm";
import { BaseHandler } from "../abstracts/BaseHandler";


export class DatabaseHandler extends BaseHandler{
    constructor(private repository: Repository<any>){
        super()
    }
    async handle(payload: any) {
        console.log('database handler...');

        
        payload.repository = this.repository

        const nextHandlerResponse = this.callNextHandler(payload)
        return nextHandlerResponse
    }
    
}