import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorators/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Todo")
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: "Add a new task to the user's todo list. The user must be authenticated to perform this operation.",
    summary: "Add a new task"
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @UserEmail() userEmail: string) {
    return this.todoService.create(createTodoDto, userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: "Retrieve all tasks associated with the authenticated user.",
    summary: "Get all tasks"
  })
  @Get()
  findAll(@UserEmail() userEmail: string) {
    return this.todoService.findAll(userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: "Retrieve a specific task by its ID for the authenticated user.",
    summary: "Get a task by ID"
  })
  @Get(':id')
  findOne(@Param('id') id: string, @UserEmail() userEmail: string) {
    return this.todoService.findOne(+id, userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: "Update the details of a specific task by its ID. The user must be authenticated to perform this operation.",
    summary: "Update a task"
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @UserEmail() userEmail: string) {
    return this.todoService.update(+id, updateTodoDto, userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: "Delete a specific task by its ID. The user must be authenticated to perform this operation.",
    summary: "Delete a task"
  })
  @Delete(':id')
  remove(@Param('id') id: string, @UserEmail() userEmail: string) {
    return this.todoService.remove(+id, userEmail);
  }
}
