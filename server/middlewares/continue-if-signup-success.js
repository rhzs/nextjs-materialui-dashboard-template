
function continueIfSignupSuccess(req, res, next) {
  if (!req.session.signupSuccess) {
    return res.redirect('/login');
  }

  next()
}

module.exports = continueIfSignupSuccess;
