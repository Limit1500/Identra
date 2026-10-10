import { resolve } from "path";

export const KEY_TYPE = "RSA";
export const ALGORITHM = "RS256";
export const MODULUS_LENGTH = 2048;
export const PRIVATE_KEY_FORMAT = "pkcs8";
export const PUBLIC_KEY_FORMAT = "spki";
export const KEY_ENCODING = "pem";

export const allKeysDirectory = resolve(__dirname, "all-keys");
export const activeKeyDirectory = resolve(__dirname, "active-key");

export const KEY_ROTATION_INTERVAL = 30 * 24 * 60 * 60 * 1000; // 30 zile
export const KEY_RETENTION_PERIOD = 60 * 24 * 60 * 60 * 1000; // 60 zile
export const KEY_CHECK_INTERVAL = 60 * 60 * 1000; // 1 oră
