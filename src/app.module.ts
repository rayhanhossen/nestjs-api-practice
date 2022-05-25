import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TodoModule } from './module/todo/todo.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'todo',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [TodoModule, TypeOrmModule.forRoot(ormOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
