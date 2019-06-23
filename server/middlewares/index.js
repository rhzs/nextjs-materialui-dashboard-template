const bodyParser = require('body-parser')
const flash = require('connect-flash')
const csrf = require('./csrf')
const csrfError = require('./csrf-error')
const passport = require('./passport-local-strategy')
const session = require('./session')
const pino = require('express-pino-logger')()

function connectMiddlewares(server) {
  // server.use(pino)

  server.use(session);
  server.use(flash());

  server.use(bodyParser.urlencoded({ extended: false }));

  server.use(csrf);
  server.use(csrfError);

  server.use(passport.initialize());
  server.use(passport.session());
}

module.exports = connectMiddlewares;
