import prisma from "./db-instance";

class DatabaseService {
  static async getUserByEmail(email: string) {
    return await prisma.users.findFirst({ where: { email } });
  }

  static async getUserByUsername(username: string) {
    return await prisma.users.findFirst({ where: { username } });
  }

  static async getUserByCredentials(username: string, password: string) {
    return await prisma.users.findUnique({
      where: {
        username,
        password,
      },
    });
  }

  static async createUser(username: string, password: string, email: string) {
    return await prisma.users.create({
      data: {
        username,
        password,
        email,
      },
    });
  }

  static async deleteUser(userId: number) {
    return await prisma.users.delete({
      where: {
        id: userId,
      },
    });
  }
}

export default DatabaseService;
