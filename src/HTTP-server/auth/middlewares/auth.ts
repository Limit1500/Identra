import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../../error/types";

async function authUser(req: FastifyRequest, _reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (error) {
    throw new AppError(401, "Unauthorized");
  }
}

export default authUser;
