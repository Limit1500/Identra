import { ALGORITHM, KEY_TYPE } from "./config";

export type KeyPair = {
  kid: string;
  privateKey: string;
  publicKey: string;
};

export type PublicKeyInfo = {
  kid: string;
  publicKey: string;
  kty: typeof KEY_TYPE;
  alg: typeof ALGORITHM;
  use: "sig";
};
