const uuidv4 = require('uuid/v4')

const generateUuid = () => {
  // /[^a-zA-Z0-9]/g /[^0-9.]/g
  return uuidv4().replace(/-/g, '');
}

module.exports = {
  generateUuid
}