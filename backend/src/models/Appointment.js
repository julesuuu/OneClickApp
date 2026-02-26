const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ["AM", "PM"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Rescheduled", "Cancelled", "Completed"],
    },
  },
  { timestamps: true },
)

appointmentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

appointmentSchema.index({ appointmentDate: 1, timeSlot: 1 })

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment
