import { BaseHandler } from 'src/common/abstracts/BaseHandler';
import { User } from '../user.entity';

export class PrepareInsertUserHandler extends BaseHandler {
  async handle(payload: any): Promise<{
    success: boolean;
    statusCode: number;
    data: object;
    message: string;
    error?: any;
  }> {
    const createUser = payload.createUser;
    delete createUser.password;
    const user = new User();
    Object.assign(user, createUser);

    payload.createUser = user;

    const nextHandlerResponse = await this.callNextHandler(payload);
    return nextHandlerResponse;
  }
}
