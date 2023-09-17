import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Resolver(of=> User)
export class UserResolver{
    constructor(private userService: UserService){}
    @Query(returns => User)
    async getUser(id: string){
        const results = await this.userService.userGet(12)
        return results.data['user']
    }
}