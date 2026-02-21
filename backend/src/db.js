const mongoose = require('mongoose')
const config = require('./utils/config')

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB', error.message)
    process.exit(1)
  }
}

module.exports = connectDB