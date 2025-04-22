import axios from 'axios';
import { EXC_TYPE_TRANSPORT, UCloudError } from '../exception';
import type Request from '../request';
import Response from '../response';

export class Transport {
  baseUrl?: string;

  userAgent?: string;

  options?: object;

  constructor({
    baseUrl,
    userAgent,
    options,
  }: {
    baseUrl?: string;
    userAgent?: string;
    options?: object;
  }) {
    this.baseUrl = baseUrl;
    this.userAgent = userAgent;
    this.options = options;
  }

  async invoke(req: Request): Promise<Response> {
    let resp: Response;
    try {
      const httpResp = await axios({
        method: 'post',
        baseURL: this.baseUrl,
        headers: {
          'User-Agent': this.userAgent,
          'Content-Type': 'application/json',
        },
        data: req.toObject(),
        ...this.options,
      });
      const requestId = httpResp.headers['x-ucloud-request-uuid'];
      resp = new Response(httpResp.data, requestId);
    } catch (e: any) {
      throw new UCloudError({
        typ: EXC_TYPE_TRANSPORT,
        message: e.message,
        retCode: -1,
      });
    }

    if (resp != null && resp.getRetCode() !== 0) {
      throw new UCloudError({
        typ: EXC_TYPE_TRANSPORT,
        message: resp.getMessage(),
        retCode: resp.getRetCode(),
        requestId: resp.getRequestId(),
      });
    }
    return resp;
  }
}
