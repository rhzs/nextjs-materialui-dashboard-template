
function continueIfLoggedIn(req, res, next) {
  if (req.user) {
    next()
    return
  }

  res.redirect('/login');
}

module.exports = continueIfLoggedIn;
