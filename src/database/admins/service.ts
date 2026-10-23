import prisma from "../db-instance";

class AdminsDatabaseService {
  static async checkAdmin(userId: number) {
    return await prisma.admins.findUnique({
      where: {
        userId,
      },
    });
  }

  static async createAdmin(userId: number) {
    return await prisma.admins.create({
      data: {
        userId,
      },
    });
  }

  static async deleteAdmin(userId: number) {
    return await prisma.admins.delete({
      where: {
        userId,
      },
    });
  }
}

export default AdminsDatabaseService;
