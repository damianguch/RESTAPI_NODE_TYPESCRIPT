import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';
import { config } from './config/config';

const router = express();

/* Connect to Mongo DB */
mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info('Connected to database!.');
    StartServer();
  })
  .catch((err) => {
    Logging.error('Unable to connect to database.');
    Logging.error(err.message);
  });

/** Only Start the server if mongo connects */
const StartServer = () => {
  router.use((req, res, next) => {
    /** Log the request */
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      /** Log the response */
      Logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] IP: [${req.socket.remoteAddress}] - Status:[${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of the API */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Origin',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE,GET');
      return res.status(200).json();
    }

    next();
  });

  /** Routes */
  router.use('/api', authorRoutes);
  router.use('/api', bookRoutes);

  /** Health Check */
  router.get('/ping', (req, res, next) => {
    res.status(200).json({ message: 'pong' });
  });

  /** Error Handling */
  router.use((req, res, next) => {
    const err = new Error('Not Found!');
    Logging.error(err);
    return res.status(404).json({ message: err.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server running on port ${config.server.port}.`)
    );
};
