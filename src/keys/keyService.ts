import { generateKeyPairSync, randomUUID } from "node:crypto";
import {
  KEY_CHECK_INTERVAL,
  KEY_ENCODING,
  KEY_RETENTION_PERIOD,
  KEY_ROTATION_INTERVAL,
  MODULUS_LENGTH,
  PRIVATE_KEY_FORMAT,
  PUBLIC_KEY_FORMAT,
} from "./helpers/config";
import type { KeyPair, PublicKeyInfo } from "./helpers/types";
import StorageService from "./storageService";
import { toPublicKeyInfo } from "./helpers/wrapper";

class KeyService {
  private keys: KeyPair[] = [];
  private activeKeyKid: string = "";

  constructor() {
    this.keys = StorageService.getAllKeyPairs();

    if (this.keys.length === 0) {
      this.activeKeyKid = this.createActiveKeyPair().kid;
    } else {
      this.activeKeyKid = StorageService.getActiveKeyPair().kid;
    }

    setInterval(() => {
      this.rotateKeysIfNeeded();
    }, KEY_CHECK_INTERVAL);
  }

  getAllKeyPairsWrapped(): PublicKeyInfo[] {
    return this.keys.map((key) => toPublicKeyInfo(key));
  }

  getActivePair(): KeyPair {
    const activeKeyPair = this.keys.find(
      (keyPair) => keyPair.kid === this.activeKeyKid
    );

    if (!activeKeyPair) {
      throw new Error("Active key pair not found");
    }

    return activeKeyPair;
  }

  private rotateKeysIfNeeded(): void {
    const createdAt = Number(this.activeKeyKid.split("-")[0]);

    if (Date.now() - createdAt >= KEY_ROTATION_INTERVAL) {
      const newKeyPair = this.createActiveKeyPair();
      this.activeKeyKid = newKeyPair.kid;
    }

    this.deleteUnusedKeyPairs();
  }

  private deleteUnusedKeyPairs(): void {
    for (const key of [...this.keys]) {
      const keyCreatedAt = Number(key.kid.split("-")[0]);

      if (
        Date.now() - keyCreatedAt >= KEY_RETENTION_PERIOD &&
        key.kid !== this.activeKeyKid
      ) {
        this.deleteKeyPair(key.kid);
      }
    }
  }

  private createActiveKeyPair(): KeyPair {
    const keyPair = this.generateNewKeyPair();

    StorageService.storeKeyPair(keyPair);
    StorageService.setActiveKeyPair(keyPair);

    this.keys.push(keyPair);

    return keyPair;
  }

  private deleteKeyPair(kid: string): void {
    StorageService.deleteKeyPair(kid);
    const existingIndex = this.keys.findIndex((keyPair) => keyPair.kid === kid);

    if (existingIndex === -1) {
      return;
    }

    this.keys.splice(existingIndex, 1);
  }

  private generateNewKeyPair(): KeyPair {
    const newKid = `${Date.now()}-${randomUUID()}`;

    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
      modulusLength: MODULUS_LENGTH,
      privateKeyEncoding: {
        type: PRIVATE_KEY_FORMAT,
        format: KEY_ENCODING,
      },
      publicKeyEncoding: {
        type: PUBLIC_KEY_FORMAT,
        format: KEY_ENCODING,
      },
    });
    const keyPair: KeyPair = { kid: newKid, privateKey, publicKey };

    return keyPair;
  }
}

const keyService = new KeyService();

export default keyService;
