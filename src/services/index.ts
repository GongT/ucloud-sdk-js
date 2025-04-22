import BaseClient from '../core/client';
import type { ConfigOptions } from '../core/config';
import type { CredentialOptions } from '../core/credential/index.js';
import CubeClient from './cube/index.js';
import IPSecVPNClient from './ipsecvpn/index.js';
import PathXClient from './pathx/index.js';
import UAccountClient from './uaccount/index.js';
import UBillClient from './ubill/index.js';
import UCDNClient from './ucdn/index.js';
import UDBClient from './udb/index.js';
import UDDBClient from './uddb/index.js';
import UDiskClient from './udisk/index.js';
import UDPNClient from './udpn/index.js';
import UECClient from './uec/index.js';
import UFileClient from './ufile/index.js';
import UFSClient from './ufs/index.js';
import UHostClient from './uhost/index.js';
import UK8SClient from './uk8s/index.js';
import ULBClient from './ulb/index.js';
import UMemClient from './umem/index.js';
import UNetClient from './unet/index.js';
import UPhoneClient from './uphone/index.js';
import UPHostClient from './uphost/index.js';
import USMSClient from './usms/index.js';
import UVMSClient from './uvms/index.js';
import VPCClient from './vpc/index.js';

export class Client extends BaseClient {
  constructor({
    config,
    credential,
  }: {
    config: ConfigOptions;
    credential: CredentialOptions;
  }) {
    super({ config, credential });
  }

  cube() {
    return new CubeClient({ config: this.config, credential: this.credential });
  }

  ipsecvpn() {
    return new IPSecVPNClient({
      config: this.config,
      credential: this.credential,
    });
  }

  pathx() {
    return new PathXClient({
      config: this.config,
      credential: this.credential,
    });
  }

  uaccount() {
    return new UAccountClient({
      config: this.config,
      credential: this.credential,
    });
  }

  ubill() {
    return new UBillClient({
      config: this.config,
      credential: this.credential,
    });
  }

  ucdn() {
    return new UCDNClient({ config: this.config, credential: this.credential });
  }

  udb() {
    return new UDBClient({ config: this.config, credential: this.credential });
  }

  uddb() {
    return new UDDBClient({ config: this.config, credential: this.credential });
  }

  udisk() {
    return new UDiskClient({
      config: this.config,
      credential: this.credential,
    });
  }

  udpn() {
    return new UDPNClient({ config: this.config, credential: this.credential });
  }

  uec() {
    return new UECClient({ config: this.config, credential: this.credential });
  }

  ufile() {
    return new UFileClient({
      config: this.config,
      credential: this.credential,
    });
  }

  ufs() {
    return new UFSClient({ config: this.config, credential: this.credential });
  }

  uhost() {
    return new UHostClient({
      config: this.config,
      credential: this.credential,
    });
  }

  uk8s() {
    return new UK8SClient({ config: this.config, credential: this.credential });
  }

  ulb() {
    return new ULBClient({ config: this.config, credential: this.credential });
  }

  umem() {
    return new UMemClient({ config: this.config, credential: this.credential });
  }

  unet() {
    return new UNetClient({ config: this.config, credential: this.credential });
  }

  uphone() {
    return new UPhoneClient({
      config: this.config,
      credential: this.credential,
    });
  }

  uphost() {
    return new UPHostClient({
      config: this.config,
      credential: this.credential,
    });
  }

  usms() {
    return new USMSClient({ config: this.config, credential: this.credential });
  }

  uvms() {
    return new UVMSClient({ config: this.config, credential: this.credential });
  }

  vpc() {
    return new VPCClient({ config: this.config, credential: this.credential });
  }
}

module.exports = {
  Client: Client,
};
