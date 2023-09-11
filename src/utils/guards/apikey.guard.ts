import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest();
        const apiKey = req.headers['x-api-key'] ?? req.query.api_key; // checks the header, moves to query if null

        if (!apiKey) {
            throw new UnauthorizedException('API key is missing.');
        }

        if (apiKey !== process.env.API_KEY) {
            throw new UnauthorizedException('Invalid API key.');
        }


        return true
    }

}