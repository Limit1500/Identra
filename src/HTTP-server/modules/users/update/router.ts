import { FastifyInstance } from "fastify";
import UpdateController from "./controller";
import {
  emailSchema,
  newAndCurrentPasswordSchema,
  newPasswordSchema,
  usernameSchema,
} from "./internal/validation";
import authUser from "../../../middlewares/auth-user";

export function updateRoutes(server: FastifyInstance) {
  server.post("/change-email", {
    preHandler: authUser,
    schema: emailSchema,
    handler: UpdateController.changeEmail,
  });

  server.post("/verify-email", {
    preHandler: authUser,
    handler: UpdateController.verifyEmail,
  });

  server.post("/verify-email/confirm/:token", {
    handler: UpdateController.confirmEmail,
  });

  server.post("/change-password", {
    preHandler: authUser,
    schema: newAndCurrentPasswordSchema,
    handler: UpdateController.changePassword,
  });

  server.post("/reset-password", {
    schema: emailSchema,
    handler: UpdateController.resetPassword,
  });

  server.post("/reset-password/confirm/:token", {
    schema: newPasswordSchema,
    handler: UpdateController.confirmPassword,
  });

  server.post("/change-username", {
    preHandler: authUser,
    schema: usernameSchema,
    handler: UpdateController.changeUsername,
  });
}
