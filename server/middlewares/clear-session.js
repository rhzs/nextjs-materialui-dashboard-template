
function clearSession(req, res, next) {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('bri.sess');
      next()
    })
    return
  }

  next()
}

module.exports = clearSession