import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { createChain } from 'src/common/functions';
import { InsertUserHandler } from './handlers/insert-user.handler';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DatabaseHandler } from 'src/common/database/database.handler';
import { UserSecreteHandler } from './handlers/user-secrete.handler';
import { PrepareInsertUserHandler } from './handlers/prepare-insert-user.handler';
import { ParseSafeUser } from './handlers/parse-safe-user.handler';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async userCreate(createUser: CreateUserDto) {
    return await createChain([
      new DatabaseHandler(this.userRepository),
      new UserSecreteHandler(),
      new PrepareInsertUserHandler(),
      new InsertUserHandler(),
      new ParseSafeUser(),
    ]).handle({ createUser });
  }

  userVerify(id: number) {
    return `This method will verify a user...`;
  }

  userResetPassword(params: ResetPasswordDto) {
    return `This method will reset if user forgot password...`;
  }

  userSetPassword(id: number) {
    return `This method will set password active after forgot password...`;
  }

  userUpdatePassword(id: number, params: UpdatePasswordDto) {
    return `This method will change user password...`;
  }

  userUpdate(id: number, params: UpdateUserDto) {
    return `This method will update user info...`;
  }

  userGet(id: number) {
    return `This method will get user information details...`;
  }

  userLogin(params: UserLoginDto) {
    return `This method will authenticate user...`;
  }
}
