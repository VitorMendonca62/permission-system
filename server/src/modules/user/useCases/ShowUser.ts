import { prisma } from '../../../app';

export default class ShowUser {
  async verifyWithUsername(username: string) {
    const userWithUsername = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    return userWithUsername;
  }

  async verifyWithEmail(email: string) {
    const userWithEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return userWithEmail;
  }
  async verifyWithId(id: number) {
    const userWithId = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return userWithId;
  }
}
