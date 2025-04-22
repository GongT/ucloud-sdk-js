export { Context } from './context.js';

export type MiddlewareOptions = {
  request?: Function;
  response?: Function;
  error?: Function;
};
