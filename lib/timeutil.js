const moment = require('moment');

function formatDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
  formatDate
};
