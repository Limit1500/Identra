import { FastifyInstance } from "fastify";
import authAdmin from "../../../middlewares/auth-admin";
import SessionController from "./controller";

export default function sessionRoutes(server: FastifyInstance) {
  server.get("/user/:userId", {
    preHandler: authAdmin,
    handler: SessionController.getUserSessions,
  });

  server.delete("/user/:userId", {
    preHandler: authAdmin,
    handler: SessionController.deleteUserSessions,
  });

  server.get("/all", {
    preHandler: authAdmin,
    handler: SessionController.getAllSessions,
  });

  server.delete("/all", {
    preHandler: authAdmin,
    handler: SessionController.deleteAllSessions,
  });
}
