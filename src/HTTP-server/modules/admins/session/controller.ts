import { FastifyReply, FastifyRequest } from "fastify";
import SessionDatabaseService from "../../../../database/sessions/service";

class SessionController {
  static async getUserSessions(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as { userId: string };

    const sessions = await SessionDatabaseService.getUserSessions(
      Number(userId)
    );

    return reply.status(200).send(sessions);
  }

  static async deleteUserSessions(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as { userId: string };

    await SessionDatabaseService.deleteUserSessions(Number(userId));

    return reply.status(200).send({
      message: "User sessions deleted",
    });
  }

  static async getAllSessions(_req: FastifyRequest, reply: FastifyReply) {
    const sessions = await SessionDatabaseService.getAllSessions();

    return reply.status(200).send(sessions);
  }

  static async deleteAllSessions(_req: FastifyRequest, reply: FastifyReply) {
    await SessionDatabaseService.deleteAllSessions();

    return reply.status(200).send({
      message: "All sessions deleted",
    });
  }
}

export default SessionController;
