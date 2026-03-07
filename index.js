const path = require('path')
const Module = require('module')
const express = require('express')

const originalResolve = Module._resolveFilename
Module._resolveFilename = function(request, parent, isMain, options) {
  try {
    return originalResolve(request, parent, isMain, options)
  } catch (e) {
    return originalResolve(request, parent, isMain, {
      ...options,
      paths: [path.join(__dirname, 'backend', 'src', 'node_modules'), ...(options?.paths || [])]
    })
  }
}

process.chdir(path.join(__dirname, 'backend', 'src'))

const app = require('./app')

app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
})

module.exports = app
