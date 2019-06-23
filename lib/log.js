const newrelic = require('newrelic')
const Sentry = require('@sentry/node')

function noticeError(err) {
  console.log(err)	  
  //newrelic.noticeError(err)
  //Sentry.captureException(err)
}

module.exports = { noticeError }
