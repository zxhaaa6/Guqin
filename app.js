const Koa = require('koa');
const Bodyparser = require('koa-bodyparser');
const Logger = require('koa-logger');
const Router = require('koa-router');
const Session = require('koa-session');
const Static = require('koa-static');
const View = require('koa-views');
const Pug = require('pug');
const log = require('log4js').getLogger("App");
const config = require('./config/config');
const SessionStore = require('./middleware/SessionStore');

class App {
    constructor() {
        this.app = new Koa();
        this.router = new Router();
        /*===================== middlewares ====================== */
        //this.app.use(Logger());
        this.app.use(Session({
            maxAge: 86400000,
            store: new SessionStore()
        }, this.app));
        this.app.use(Bodyparser());
        this.app.use(Static(__dirname + '/public'));
        this.app.use(View(__dirname + '/model_view', { extension: 'pug' }));

        // x-response-time
        this.app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
        });

        // logger
        this.app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        });

        // response
        this.useAllRoutes();

        this.app.on('error', (err, ctx) => {
            console.error(err);
            // console.error('server error', err, ctx);
        });
    };

    useAllRoutes() {
        this.DefaultPageController = require('./model_service/default/DefaultPageController');
        this.router.use('/', new this.DefaultPageController(this.router).getRouter().routes());

        this.app.use(this.router.routes());
    }

    startUpHttpServer() {
        const http = require('http');
        this.port = this.normalizePort(config.port || "3000");
        this.server = http.createServer(this.app.callback());
        this.server.listen(this.port);
        this.server.on("error", err => {
            this.reportError(err);
        });
        this.server.on("listening", () => {
            this.reportListening("http");
        });
    }

    normalizePort(val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }

    reportListening(type) {
        const addr = this.server.address();
        const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        log.info("✓ Listening on [" + type + "] " + bind);
        if (process.env.NODE_ENV === "production") {
            log.info("process.env.NODE_ENV = " + process.env.NODE_ENV);
        } else {
            log.warn("process.env.NODE_ENV = " + process.env.NODE_ENV);
        }
        log.info("-----= Guqin Service Startup Success =-----");
    }

    reportError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                log.error("Port " + this.port + " requires elevated privileges.");
                log.error("-----= Guqin Service Startup Failed =-----");
                process.exit(1);
                break;
            case "EADDRINUSE":
                log.error("Port " + this.port + " is already in use.");
                log.error("-----= Guqin Service Startup Failed =-----");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
};

module.exports = App;

// app.use(async (ctx, next) => {
//     if (!ctx.model)
//         ctx.model = require('./models');
//     await next();
// });