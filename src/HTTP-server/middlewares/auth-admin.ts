import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../error/types";
import authUser from "./auth-user";
import AdminsDatabaseService from "../../database/admins/service";

async function authAdmin(req: FastifyRequest, reply: FastifyReply) {
  await authUser(req, reply);

  const { userId } = req.user as {
    userId: number;
  };

  const isAdmin = await AdminsDatabaseService.checkAdmin(userId);

  if (!isAdmin) {
    throw new AppError(403, "Forbidden");
  }
}

export default authAdmin;
