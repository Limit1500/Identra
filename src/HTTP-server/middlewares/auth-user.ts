import { FastifyReply, FastifyRequest } from "fastify";
import SessionDatabaseService from "../../database/sessions/service";
import AppError from "../error/types";

async function authUser(req: FastifyRequest, _reply: FastifyReply) {
  try {
    await req.jwtVerify();

    const { sessionId } = req.user as {
      sessionId: number;
    };

    const session = await SessionDatabaseService.getSession(sessionId);

    if (!session) {
      throw new AppError(401, "Unauthorized");
    }
  } catch (error) {
    req.log.error(error, "JWT verification failed");
    throw new AppError(401, "Unauthorized");
  }
}

export default authUser;
