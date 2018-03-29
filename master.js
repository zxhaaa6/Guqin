const PROTO_PATH = __dirname + '/master.proto';
const grpc = require('grpc');
const config = require("./config/config");
const fs = require("fs");
const protobuf = grpc.load(PROTO_PATH).guqin;
const InitialMaster = require("./system/InitialMaster");
const resolve = function(res) {
    res();
};

// ===================== log module =========================
let hasLogDir = fs.existsSync(__dirname + "/logs");
if (!hasLogDir) {
    fs.mkdirSync(__dirname + "/logs");
}

let hasLogMasterDir = fs.existsSync(__dirname + "/logs/master");
if (!hasLogMasterDir) {
    fs.mkdirSync(__dirname + "/logs/master");
}

let log4js = require("log4js");
if (config.log4js.logging) {
    log4js.configure(__dirname + "/config/master_log4js.json", {
        cwd: __dirname
    });
}
// ==================== log module =========================
let log = log4js.getLogger('master');

new Promise(resolve).then(() => {
    return InitialMaster.initProcess();
}).then(() => {
    return InitialMaster.fillMasterDataCache();
}).then(() => {
    let server = new grpc.Server();
    let registMethod = require('./master_core/index');
    server.addService(protobuf.MasterCache.service, registMethod);
    server.bind('0.0.0.0:3100', grpc.ServerCredentials.createInsecure());
    server.start();
    log.info('✓ Guqin Master Service StartUp Success! Listening on port 2000');
}).catch(err => {
    log.error(err);
    log.error("Fatal error was encountered. Guqin Master service cannot started.");
    process.exit(0);
});