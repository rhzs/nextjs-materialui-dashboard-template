
// const Sentry = require('@sentry/node');

const express = require('express');
const next = require('next');
const helmet = require('helmet');
const path = require('path');


const connectMiddlewares = require('./middlewares');
const registerRoutes = require('./routes');

class Server {

  constructor(config) {
    console.log(config);
    this.app = express();
    this.config = {...config};
    this.server = undefined;
    this.init();
  }

  init() {
    // Do not change the order! Order matters!
    this.initCaching();
    this.initForceSSL();
    this.initNextJs();
    this.initSecurityHeaders();
    this.initAppMiddlewares();
    this.initStaticRoutes();
    this.initRoutes();
  }

  initCaching() {
    if (this.config.SERVER.ENVIRONMENT === this.config.ENVIRONMENT.UAT || this.config.SERVER.ENVIRONMENT === this.config.ENVIRONMENT.DEV) {
      this.app.use(helmet.noCache());
    } else {
      this.app.use((req, res, next) => {
        res.header('Cache-Control', `public, max-age=${this.config.SERVER.CACHE_DURATION_SECONDS}`);
        const milliSeconds = 1000;
        res.header(
          'Expires',
          new Date(Date.now() + this.config.SERVER.CACHE_DURATION_SECONDS * milliSeconds).toUTCString(),
        );
        next();
      });
    }
  }

  initForceSSL() {
    const STATUS_CODE_MOVED = 301;

    const SSLMiddleware = (req, res, next) => {
      // Redirect to HTTPS
      if (!req.secure || req.get('X-Forwarded-Proto') !== 'https') {
        if (
          !this.config.SERVER.ENFORCE_HTTPS ||
          this.config.SERVER.ENVIRONMENT === 'test' ||
          this.config.SERVER.ENVIRONMENT === 'development' ||
          req.url.match(/_health\/?/)
        ) {
          return next();
        }
        return res.redirect(STATUS_CODE_MOVED, `https://${req.headers.host}${req.url}`);
      }
      next();
    };

    this.app.enable('trust proxy');
    this.app.use(SSLMiddleware);
  }

  initNextJs() {
    const dev = this.config.SERVER.ENVIRONMENT !==  this.config.ENVIRONMENT.PROD;
    this.nextjs = next({ dev });
  }

  initStaticRoutes() {
    this.app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'img', 'favicon.ico')));
    this.app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots', 'robots.txt')));
  }

  initSecurityHeaders() {
    this.app.disable('x-powered-by');
    this.app.use(
      helmet({
        frameguard: {action: 'deny'},
      }),
    );
    this.app.use(
      helmet.hsts({
        includeSubDomains: true,
        maxAge: 31536000,
        preload: true,
      }),
    );
    this.app.use(helmet.noSniff());
    this.app.use(helmet.xssFilter());
    this.app.use(
      helmet.contentSecurityPolicy({
        browserSniff: true,
        directives: this.config.SERVER.CSP,
        disableAndroid: false,
        loose: this.config.SERVER.ENVIRONMENT !== 'development',
        reportOnly: false,
        setAllHeaders: false,
      }),
    );
    this.app.use(
      helmet.referrerPolicy({
        policy: 'same-origin',
      }),
    );
    this.app.use(
      helmet.expectCt({
        maxAge: 0,
      }),
    );
  }

  initAppMiddlewares() {
    connectMiddlewares(this.app);
  }

  initRoutes() {
    registerRoutes(this.nextjs, this.app);
  }

  start() {
    return new Promise((resolve, reject) => {
      if (this.server) {
        reject('Server is already running.');
      } else if (this.config.SERVER.PORT_HTTP) {
        this.nextjs.prepare().then(() => {
          this.server = this.app.listen(this.config.SERVER.PORT_HTTP, () => resolve(this.config.SERVER.PORT_HTTP));
        });
      } else {
        reject('Server port not specified.');
      }
    });
  }

  stop() {
    if (this.server) {
      this.server.close();
      this.server = undefined;
    } else {
      throw new Error('Server is not running.');
    }
  }

}

module.exports = Server;
