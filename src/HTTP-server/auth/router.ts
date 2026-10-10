import { FastifyInstance } from "fastify";
import AuthController from "./controller";
import { loginSchema, signinSchema } from "./validation";

export function authRoutes(server: FastifyInstance) {
  server.post("/login", {
    schema: loginSchema,
    handler: AuthController.login,
  });

  server.post("/signin", {
    schema: signinSchema,
    handler: AuthController.signin,
  });

  server.post("/logout", { handler: AuthController.logout });
}
