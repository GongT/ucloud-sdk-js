import { VERSION } from '../version';
import Config, { type ConfigOptions } from './config';
import Credential, { type CredentialOptions } from './credential';
import { EXC_TYPE_TRANSPORT, UCloudError } from './exception';
import { Context, type MiddlewareOptions } from './middleware';
import {
  credentialMiddleware,
  defaultsMiddleware,
  logMiddleware,
} from './middlewares';
import type Request from './request';
import type Response from './response';
import { Transport } from './transport';

export default class Client {
  config: Config;

  credential: Credential;

  middlewares: MiddlewareOptions[];

  transport: Transport;

  constructor({
    config,
    credential,
  }: {
    config: ConfigOptions;
    credential: CredentialOptions;
  }) {
    this.config = new Config(config);
    this.credential = new Credential(credential);
    this.middlewares = [
      defaultsMiddleware,
      credentialMiddleware,
      logMiddleware,
    ];

    let ua = `JS-SDK/${VERSION}`;
    if (config.userAgent) {
      ua += config.userAgent;
    }
    this.transport = new Transport({
      baseUrl: this.config.baseUrl,
      userAgent: ua,
    });
  }

  useMiddleware(options: MiddlewareOptions) {
    this.middlewares.push(options);
  }

  withTransport(transport: Transport) {
    this.transport = transport;
  }

  async invoke(req: Request): Promise<Response> {
    const ctx = new Context({
      config: this.config,
      credential: this.credential,
      request: req,
    });

    // resolve request
    for (const middleware of this.middlewares) {
      if (!middleware.request) {
        continue;
      }
      ctx.request = middleware.request(ctx);
    }

    // do invoking
    let resp: undefined | Response;
    const maxRetries = this.config.maxRetries || 3;
    for (let k = 0; k <= maxRetries; k++) {
      try {
        resp = await this.transport.invoke(ctx.request);
        break; // success, stop retrying
      } catch (e: any) {
        ctx.exception = e;
        for (const middleware of this.middlewares) {
          if (!middleware.error) {
            continue;
          }
          middleware.error(ctx);
        }
      }
    }

    if (!resp) {
      throw ctx.exception!;
    }

    // resolve response
    ctx.response = resp;
    for (const middleware of this.middlewares) {
      if (!middleware.response) {
        continue;
      }
      ctx.response = middleware.response(ctx);
    }

    if (!resp) {
      throw new UCloudError({
        typ: EXC_TYPE_TRANSPORT,
        retCode: -1,
        message: 'invalid response',
        requestId: '',
      });
    }
    return resp;
  }
}
