const app = require('./app')
const config = require('./utils/config')

module.exports = app

if (process.env.NODE_ENV !== 'production') {
  app.listen(config.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${config.PORT}`)
  })
}
