const mongoose = require('mongoose')

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL)
}

const models = { User, Message }

module.exports = {
  connectDb,
  models
}
