import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import type { KeyPair } from "./helpers/types";
import isValidKeyPair from "./helpers/validation";
import { activeKeyDirectory, allKeysDirectory } from "./helpers/config";

class StorageService {
  // storage keys methods
  static getAllKeyPairs(): KeyPair[] {
    mkdirSync(allKeysDirectory, { recursive: true });

    const files = readdirSync(allKeysDirectory);
    const keys: KeyPair[] = [];

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      const filePath = resolve(allKeysDirectory, file);

      const parsed: unknown = JSON.parse(readFileSync(filePath, "utf8"));

      if (!isValidKeyPair(parsed, file)) {
        throw new Error(`Invalid key pair in file: ${file}`);
      }

      keys.push(parsed);
    }
    return keys;
  }

  static storeKeyPair(keyPair: KeyPair): void {
    if (!isValidKeyPair(keyPair, `${keyPair.kid}.json`)) {
      throw new Error("Invalid key pair");
    }

    mkdirSync(allKeysDirectory, { recursive: true });

    const filePath = resolve(allKeysDirectory, `${keyPair.kid}.json`);

    if (existsSync(filePath)) {
      throw new Error(`Key pair already exists: ${keyPair.kid}`);
    }

    writeFileSync(filePath, JSON.stringify(keyPair, null, 2), {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
  }

  static deleteKeyPair(kid: string): void {
    const filePath = resolve(allKeysDirectory, `${kid}.json`);

    if (!existsSync(filePath)) {
      throw new Error(`Key pair not found: ${kid}`);
    }

    const activeKey = this.getActiveKeyPair();
    if (activeKey.kid === kid) {
      throw new Error("Cannot delete the active key pair");
    }

    unlinkSync(filePath);
  }

  // active key methods
  static getActiveKeyPair(): KeyPair {
    mkdirSync(activeKeyDirectory, { recursive: true });

    const activeFiles = readdirSync(activeKeyDirectory).filter((file) =>
      file.endsWith(".json")
    );

    if (activeFiles.length !== 1) {
      throw new Error(
        activeFiles.length === 0
          ? "No active key found"
          : "active-key must contain exactly one JSON file"
      );
    }

    const activeFile = activeFiles[0];
    const activePath = resolve(activeKeyDirectory, activeFile);

    const parsed: unknown = JSON.parse(readFileSync(activePath, "utf8"));

    if (!isValidKeyPair(parsed, activeFile)) {
      throw new Error(`Invalid active key file: ${activeFile}`);
    }

    return parsed;
  }

  static setActiveKeyPair(keyPair: KeyPair): void {
    if (!isValidKeyPair(keyPair, `${keyPair.kid}.json`)) {
      throw new Error("Invalid key pair");
    }

    mkdirSync(activeKeyDirectory, { recursive: true });

    const activeKeyPath = resolve(activeKeyDirectory, `${keyPair.kid}.json`);

    writeFileSync(activeKeyPath, JSON.stringify(keyPair, null, 2), {
      encoding: "utf8",
      mode: 0o600,
    });

    for (const file of readdirSync(activeKeyDirectory)) {
      if (file.endsWith(".json") && file !== `${keyPair.kid}.json`) {
        unlinkSync(resolve(activeKeyDirectory, file));
      }
    }
  }
}

export default StorageService;
