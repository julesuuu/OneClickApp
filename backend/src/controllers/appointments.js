const appointmentRouter = require('express').Router()
const Appointment = require('../models/Appointment')
const AppointmentSlot = require('../models/AppointmentSlot')
const Document = require('../models/Document')
const { userExtractor } = require('../utils/middleware')

appointmentRouter.get('/slots', async (req, res) => {
  const slots = await AppointmentSlot.find({
    isAvailable: true,
    date: { $gte: new Date() },
  }).sort({ date: 1, timeSlot: 1 })

  res.json(slots)
})

appointmentRouter.get('/my-appointments', userExtractor, async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate('documents')
    .populate('slot')
    .sort({ createdAt: -1 })

  res.json(appointments)
})

appointmentRouter.get('/ready-documents', userExtractor, async (req, res) => {
  const documents = await Document.find({
    user: req.user._id,
    status: 'Ready for Pickup',
    appointment: null,
  })

  res.json(documents)
})

appointmentRouter.post('/', userExtractor, async (req, res) => {
  const { slotId, documentIds } = req.body

  if (
    !slotId ||
    !documentIds ||
    !Array.isArray(documentIds) ||
    documentIds.length === 0
  ) {
    return res
      .status(400)
      .json({ error: 'Slot and at least one document are required' })
  }

  const readyDocs = await Document.find({
    _id: { $in: documentIds },
    user: req.user._id,
    status: 'Ready for Pickup',
    appointment: null,
  })

  if (readyDocs.length !== documentIds.length) {
    return res.status(400).json({
      error:
        'One or more documents are not ready for pickup or already have appointments',
    })
  }

  const slot = await AppointmentSlot.findById(slotId)

  if (!slot || !slot.isAvailable) {
    return res.status(400).json({ error: 'Slot is not available' })
  }

  const availableCapacity = slot.maxCapacity - slot.currentBookings

  if (availableCapacity < documentIds.length) {
    return res.status(400).json({
      error: `Not enough capacity. Only ${availableCapacity} spots available.`,
    })
  }

  const appointment = new Appointment({
    user: req.user._id,
    documents: documentIds,
    slot: slotId,
    status: 'Scheduled',
  })

  const savedAppointment = await appointment.save()

  await Document.updateMany(
    { _id: { $in: documentIds } },
    { appointment: savedAppointment._id },
  )

  slot.currentBookings += documentIds.length
  if (slot.currentBookings >= slot.maxCapacity) {
    slot.isAvailable = false
  }
  await slot.save()

  const populatedAppointment = await Appointment.findById(savedAppointment._id)
    .populate('documents')
    .populate('slot')

  res.status(201).json(populatedAppointment)
})

module.exports = appointmentRouter
