import BaseClient from '../core/client.js';
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
  cube() {
    return new CubeClient(this);
  }

  ipsecvpn() {
    return new IPSecVPNClient(this);
  }

  pathx() {
    return new PathXClient(this);
  }

  uaccount() {
    return new UAccountClient(this);
  }

  ubill() {
    return new UBillClient(this);
  }

  ucdn() {
    return new UCDNClient(this);
  }

  udb() {
    return new UDBClient(this);
  }

  uddb() {
    return new UDDBClient(this);
  }

  udisk() {
    return new UDiskClient(this);
  }

  udpn() {
    return new UDPNClient(this);
  }

  uec() {
    return new UECClient(this);
  }

  ufile() {
    return new UFileClient(this);
  }

  ufs() {
    return new UFSClient(this);
  }

  uhost() {
    return new UHostClient(this);
  }

  uk8s() {
    return new UK8SClient(this);
  }

  ulb() {
    return new ULBClient(this);
  }

  umem() {
    return new UMemClient(this);
  }

  unet() {
    return new UNetClient(this);
  }

  uphone() {
    return new UPhoneClient(this);
  }

  uphost() {
    return new UPHostClient(this);
  }

  usms() {
    return new USMSClient(this);
  }

  uvms() {
    return new UVMSClient(this);
  }

  vpc() {
    return new VPCClient(this);
  }
}
