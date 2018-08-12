import { configure, getLogger } from 'log4js';
import App from './app';
import config from './config/config';
import MongodbManager from './system/MongodbManager';
import RedisManager from './system/RedisManager';

// tslint:disable-next-line
require('dotenv').config();

// ===================== log module =========================
if (config.log4js.logging) {
  configure(`${__dirname}/config/log4js.json`);
} else {
  configure({
    appenders: {
      console: {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] %m%]',
        },
      },
    },
    categories: { default: { appenders: ['console'], level: 'info' } },
  });
}
// ==================== log module =========================

const log = getLogger('main');

async function startUp() {
  /* Initialize connections for [ Mongo | Redis | Elasticsearch ] */
  await RedisManager.connectRedisDbServer();
  await MongodbManager.connectMongodbServer();

  /* Initialize cache */
  // todo Move to unique service

  /* Initialize Http Service */
  const app = new App();
  app.startUpHttpServer();
}

startUp().catch(err => {
  log.error(err);
  log.error('Fatal error was encountered. Kuaizu-api service cannot started.');
  process.exit(0);
});
