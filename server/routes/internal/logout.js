
const logoutHandler = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('incubus8.sess');

    res.redirect('/')
  })
}

module.exports = {
  logoutHandler
}