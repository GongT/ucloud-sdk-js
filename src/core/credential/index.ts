const { createHash } = require('node:crypto');

type argsT = { [index: string]: any };

export type CredentialOptions = {
  publicKey: string;
  privateKey: string;
};

export default class Credential {
  publicKey: string;

  privateKey: string;

  constructor({ publicKey, privateKey }: CredentialOptions) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  verifyAc(args: argsT) {
    const obj = { ...args };
    obj.PublicKey = this.publicKey;

    // key sorting
    const keys = Object.keys(obj);
    keys.sort();

    // concat string
    let s = '';
    for (const key of keys) {
      const value = obj[key];
      if (value == null) {
        continue;
      }
      s += key;
      s += value.toString();
    }
    s += this.privateKey;

    // hash by sha1
    const hash = createHash('sha1');
    hash.update(s);
    return hash.digest('hex');
  }

  sign(args: argsT): argsT {
    const obj = { ...args };
    obj.Signature = this.verifyAc(obj);
    obj.PublicKey = this.publicKey;
    return obj;
  }
}
