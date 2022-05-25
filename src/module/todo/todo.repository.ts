import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  // create todo entities
  async createEntity(createTodoDto: CreateTodoDto): Promise<Todo | Error> {
    try {
      const { title, description, status } = createTodoDto;
      const entity = this.create({
        title,
        description,
        status,
      });
      await this.save(entity);
      return entity;
    } catch (err) {
      return err;
    }
  }

  // find all entities
  async findAllEntities(): Promise<Todo[] | Error> {
    try {
      return await this.find({ where: { isDeleted: false } });
    } catch (err) {
      return err;
    }
  }

  // find one entries by id and
  async findOneEntities(id: number): Promise<Todo | Error> {
    try {
      return await this.findOne({
        id: id,
      });
    } catch (err) {
      return err;
    }
  }

  // update entity
  async updateEntities(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | Error> {
    try {
      await this.update(id, updateTodoDto);
      return this.findOne({
        id: id,
      });
    } catch (err) {
      return err;
    }
  }

  // delete entity
  async deleteEntity(id: number): Promise<boolean | Error> {
    try {
      const updateResult = await getConnection()
        .createQueryBuilder()
        .update(Todo)
        .set({ isDeleted: true })
        .where('id = :id', { id: id })
        .execute();
      if (updateResult.affected > 0) {
        return true;
      }
      return false;
    } catch (err) {
      return err;
    }
  }
}
