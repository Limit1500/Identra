import keyService from "../../../../../keys/key.service";

class JwtTokenService {
  static async createToken(
    userId: number,
    username: string,
    sessionId: number
  ) {
    const { importPKCS8, SignJWT } = await import("jose");

    const keyPair = keyService.getActivePair();

    const privateKey = await importPKCS8(keyPair.privateKey, "RS256");

    const token = await new SignJWT({ userId, username, sessionId })
      .setProtectedHeader({
        alg: "RS256",
        kid: keyPair.kid,
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(privateKey);

    return token;
  }
}

export default JwtTokenService;
