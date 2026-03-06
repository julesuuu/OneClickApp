const express = require('express')
require('express-async-errors')
const cors = require('cors')
const { clerkMiddleware } = require('@clerk/express')
const { errorHandler } = require('./utils/middleware')
const connectDB = require('./db')
const usersRouter = require('./controllers/users')
const webhooksRouter = require('./controllers/webhooks')
const documentsRouter = require('./controllers/documents')
const appointmentRouter = require('./controllers/appointments')
const adminRouter = require('./controllers/admin')

const app = express()

connectDB()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://one-click-app.vercel.app',
      'https://julesuuus-projects.oneclickappg3.com',
    ],
    credentials: true,
  }),
)
app.use(express.json())
app.use(clerkMiddleware())
app.use('/api/users', usersRouter)
app.use('/api/webhooks', webhooksRouter)
app.use('/api/documents', documentsRouter)
app.use('/api/appointments', appointmentRouter)
app.use('/api/admin', adminRouter)

app.use(errorHandler)

module.exports = app
