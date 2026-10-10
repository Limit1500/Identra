import { FastifyReply, FastifyRequest } from "fastify";
import { loginBody, signinBody } from "./types";
import TokenService from "./token.service";
import AuthService from "./service";

class AuthController {
  static async signin(
    req: FastifyRequest<{ Body: signinBody }>,
    reply: FastifyReply
  ) {
    const { username, password, email } = req.body;

    await AuthService.signin(username, password, email);

    return reply.code(200).send({ message: "Signin successful" });
  }

  static async login(
    req: FastifyRequest<{ Body: loginBody }>,
    reply: FastifyReply
  ) {
    const { username, password } = req.body;

    const user = await AuthService.login(username, password);

    const token = await TokenService.createToken(user.id, username);

    return reply
      .setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: false, // needed for local deploy
        sameSite: "lax",
      })
      .send({
        message: "Login successful",
      });
  }

  static async logout(_req: FastifyRequest, reply: FastifyReply) {
    return reply
      .clearCookie("token", {
        httpOnly: true,
        secure: false, // needed for local deploy
        sameSite: "lax",
        path: "/",
      })
      .code(200)
      .send({ message: "Logout successful" });
  }
}

export default AuthController;
