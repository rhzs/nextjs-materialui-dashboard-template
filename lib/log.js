const Sentry = require('@sentry/node')

function noticeError(err) {
  console.log(err)
  //Sentry.captureException(err)
}

module.exports = { noticeError }
