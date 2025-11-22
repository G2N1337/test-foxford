import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

import type { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  create(data: { email: string; passwordHash: string }): Promise<User> {

    return this.prisma.user.create({
      data
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getRandomAssignee(excludeUserId: number): Promise<User | null> {
    const users = await this.prisma.user.findMany({
      where: { id: { not: excludeUserId } },
    });

    if (!users.length) {
      return this.findById(excludeUserId);
    }

    return users[Math.floor(Math.random() * users.length)];
  }
}
