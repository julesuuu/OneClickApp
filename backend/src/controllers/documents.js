const documentsRouter = require("express").Router()
const { request } = require("express")
const Document = require("../models/Document")
import { userExtractor } from "../utils/middleware"

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

module.exports = documentsRouter
