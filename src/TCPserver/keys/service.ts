import { KeyPair } from "./types";

class KeyService {
  private keys: KeyPair[] = [];

  createKeys(newKid: string) {}

  storeKeys(keyPair: KeyPair) {}

  generateKeys() {}

  getKeys(kid: string) {}

  deleteKeys(kid: string) {}
}

const keyService = new KeyService();

export default keyService;
