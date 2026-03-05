const mongoose = require("mongoose")

const appointmentSlotSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ["AM", "PM"],
      required: true,
    },
    maxCapacity: {
      type: Number,
      default: 20,
    },
    currentBookings: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

appointmentSlotSchema.index({ date: 1, timeSlot: 1 }, { unique: true })

appointmentSlotSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const AppointmentSlot = mongoose.model("AppointmentSlot", appointmentSlotSchema)

module.exports = AppointmentSlot
