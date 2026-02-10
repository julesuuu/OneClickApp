const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    minlength: 2,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'other']
  },
  birthdate: {
    type: Date,
  },
  phone: {
    type: String,
  },
  lrn: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  studentNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  course: {
    type: String,
    enum: ['BSIT', 'BSBA', 'BSCrim', 'BSHM', 'BSE']
  },
  yearLevel: {
    type: String,
    enum: [
      '1st Year',
      '2nd Year',
      '3rd Year',
      '4th Year',
      'Graduating',
      'Graduate'
    ]
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  isValidated: {
    type: Boolean,
    default: false
  },
  profileCompleted: {
    type: Boolean,
    default: false
  },
  resetToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }]
}, { timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User