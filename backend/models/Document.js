const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  credentialType: {
    type: String,
    required: true,
    enum: [
      'Transcript of Records',
      'Diploma',
      'Form 138',
      'Certificate of Enrollment',
      'Course Description',
      'Good Moral Character',
      'Honorable Dismissal',
    ],
    trim: true
  },
  purpose: {
    type: String,
    required: true,
    enum: [
      'Employment',
      'Further Studies / Graduate School',
      'Transfer to another school',
      'Visa / Immigration',
      'Personal User',
      'Other'
    ]
  },
  customPurpose: {
    type: String,
    trim: true,
    default: null
  },
  copies: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1
  },
  status: {
    type: String,
    enum: [
      'Pending',
      'Processing',
      'Ready for Pickup',
      'Completed',
      'Cancelled',
      'Rejected'
    ],
    default: 'Pending',
    index: true
  },
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  }],
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    default: null
  },
  notes: {
    type: String,
    trim: true,
    default: null
  }
}, { timestamps: true })

const Document = mongoose.model('Document', documentSchema)

module.exports = Document