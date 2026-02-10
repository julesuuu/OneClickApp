const User = require('../models/User')

const userExtractor = async (req, res, next) => {
  const clerkId = req.auth.userId

  if (!clerkId) {
    return res.status(401).json({ error: 'Unauthorized: No session found' })
  }

  const user = await User.findOne({ clerkId })
  req.user = user

  next()
}

const errorHandler = async (error, req, res, next) => {
  console.error('Error:', error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: 'error.message' })
  }

  if (error.status === 401) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  res.status(500).json({error: 'Internal server error'})
}

module.exports = { userExtractor, errorHandler }