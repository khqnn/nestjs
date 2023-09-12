import { BaseHandler } from 'src/common/abstracts/BaseHandler';

export class ParseSafeUser extends BaseHandler {
  async handle(payload: any): Promise<{
    success: boolean;
    statusCode: number;
    data: object;
    message: string;
    error?: any;
  }> {
    const user = payload.user;

    delete user.password_temp;
    delete user.password_hash;
    delete user.secrete;

    const nextHandlerResponse = await this.callNextHandler(payload);
    nextHandlerResponse.data['user'] = user;
    return nextHandlerResponse;
  }
}
