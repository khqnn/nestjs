import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'


abstract class BaseHandler{
  abstract handle(params: any)
}

class MyHandler extends BaseHandler{
  constructor(){
    super()
  }
  handle(params: any) {
    console.log('hi there....');
    
  }

  
}


const fun = (handlers: any[])=>{

  handlers.forEach((handler: any)=>{
    const instance: BaseHandler = new handler()    
    instance.handle({})
  })
  
}

fun([MyHandler, MyHandler])


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
