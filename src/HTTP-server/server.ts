import Fastify from "fastify";
import errorHandler from "./error/handler";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import keyService from "../keys/key.service";
import { authRoutes } from "./modules/auth/router";

const keyPair = keyService.getActivePair();

export const server = Fastify({
  logger: true,
});

server.register(authRoutes, { prefix: "/auth" });
server.register(cookie);
server.register(jwt, {
  secret: {
    private: keyPair.privateKey,
    public: keyPair.publicKey,
  },
  sign: {
    algorithm: "RS256",
    expiresIn: "15m",
  },
});

server.setErrorHandler(errorHandler);

export default function startHTTPServer() {
  server.listen(
    {
      port: Number(process.env.HTTP_PORT),
    },
    () => {
      console.log(`HTTP server is listening on port ${process.env.HTTP_PORT}`);
    }
  );
}
