import { ALGORITHM, KEY_TYPE } from "./config";
import { KeyPair, PublicKeyInfo } from "./types";

export function toPublicKeyInfo(keyPair: KeyPair): PublicKeyInfo {
  return {
    kid: keyPair.kid,
    publicKey: keyPair.publicKey,
    kty: KEY_TYPE,
    alg: ALGORITHM,
    use: "sig",
  };
}
