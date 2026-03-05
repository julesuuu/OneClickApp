const adminRouter = require('express').Router()
const Document = require('../models/Document')
const Appointment = require('../models/Appointment')
const AppointmentSlot = require('../models/AppointmentSlot')
const User = require('../models/User')
const { userExtractor, adminValidator } = require('../utils/middleware')

adminRouter.use(userExtractor, adminValidator)

adminRouter.get('/documents', async (req, res) => {
  const { status } = req.query
  const filter = status ? { status } : {}
  const documents = await Document.find(filter)
    .populate('user', 'name email studentNumber')
    .sort({ createdAt: -1 })

  res.json(documents)
})

adminRouter.patch('/documents/:id', async (req, res) => {
  const { status } = req.body
  const document = await Document.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  ).populate('user', 'name email studentNumber')

  if (!document) {
    return res.status(404).json({ error: 'Document not found' })
  }

  res.json(document)
})

adminRouter.get('/appointments', async (req, res) => {
  const { status } = req.query
  const filter = status ? { status } : {}
  const appointments = await Appointment.find(filter)
    .populate('user', 'name email studentNumber')
    .populate('documents')
    .populate('slot')
    .sort({ createdAt: -1 })

  res.json(appointments)
})

adminRouter.patch('/appointments/:id', async (req, res) => {
  const { status } = req.body
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  )
    .populate('user', 'name email studentNumber')
    .populate('documents')
    .populate('slot')

  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' })
  }

  if (status === 'Cancelled') {
    const slot = await AppointmentSlot.findById(appointment.slot)
    if (slot) {
      slot.currentBookings = Math.max(
        0,
        slot.currentBookings - appointment.documents.length,
      )
      if (slot.currentBookings < slot.maxCapacity) {
        slot.isAvailable = true
      }
      await slot.save()
    }
  }

  res.json(appointment)
})

adminRouter.get('/slots', async (req, res) => {
  const slots = await AppointmentSlot.find().sort({ date: 1, timeSlot: 1 })
  res.json(slots)
})

adminRouter.post('/slots', async (req, res) => {
  const { date, timeSlot, maxCapacity } = req.body

  const dateObj = new Date(date)
  const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0))

  const existingSlot = await AppointmentSlot.findOne({
    date: startOfDay,
    timeSlot,
  })

  if (existingSlot) {
    return res
      .status(400)
      .json({ error: `Slot for ${timeSlot} on this date already exists` })
  }

  const slot = new AppointmentSlot({
    date: startOfDay,
    timeSlot,
    maxCapacity: maxCapacity || 20,
  })

  const savedSlot = await slot.save()
  res.status(201).json(savedSlot)
})

adminRouter.delete('/slots/:id', async (req, res) => {
  const slot = await AppointmentSlot.findById(req.params.id)

  if (!slot) {
    return res.status(404).json({ error: 'Slot not found' })
  }

  if (slot.currentBookings > 0) {
    return res
      .status(400)
      .json({ error: 'Cannot delete slot with existing bookings' })
  }

  await slot.deleteOne()
  res.status(204).end()
})

adminRouter.get('/users', async (req, res) => {
  const { validated } = req.query
  const filter = {}
  if (validated === 'true') filter.isValidated = true
  if (validated === 'false') filter.isValidated = false

  const users = await User.find(filter).select('-__v').sort({ createdAt: -1 })

  res.json(users)
})

adminRouter.patch('/users/:id/validate', async (req, res) => {
  const { isValidated } = req.body
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isValidated },
    { new: true },
  ).select('-__v')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

adminRouter.patch('/users/:id/role', async (req, res) => {
  const { role } = req.body
  if (!['student', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' })
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true },
  ).select('-__v')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

module.exports = adminRouter
