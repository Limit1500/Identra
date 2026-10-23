import Fastify from "fastify";
import errorHandler from "./error/handler";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import keyService from "../keys/key.service";
import rateLimit from "@fastify/rate-limit";
import CleanupService from "../cleanup/service";
import { env } from "../config/environment.var";
import accountRoutes from "./modules/admins/account/routes";
import sessionRoutes from "./modules/admins/session/routes";
import { updateRoutes } from "./modules/users/update/router";
import authRoutes from "./modules/users/auth/router";

const keyPair = keyService.getActivePair();

export const server = Fastify({
  logger: true,
});

server.setErrorHandler(errorHandler);

server.register(updateRoutes, { prefix: "/update" });
server.register(authRoutes, { prefix: "/auth" });
server.register(accountRoutes, { prefix: "/account" });
server.register(sessionRoutes, { prefix: "/session" });
server.register(cookie);

server.register(rateLimit, {
  max: Number(env.RATE_LIMIT),
  timeWindow: "1 minute",
});

server.register(jwt, {
  secret: {
    private: keyPair.privateKey,
    public: keyPair.publicKey,
  },
  sign: {
    algorithm: "RS256",
    expiresIn: "15m",
  },
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

export default function startHTTPServer() {
  server.listen(
    {
      port: Number(env.HTTP_PORT),
    },
    () => {
      console.log(`HTTP server is listening on port ${env.HTTP_PORT}`);
    }
  );
}

CleanupService.start();
