const appointmentRouter = require("express").Router()
const Appointment = require("../models/Appointment")
const Document = require("../models/Document")
const { userExtractor } = require("../utils/middleware")

appointmentRouter.post("/", userExtractor, async (req, res) => {
  const { appointmentDate, timeSlot, requestId } = req.body

  const dateObj = new Date(appointmentDate)
  const dayOfWeek = dateObj.getDay()

  if (dayOfWeek === 0)
    return res
      .status(400)
      .json({ error: "Appointments are only available Monday to Saturday" })

  const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0))

  const slotCount = await Appointment.countDocuments({
    appointmentDate: startOfDay,
    timeSlot: timeSlot,
    status: "Scheduled",
  })

  if (slotCount >= 10)
    return res.status(400).json({
      error: `The ${timeSlot} for this date is fully booked (10/10). Please choose another date.`,
    })

  const appointment = new Appointment({
    user: req.user._id,
    request: requestId,
    appointmentDate: startOfDay,
    timeSlot,
    status: "Scheduled",
  })

  const savedAppointment = await appointment.save()

  await Document.findByIdAndUpdate(requestId, {
    appointment: savedAppointment._id,
  })

  res.status(201).json(savedAppointment)
})

module.exports = appointmentRouter
