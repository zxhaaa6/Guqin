import BasicMessage from './HttpMessage';
import { genFinalMessageStr } from './LogService';

function sendJson(ctx) {
  return async (log, messageOrData: any = '') => {
    let message;
    let data;
    if (typeof messageOrData === 'object') {
      data = messageOrData || {};
      message = data.message || 'success';
    } else {
      message = messageOrData;
    }
    if (log) {
      log.info(genFinalMessageStr(ctx, 200, message));
    }
    return (ctx.body = new BasicMessage(true, 200, message, data));
  };
}

function sendError(ctx) {
  return async (log, error) => {
    let isWarn = false;
    let code = 500;
    let errTitle = BasicMessage.genMessageTitle(500);
    if (typeof error.name === 'number') {
      isWarn = true;
      code = error.name;
      errTitle = BasicMessage.genMessageTitle(error.name);
    }
    const msgArr = error.message.split('::');
    const msgSegs =
      msgArr.length > 0 ? msgArr[msgArr.length - 1].split('->') : [];
    const resMsg = `${errTitle}${
      msgSegs.length > 0 ? msgSegs[msgSegs.length - 1] : ''
    }`;
    if (log) {
      error.message = `${errTitle}:${log.category}::${error.message}`;
      if (isWarn) {
        log.warn(genFinalMessageStr(ctx, code, error.message));
      } else {
        log.error(genFinalMessageStr(ctx, code, error.message, error.stack));
      }
    }
    ctx.status = code;
    return (ctx.body = new BasicMessage(false, code, resMsg));
  };
}

export default async (ctx, next) => {
  if (!ctx.sendJson) {
    ctx.sendJson = sendJson(ctx);
  }
  if (!ctx.sendError) {
    ctx.sendError = sendError(ctx);
  }
  await next();
};
