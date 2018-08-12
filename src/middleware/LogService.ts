import { getRequestIp } from '../util/Util';

export const genFinalMessageStr = (
  ctx,
  code: number,
  message: string,
  stack?: string,
) => {
  return `[${getRequestIp(ctx)}] [${Date.now() - ctx.hitTime}ms] [${
    ctx.method
  }] [${ctx.url}] [${code}] info: ${stack ? message + '\n' + stack : message}`;
};
