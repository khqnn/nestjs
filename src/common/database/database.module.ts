import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '181354',
      database: 'postgres',
      entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
      synchronize: true,
    })
  ],
})
export class DatabaseModule { }
