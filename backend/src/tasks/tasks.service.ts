import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import type { Prisma, Task } from '@prisma/client';

export type TaskWithRelations = Prisma.TaskGetPayload<{
  include: { author: true; assignee: true };
}>;

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(authorId: number, dto: CreateTaskDto): Promise<Task> {
    const assignee = await this.usersService.getRandomAssignee(authorId);
    if (!assignee) {
      throw new NotFoundException('No users available for assignment');
    }

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        authorId,
        assigneeId: assignee.id,
      },
    });
  }

  findAll(): Promise<TaskWithRelations[]> {
    return this.prisma.task.findMany({
      include: { author: true, assignee: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<TaskWithRelations> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { author: true, assignee: true },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Task> {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
}
