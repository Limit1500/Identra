import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../../../error/types";
import SessionDatabaseService from "../../../../database/sessions/service";

type UserIdParams = {
  userId: string;
};

class SessionController {
  static async getUserSessions(
    req: FastifyRequest<{ Params: UserIdParams }>,
    reply: FastifyReply
  ) {
    const userId = Number(req.params.userId);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      throw new AppError(400, "Invalid user id");
    }

    const sessions = await SessionDatabaseService.getUserSessions(userId);

    return reply.status(200).send({ sessions });
  }

  static async deleteUserSessions(
    req: FastifyRequest<{ Params: UserIdParams }>,
    reply: FastifyReply
  ) {
    const userId = Number(req.params.userId);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      throw new AppError(400, "Invalid user id");
    }

    await SessionDatabaseService.deleteUserSessions(userId);

    return reply.status(200).send({
      message: "User sessions deleted successfully",
    });
  }

  static async getAllSessions(_req: FastifyRequest, reply: FastifyReply) {
    const sessions = await SessionDatabaseService.getAllSessions();

    return reply.status(200).send({ sessions });
  }

  static async deleteAllSessions(_req: FastifyRequest, reply: FastifyReply) {
    await SessionDatabaseService.deleteAllSessions();

    return reply.status(200).send({
      message: "All sessions deleted successfully",
    });
  }
}

export default SessionController;
