import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TodoStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiPropertyOptional()
    @IsOptional()
    status?: TodoStatus;
}
