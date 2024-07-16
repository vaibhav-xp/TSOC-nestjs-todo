import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { TodoStatus } from "@prisma/client"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateTodoDto {
    @ApiProperty()
    @IsNotEmpty()
    task: string

    @ApiPropertyOptional()
    @IsOptional()
    description?: string

    @ApiPropertyOptional()
    @IsOptional()
    status?: TodoStatus
}
