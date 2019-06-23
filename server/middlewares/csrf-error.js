const { noticeError } = require('../../lib/log')

function csrfError(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    noticeError(err)
    return next(err)
  }

  // handle CSRF token errors here
  res.redirect('/logout?msg=invalid_csrf')
}

module.exports = csrfError;
