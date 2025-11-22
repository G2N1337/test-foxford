import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const users = await Promise.all(
    ['alice@example.com', 'bob@example.com', 'john@example.com'].map((email) =>
      prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, passwordHash },
      }),
    ),
  );

  await prisma.task.create({
    data: {
      title: 'Первая задача',
      description: 'Описание первой задачи',
      authorId: users[0].id,
      assigneeId: users[1].id,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
