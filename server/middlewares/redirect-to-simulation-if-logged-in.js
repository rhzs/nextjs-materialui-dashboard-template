
function redirectToSimulationIfLoggedIn(req, res, next) {
  if (req.user) {
    res.redirect('/dashboard')
    return
  }

  next()
}

module.exports = redirectToSimulationIfLoggedIn;
