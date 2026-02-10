const usersRouter = require('express').Router()
const User = require('../models/User')
const { userExtractor } = require('../utils/middleware')

usersRouter.post('/sync', async (req, res) => {

  const { userId, sessionClaims } = req.auth()

  if (!userId) return res.status(401).json({ error: 'No clerk session found' })
  
  let user = await User.findOne({ clerdId: userId })
  
  if (!user) {
    user = new User({
      clerkId: userId,
      email: req.body.email,
      username: req.body.username || `user_${userId.slice(-4)}`,
      profileCompleted: false
    })

    await user.save()
  }

  res.status(200).json(user)
})

usersRouter.get('/me', userExtractor, async (req, res) => {
  
  if (!req.user) return res.status(404).json({ error: 'User profile not synced' })
  
  res.json(req.user)
})

module.exports = usersRouter