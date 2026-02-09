const { step1Schema } = require('./middleware/validate')

try {
  const data = { username: 'test', email: 'bad', password: 'short' }
  step1Schema.parse(data)
} catch (e) {
  console.log(e.errors)
}