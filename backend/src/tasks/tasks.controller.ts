import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from '@prisma/client';
import type { TaskWithRelations } from './tasks.service';
import type { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

type AuthenticatedRequest = ExpressRequest & { user: { userId: number } };

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать задачу' })
  @ApiResponse({
    status: 201,
    description: 'Задача успешно создана',
  })
  @ApiResponse({
    status: 401,
    description: 'Требуется авторизация',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create(req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Получить все задачи' })
  @ApiResponse({
    status: 200,
    description: 'Список задач получен',
  })
  @Get()
  findAll(): Promise<TaskWithRelations[]> {
    return this.tasksService.findAll();
  }
  @ApiOperation({ summary: 'Получить задачу по ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Задача найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Задача не найдена',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskWithRelations> {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить задачу по ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Задача обновлена',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет прав для обновления',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить задачу по ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Задача удалена',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет прав для удаления',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
