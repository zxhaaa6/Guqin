export default {
  host: '',
  port: 3000,
  log4js: {
    logging: false,
  },
  mongodb: {
    host: 'localhost',
    port: '27017',
    db: 'guqin',
    options: {
      autoIndex: true,
      reconnectTries: 20,
      reconnectInterval: 2000, // Reconnect every 500ms
      poolSize: 10, // By default, poolSize is 5
    },
  },
  redis: {
    host: 'localhost',
    port: 6379,
    db: 'guqin',
  },
  wechat: {
    // login by wechat
  },
};
