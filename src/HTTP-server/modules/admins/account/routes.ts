import { FastifyInstance } from "fastify";
import authAdmin from "../../../middlewares/auth-admin";
import SessionController from "./controller";

export default function sessionRoutes(server: FastifyInstance) {
  server.get("/users/:userId/sessions", {
    preHandler: authAdmin,
    handler: SessionController.getUserSessions,
  });

  server.delete("/users/:userId/sessions", {
    preHandler: authAdmin,
    handler: SessionController.deleteUserSessions,
  });

  server.get("/sessions", {
    preHandler: authAdmin,
    handler: SessionController.getAllSessions,
  });

  server.delete("/sessions", {
    preHandler: authAdmin,
    handler: SessionController.deleteAllSessions,
  });
}
