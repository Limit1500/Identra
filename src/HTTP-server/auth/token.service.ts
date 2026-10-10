import keyService from "../../keys/keyService";
import { server } from "../server";

class TokenService {
  static createToken(userId: number, username: string) {
    const keyPair = keyService.getActivePair();

    return server.jwt.sign(
      { username },
      {
        algorithm: "RS256",
        sub: String(userId),
        key: keyPair.kid,
        expiresIn: "15m",
      }
    );
  }
}

export default TokenService;
