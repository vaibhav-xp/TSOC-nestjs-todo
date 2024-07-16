import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UserEmail } from 'src/common/decorators/user-email.decorator';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createTodoDto: CreateTodoDto, @UserEmail() userEmail: string) {
    try {
      const user = await this.databaseService.user.findUnique({ where: { email: userEmail } });
      if (!user) {
        throw new Error("User not found.");
      }
      let data: Prisma.TodoCreateInput = {
        description: createTodoDto.description,
        task: createTodoDto.task,
        status: "ACTIVE",
        user: {
          connect: { email: user.email }
        }
      };
      return await this.databaseService.todo.create({ data });
    } catch (error) {
      return error;
    }
  }

  async findAll(@UserEmail() userEmail: string) {
    const user = await this.databaseService.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      throw new Error("User not found.");
    }
    return await this.databaseService.todo.findMany({
      where: {
        userEmail
      }
    });
  }

  findOne(id: number, @UserEmail() userEmail: string) {
    return this.databaseService.todo.findFirst({
      where: {
        id,
        userEmail
      }
    })
  }

  update(id: number, updateTodoDto: UpdateTodoDto, @UserEmail() userEmail: string) {
    return this.databaseService.todo.update({
      where: {
        id,
        userEmail
      },
      data: updateTodoDto
    })
  }

  remove(id: number, @UserEmail() userEmail: string) {
    return this.databaseService.todo.delete({
      where: {
        id,
        userEmail
      }
    })
  }
}
