import type { Context, MiddlewareOptions } from './middleware/index.js';
import Request from './request/index.js';

export const credentialMiddleware: MiddlewareOptions = {
  request: (ctx: Context) => {
    const signed = ctx.credential.sign(ctx.request.toObject());
    return new Request(signed);
  },
};

export const defaultsMiddleware: MiddlewareOptions = {
  request: (ctx: Context) => {
    const req = ctx.request;
    const cfg = ctx.config;

    if (!req.data.Region && cfg.region) {
      req.data.Region = cfg.region;
    }

    if (!req.data.ProjectId && cfg.projectId) {
      req.data.ProjectId = cfg.projectId;
    }
    return req;
  },
};

export const logMiddleware: MiddlewareOptions = {
  request: (ctx: Context) => {
    if (!ctx.config.logger) {
      return ctx.request;
    }
    ctx.config.logger.info(ctx.request.toObject());
    return ctx.request;
  },
  response: (ctx: Context) => {
    if (!ctx.config.logger) {
      return ctx.response;
    }
    if (ctx.response) {
      ctx.config.logger.info(ctx.response.toObject());
    }
    return ctx.response;
  },
  error: (ctx: Context) => {
    console.log('debug', !ctx.config.logger);
    if (!ctx.config.logger) {
      return;
    }
    ctx.config.logger.error(ctx.exception?.message);
  },
};
