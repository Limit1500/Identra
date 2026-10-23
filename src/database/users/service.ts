import prisma from "../db-instance";

class UserDatabaseService {
  static async getAllUsers() {
    return await prisma.users.findMany();
  }

  static async getUserByEmail(email: string) {
    return await prisma.users.findFirst({ where: { email } });
  }

  static async getUserById(id: number) {
    return await prisma.users.findFirst({ where: { id } });
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

  static async setEmailVerified(userId: number) {
    return prisma.users.update({
      where: { id: userId },
      data: { emailVerified: true },
    });
  }

  static async setUserStatus(userId: number, status: boolean) {
    return await prisma.users.update({
      where: { id: userId },
      data: {
        isActive: status,
      },
    });
  }

  static async setNewEmail(userId: number, newEmail: string) {
    return await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        email: newEmail,
        emailVerified: false,
      },
    });
  }

  static async setNewPassword(userId: number, newPassword: string) {
    return await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
  }

  static async setNewUsername(userId: number, newUsername: string) {
    return await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
      },
    });
  }
}

export default UserDatabaseService;
