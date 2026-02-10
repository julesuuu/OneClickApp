require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY

module.exports = {
  MONGODB_URI,
  PORT,
  CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY
}