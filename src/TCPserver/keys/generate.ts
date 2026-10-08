import { generateKeyPairSync } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("./keys", { recursive: true });

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,

  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },

  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
});

writeFileSync("../storage/private.pem", privateKey);
writeFileSync("../storage/public.pem", publicKey);

console.log("Keys generated.");
