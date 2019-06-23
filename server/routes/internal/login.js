const passport = require('../middlewares/passport-local-strategy')

const loginPageHandler = (app) => (req, res) => {

  const data = {
    csrfToken: req.csrfToken(),
    errorMessage: req.flash('error').join(',')
  }

  app.render(req, res, '/login', data)
}

const loginFormHandler = passport.authenticate('local-login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  session: true,
  failureFlash: true
})

module.exports = {
  loginPageHandler,
  loginFormHandler
}
