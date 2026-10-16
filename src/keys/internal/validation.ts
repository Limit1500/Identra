import { createPrivateKey, createPublicKey } from "crypto";
import { KeyPair } from "./types";
import { KEY_ENCODING, PUBLIC_KEY_FORMAT } from "./config";

export default function isValidKeyPair(
  value: unknown,
  fileName: string
): value is KeyPair {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (
    !("kid" in value) ||
    !("privateKey" in value) ||
    !("publicKey" in value)
  ) {
    return false;
  }

  const { kid, privateKey, publicKey } = value;

  if (
    typeof kid !== "string" ||
    typeof privateKey !== "string" ||
    typeof publicKey !== "string"
  ) {
    return false;
  }

  if (!kid.trim() || !privateKey.trim() || !publicKey.trim()) {
    return false;
  }

  if (fileName !== `${kid}.json`) {
    return false;
  }

  const derivedPublicKey = createPublicKey(createPrivateKey(privateKey));

  const storedPublicKey = createPublicKey(publicKey);

  return (
    derivedPublicKey
      .export({ type: PUBLIC_KEY_FORMAT, format: KEY_ENCODING })
      .toString() ===
    storedPublicKey
      .export({ type: PUBLIC_KEY_FORMAT, format: KEY_ENCODING })
      .toString()
  );
}
