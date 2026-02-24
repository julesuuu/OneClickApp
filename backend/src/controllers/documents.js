const documentsRouter = require("express").Router()
const { request } = require("express")
const Document = require("../models/Document")
const User = require("../models/User")
const { userExtractor } = require("../utils/middleware")
documentsRouter.get("/", async (req, res) => {
  const documents = await Document.find({})

  res.json(documents)
})

documentsRouter.get("/:id", async (req, res) => {
  const document = await Document.findById(request.params.id)

  if (document) {
    res.json(document)
  } else {
    res.status(404).end()
  }
})

documentsRouter.post("/", userExtractor, async (req, res) => {
  const { credentialType, purpose, customPurpose, copies, notes } = req.body

  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated or synced" })
  }

  const newDocument = new Document({
    user: req.user._id,
    credentialType,
    purpose,
    customPurpose: purpose === "Other" ? customPurpose : null,
    copies: copies || 1,
    notes,
    status: "Pending",
  })

  try {
    const savedDocument = await newDocument.save()

    await User.findByIdAndUpdate(req.user._id, {
      $push: { documents: savedDocument._id },
    })

    const populateDoc = await savedDocument.populate("user", {
      name: 1,
      studentNumber: 1,
    })

    res.status(201).json(populateDoc)
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create request", details: error.message })
  }
})

documentsRouter.get("/my-request", userExtractor, async (req, res) => {
  const documents = await Document.find({ user: req.user._id }).sort({
    createdAt: -1,
  })

  res.json(documents)
})

module.exports = documentsRouter
