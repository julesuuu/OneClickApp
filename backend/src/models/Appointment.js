const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true,
      },
    ],
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AppointmentSlot',
      required: true,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Rescheduled', 'Cancelled', 'Completed'],
      default: 'Scheduled',
    },
  },
  { timestamps: true },
)

appointmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

appointmentSchema.index({ user: 1, status: 1 })

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment
