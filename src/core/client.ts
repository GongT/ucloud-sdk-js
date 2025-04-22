import { VERSION } from '../version.js';
import Config, { type ConfigOptions } from './config/index.js';
import Credential, { type CredentialOptions } from './credential/index.js';
import { EXC_TYPE_TRANSPORT, UCloudError } from './exception/index.js';
import { Context, type MiddlewareOptions } from './middleware/index.js';
import {
  credentialMiddleware,
  defaultsMiddleware,
  logMiddleware,
} from './middlewares.js';
import type Request from './request/index.js';
import type Response from './response/index.js';
import { Transport } from './transport/index.js';

interface IOptions {
  config: ConfigOptions;
  credential: CredentialOptions;
}

export default abstract class Client {
  protected readonly config: Config;
  protected readonly credential: Credential;
  protected readonly middlewares: MiddlewareOptions[];
  protected transport: Transport;

  constructor(source: IOptions | Client) {
    if (source instanceof Client) {
      this.config = source.config;
      this.credential = source.credential;
      this.middlewares = source.middlewares;
      this.transport = source.transport;
    } else {
      const { config, credential } = source;
      this.config = new Config(config);
      this.credential = new Credential(credential);
      this.middlewares = [
        defaultsMiddleware,
        credentialMiddleware,
        logMiddleware,
      ];

      let ua = `JS-SDK/${VERSION}`;
      if (config.userAgent) {
        ua += ' ';
        ua += config.userAgent;
      }
      this.transport = new Transport({
        baseUrl: this.config.baseUrl,
        userAgent: ua,
      });
    }
  }

  useMiddleware(options: MiddlewareOptions) {
    this.middlewares.unshift(options);
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
        if (e instanceof UCloudError) {
          break;
        }
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
