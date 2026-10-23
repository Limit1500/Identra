import prisma from "../db-instance";

class SessionDatabaseService {
  static async createSession(userId: number) {
    return prisma.sessions.create({
      data: { userId },
    });
  }

  static async getSession(sessionId: number) {
    return prisma.sessions.findUnique({
      where: { id: sessionId },
    });
  }

  static async getAllSessions() {
    return await prisma.sessions.findMany();
  }

  static async getUserSessions(userId: number) {
    return prisma.sessions.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async deleteSession(sessionId: number) {
    return prisma.sessions.deleteMany({
      where: {
        id: sessionId,
      },
    });
  }

  static async deleteUserSessions(userId: number) {
    return prisma.sessions.deleteMany({
      where: { userId },
    });
  }
  static async deleteAllSessions() {
    return prisma.sessions.deleteMany();
  }
}

export default SessionDatabaseService;
