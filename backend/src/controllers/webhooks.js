const express = require('express')
const crypto = require('crypto')
const User = require('../models/User')

const webhookRouter = express.Router()

webhookRouter.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('CLERK_WEBHOOK_SECRET not set')
      return res.status(500).json({ error: 'Webhook secret not configured' })
    }

    const sig = req.headers['svix-signature']
    const timestamp = req.headers['svix-timestamp']

    if (!sig || !timestamp) {
      return res.status(400).json({ error: 'Missing signature headers' })
    }

    const body = req.body.toString()

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    const signature = sig.split(',')[1]

    if (expectedSignature !== signature) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = JSON.parse(body)
    const { type, data } = event

    switch (type) {
      case 'user.created': {
        const existingUser = await User.findOne({ clerkId: data.id })
        if (!existingUser) {
          const user = new User({
            clerkId: data.id,
            email: data.email_addresses[0]?.email_address,
            username:
              data.username || data.first_name
                ? `${data.first_name.toLowerCase()}_${data.last_name?.toLowerCase() || ''}`
                : `user_${data.id.slice(-4)}`,
            name: data.first_name
              ? `${data.first_name} ${data.last_name || ''}`.trim()
              : null,
            profileCompleted: false,
          })
          await user.save()
          console.log(`User created via webhook: ${user.email}`)
        }
        break
      }

      case 'user.updated': {
        const user = await User.findOne({ clerkId: data.id })
        if (user) {
          user.email = data.email_addresses[0]?.email_address || user.email
          user.username =
            data.username || data.first_name
              ? `${data.first_name.toLowerCase()}_${data.last_name?.toLowerCase() || ''}`
              : user.username
          user.name = data.first_name
            ? `${data.first_name} ${data.last_name || ''}`.trim()
            : user.name
          await user.save()
          console.log(`User updated via webhook: ${user.email}`)
        }
        break
      }

      case 'user.deleted': {
        const user = await User.findOne({ clerkId: data.id })
        if (user) {
          await User.findByIdAndDelete(user._id)
          console.log(`User deleted via webhook: ${user.email}`)
        }
        break
      }

      default:
        console.log(`Unhandled webhook event: ${type}`)
    }

    res.json({ received: true })
  },
)

module.exports = webhookRouter
