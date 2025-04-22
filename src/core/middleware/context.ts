import type Credential from '../credential';
import type Config from '../config';
import type Request from '../request';
import type Response from '../response';
import type { UCloudError } from '../exception';

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
