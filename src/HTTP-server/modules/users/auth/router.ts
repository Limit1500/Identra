import { FastifyInstance } from "fastify";
import AuthController from "./controller";
import { loginSchema, signinSchema } from "./internal/validation";
import authUser from "../../../middlewares/auth-user";

export default function authRoutes(server: FastifyInstance) {
  server.post("/login", {
    schema: loginSchema,
    handler: AuthController.login,
  });

  server.post("/signin", {
    schema: signinSchema,
    handler: AuthController.signin,
  });

  server.post("/logout", {
    handler: AuthController.logout,
  });

  server.post("/refresh", {
    preHandler: authUser,
    handler: AuthController.refresh,
  });

  server.get("/me", {
    preHandler: authUser,
    handler: AuthController.me,
  });
}
