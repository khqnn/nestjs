import { BaseHandler } from 'src/common/abstracts/BaseHandler';
import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt';
import { User } from '../user.entity';

export class SetTemporaryPasswordHandler extends BaseHandler {
  async handle(payload: any): Promise<{
    success: boolean;
    statusCode: number;
    data: object;
    message: string;
    error?: any;
  }> {
    const resetPassword = payload.resetPassword;
    const user: User = payload.user

    const password_hash = await bcrypt.hash(resetPassword.password, 10);
    user.password_temp = password_hash;

    const nextHandlerResponse = await this.callNextHandler(payload);
    return nextHandlerResponse;
  }
}
