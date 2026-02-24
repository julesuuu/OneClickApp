const usersRouter = require("express").Router()
const User = require("../models/User")
const { userExtractor } = require("../utils/middleware")

usersRouter.post("/sync", async (req, res) => {
  const { userId } = req.auth()

  if (!userId) return res.status(401).json({ error: "No clerk session found" })

  let user = await User.findOne({ clerkId: userId })

  if (!user) {
    const existingUser = await User.findOne({ username: req.body.username })

    user = new User({
      clerkId: userId,
      email: req.body.email,
      username: req.body.username || `user_${userId.slice(-4)}`,
      username: existingUser
        ? `${req.body.username}_${userId.slice(-4)}`
        : req.body.username,
      profileCompleted: false,
    })

    await user.save()
  }

  res.status(200).json(user)
})

usersRouter.patch("/profile", userExtractor, async (req, res) => {
  if (!req.user) return res.status(400).json({ error: "User not found" })

  const updates = req.body

  Object.keys(updates).forEach((key) => {
    req.user[key] = updates[key]
  })

  updatedUser = await req.user.save()
  res.json(updatedUser)
})

usersRouter.get("/me", userExtractor, async (req, res) => {
  if (!req.user)
    return res.status(404).json({ error: "User profile not synced" })

  res.json(req.user)
})

usersRouter.get("/", async (req, res) => {
  const users = await User.find({})

  res.json(users)
})

module.exports = usersRouter
