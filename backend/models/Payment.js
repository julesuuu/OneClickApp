const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  method: {
    type: String,
    enum: [
      'Paymongo',
      'Cash',
      'Bank Transfer',
      'Other'
    ],
    required: true
  },
  status: {
    type: String,
    enum: [
      'Pending',
      'Paid',
      'Failed',
      'Refunded'
    ],
    default: 'Pending'
  },
  paymongoPaymentId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    default: null
  },
  paymongoIntentId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    default: null
  },
  referenceNumber: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    default: null
  },
  paidAt: {
    type: Date,
    default: null
  }
}, { timestamps: true })

paymentSchema.index({ user: 1, status: 1 })
paymentSchema.index({ request: 1, createdAt: -1 })
paymentSchema.index({ status: 1, createdAt: -1 })

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment