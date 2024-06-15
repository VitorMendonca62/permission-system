import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = bcrypt.hashSync('12345678', 10);

  const user01 = await prisma.users.upsert({
    where: { email: 'user01@email.com' },
    update: {},
    create: {
      email: 'user01@email.com',
      password,
      username: 'user01',
    },
  });

  const user02 = await prisma.users.upsert({
    where: { email: 'user02@email.com' },
    update: {},
    create: {
      email: 'user02@email.com',
      password,
      username: 'user02',
    },
  });

  const admin01 = await prisma.users.upsert({
    where: { email: 'admin01@email.com' },
    update: {},
    create: {
      email: 'admin01@email.com',
      password,
      username: 'admin01',
      role: 'admin',
    },
  });

  console.log({ user01, user02, admin01 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
