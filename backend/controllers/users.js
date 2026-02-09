const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {

  if (!request.body) {
    return response.status(400).json({ error: 'content missing' })
  }

  const { username, name, email, password } = request.body
  
  if (!username || username.length < 3) {
    return response.status(400).json({
      error: 'username must be atleast 3 characters long'
    })
  }

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'password must be atleast 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    email,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter