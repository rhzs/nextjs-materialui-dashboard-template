
const session = require('express-session');
const RedisStore = require('connect-redis')(session)

const sessionMiddleware = session({
  store: new RedisStore({
    host: process.env.REDIS_URL || 'localhost',
    port: '6379'
  }),
  secret: process.env.SESSION_SECRET || '>?<red1s',
  resave: false,
  saveUninitialized: false,
  name: 'incubus8.sess',
  cookie: {
    sameSite: 'strict',
    maxAge: 10 * 60 * 1000 // 10 minutes
  }
})

function retrySession(req, res, next) {
  let tries = 3

  function lookupSession(error) {
    if (error) {
      return next(error)
    }

    tries -= 1

    if (req.session !== undefined) {
      return next()
    }

    if (tries < 0) {
      return next(new Error('Could not connect to Redis'))
    }

    sessionMiddleware(req, res, lookupSession)
  }

  lookupSession()
}

module.exports = retrySession
