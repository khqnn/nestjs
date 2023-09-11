import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { UpdateUserDto } from "./dto/user-update.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { createChain } from "src/utils/functions";
import { InsertUserHandler } from "./handlers/insert-user.handler";


@Injectable()
export class UserService {

    async userCreate(params: CreateUserDto) {
        return await createChain([
            new InsertUserHandler()
        ]).handle(params)
    }

    userVerify(id: number) {
        return `This method will verify a user...`
    }

    userResetPassword(params: ResetPasswordDto) {
        return `This method will reset if user forgot password...`
    }

    userSetPassword(id: number) {
        return `This method will set password active after forgot password...`
    }

    userUpdatePassword(id: number, params: UpdatePasswordDto) {
        return `This method will change user password...`
    }

    userUpdate(id: number, params: UpdateUserDto) {
        return `This method will update user info...`
    }

    userGet(id: number) {
        return `This method will get user information details...`
    }

    userLogin(params: UserLoginDto) {
        return `This method will authenticate user...`
    }


}