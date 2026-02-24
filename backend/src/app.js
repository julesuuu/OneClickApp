const express = require("express")
require("express-async-errors")
const cors = require("cors")
const { clerkMiddleware } = require("@clerk/express")
const { errorHandler } = require("./utils/middleware")
const connectDB = require("./db")
const usersRouter = require("./controllers/users")
const documentsRouter = require("./controllers/documents")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use("/api/users", usersRouter)
app.use("/api/documents", documentsRouter)

app.use(errorHandler)

module.exports = app
