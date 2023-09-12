import { BaseHandler } from 'src/common/abstracts/BaseHandler';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

export class InsertUserHandler extends BaseHandler {
  async handle(payload: any) {
    console.log('insert user handler...');

    const createUser: User = payload.createUser;
    const userRepository: Repository<User> = payload.repository;

    try {
      await userRepository.insert(createUser);
    } catch (error) {
      return {
        success: false,
        statusCode: 400,
        data: {},
        message: 'Could not create user',
        error: error,
      };
    }

    payload.user = createUser

    const nextHandlerResponse = await this.callNextHandler(payload);
    nextHandlerResponse.statusCode = 201
    return nextHandlerResponse;
  }
}
