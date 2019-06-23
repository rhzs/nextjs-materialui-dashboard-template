
const {Router} = require('express');

const STATUS_CODE_OK = 200;
const HealthRoute = Router().get('/_health/?', (req, res) => res.sendStatus(STATUS_CODE_OK));

module.exports = {
  HealthRoute
};
