import type Credential from '../credential/index.js';
import type Config from '../config/index.js';
import type Request from '../request/index.js';
import type Response from '../response/index.js';
import type { UCloudError } from '../exception/index.js';

export class Context {
  credential: Credential;

  config: Config;

  request: Request;

  response?: Response;

  exception?: UCloudError;

  constructor({
    credential,
    config,
    request,
    response,
    exception,
  }: {
    credential: Credential;
    config: Config;
    request: Request;
    response?: Response;
    exception?: UCloudError;
  }) {
    this.credential = credential;
    this.config = config;
    this.request = request;
    this.response = response;
    this.exception = exception;
  }
}
