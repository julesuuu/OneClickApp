const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const { step1Schema, step2Schema, step3Schema } = require('../utils/validators')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, email, password } = step1Schema.parse(request.body)

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    email,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.patch('/me', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  let validatedData = {}

  if (request.body.birthdate || request.body.name) {
    validatedData = step2Schema.parse(request.body)
  } else if (request.body.course || request.body.yearLevel) {
    validatedData = step3Schema.parse(request.body)
  } else {
    return response.status(400).json({error: 'no valid profile data provided'})
  }

  if (validatedData.course) {
    validatedData.profileCompleted = true
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { ...validatedData },
    {new: true, runValidators: true}
  )

  response.json(updatedUser)
})

module.exports = usersRouter