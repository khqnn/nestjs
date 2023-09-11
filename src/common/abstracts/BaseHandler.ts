export abstract class BaseHandler {
  private nextHandler: BaseHandler | undefined;
  abstract handle(payload: any): Promise<{
    success: boolean;
    statusCode: number;
    data: object;
    message: string;
    error?: any;
  }>;
  async callNextHandler(payload: any): Promise<{
    success: boolean;
    statusCode: number;
    data: object;
    message: string;
    error?: any;
  }> {
    if (!this.nextHandler) {
      return { success: true, statusCode: 200, data: {}, message: '' };
    }
    return this.nextHandler.handle(payload);
  }
  setNextHandler(nextHandler: BaseHandler) {
    this.nextHandler = nextHandler;
  }
}
