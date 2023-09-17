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
import { UserSecreteHandler } from './handlers/user-secrete.handler';
import { PrepareInsertUserHandler } from './handlers/prepare-insert-user.handler';
import { ParseSafeUser } from './handlers/parse-safe-user.handler';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { SetUserVerifyHandler } from './handlers/set-user-verified.handler';
import { UpdateUserHandler } from './handlers/update-user.handler';
import { GetUserByEmailHandler } from './handlers/get-user-by-email.handler';
import { SetTemporaryPasswordHandler } from './handlers/set-temp-pass.handler';
import { GenerateVerificationTokenHandler } from './handlers/generate-verification-token.handler';
import { InjectUserRepositoryHandler } from './handlers/inject-user-repository.handler';
import { PasswordUpdateCheckHandler } from './handlers/check-update-password.handler';
import { SetUserUpdateParams } from './handlers/set-user-update-params.handler';
import { CheckLoginPasswordHandler } from './handlers/check-login-password.handler';
import { ParseSafeLoginHandler } from './handlers/parse-safe-login.handler';
import { GenerateUserTokenHandler } from './handlers/generate-user-token.handler';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async userCreate(createUser: CreateUserDto) {
    return await createChain([
      new InjectUserRepositoryHandler(this.userRepository),
      new UserSecreteHandler(),
      new PrepareInsertUserHandler(),
      new InsertUserHandler(),
      new ParseSafeUser(),
      new GenerateVerificationTokenHandler(),
    ]).handle({ createUser });
  }

  async userVerify(user_id: number) {
    return await createChain([
      new InjectUserRepositoryHandler(this.userRepository),
      new GetUserByIdHandler(),
      new SetUserVerifyHandler(),
      new UpdateUserHandler(),
      new ParseSafeUser(),
    ]).handle({ user_id });
  }

  async userResetPassword(resetPassword: ResetPasswordDto) {
    return await createChain([
      new InjectUserRepositoryHandler(this.userRepository),
      new GetUserByEmailHandler(),
      new SetTemporaryPasswordHandler(),
      new UpdateUserHandler(),
      new ParseSafeUser(),
      new GenerateVerificationTokenHandler(),
    ]).handle({ resetPassword, user_email: resetPassword.email });
  }

  async userUpdatePassword(user_id: number, updatePassword: UpdatePasswordDto) {
    return await createChain([
      new InjectUserRepositoryHandler(this.userRepository),
      new GetUserByIdHandler(),
      new PasswordUpdateCheckHandler(),
      new UpdateUserHandler(),
      new ParseSafeUser(),
    ]).handle({ user_id, updatePassword });
  }

  async userUpdate(user_id: number, updateUser: UpdateUserDto) {
    return await createChain([
      new InjectUserRepositoryHandler(this.userRepository),
      new GetUserByIdHandler(),
      new SetUserUpdateParams(),
      new UpdateUserHandler(),
      new ParseSafeUser(),
    ]).handle({ user_id, updateUser });
  }

  async userGet(user_id: number) {
    return await createChain([
      new InjectUserRepositoryHandler(this.userRepository),
      new GetUserByIdHandler(),
      new ParseSafeUser(),
    ]).handle({ user_id });
  }

  async userLogin(userLogin: UserLoginDto) {
    return await createChain([
      new InjectUserRepositoryHandler(this.userRepository),
      new ParseSafeLoginHandler(),
      new GetUserByEmailHandler(),
      new CheckLoginPasswordHandler(),
      new GenerateUserTokenHandler(),
    ]).handle({ user_email: userLogin.email, userLogin });
  }
}
