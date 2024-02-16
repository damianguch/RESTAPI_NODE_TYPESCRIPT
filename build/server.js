"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = __importDefault(require("./library/Logging"));
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const config_1 = require("./config/config");
const router = (0, express_1.default)();
/* Connect to Mongo DB */
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    Logging_1.default.info('Connected to database!.');
    StartServer();
})
    .catch((err) => {
    Logging_1.default.error('Unable to connect to database.');
    Logging_1.default.error(err.message);
});
/** Only Start the server if mongo connects */
const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the request */
        Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the response */
            Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] IP: [${req.socket.remoteAddress}] - Status:[${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of the API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE,GET');
            return res.status(200).json();
        }
        next();
    });
    /** Routes */
    router.use('/api', Author_1.default);
    router.use('/api', Book_1.default);
    /** Health Check */
    router.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'pong' });
    });
    /** Error Handling */
    router.use((req, res, next) => {
        const err = new Error('Not Found!');
        Logging_1.default.error(err);
        return res.status(404).json({ message: err.message });
    });
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => Logging_1.default.info(`Server running on port ${config_1.config.server.port}.`));
};
