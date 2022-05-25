import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly repository: TodoRepository,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo | Error> {
    const data = await this.repository.createEntity(createTodoDto);
    if (!data) {
      throw new HttpException(
        'Todo data created failed!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return data;
  }

  async findAll(): Promise<Todo[] | Error> {
    const data = await this.repository.findAllEntities();
    if (!data) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async findOne(id: number): Promise<Todo | Error> {
    const data = await this.repository.findOneEntities(id);
    if (!data) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | Error> {
    const data = await this.repository.updateEntities(id, updateTodoDto);
    if (!data) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async remove(id: number): Promise<boolean | Error> {
    const data = await this.repository.deleteEntity(id);
    if (!data) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}
