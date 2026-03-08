const User = require('../models/User')

const userExtractor = async (req, res, next) => {
  try {
    const auth = req.auth()
    
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized: No auth context' })
    }
    
    const clerkId = auth.userId

    if (!clerkId) {
      return res.status(401).json({ error: 'Unauthorized: No session found' })
    }

    const user = await User.findOne({ clerkId })
    
    if (!user) {
      return res.status(401).json({ error: 'User not synced. Please complete onboarding first.' })
    }
    
    req.user = user

    next()
  } catch (error) {
    console.error('userExtractor error:', error)
    res.status(500).json({ error: 'Authentication error' })
  }
}

const errorHandler = async (error, req, res, next) => {
  console.error('Error:', error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: 'error.message' })
  }

  if (error.status === 401) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  res.status(500).json({ error: 'Internal server error' })
}

const adminValidator = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' })
  }
  next()
}

module.exports = { userExtractor, errorHandler, adminValidator }
