const { step1Schema } = require('../middleware/validate')

async function registerStep1(request, response) {
  try {
    const validadteData = step1Schema.parse(request.body)
    response.status(201).json({message: 'Step 1 complete'})
  } catch (error) {
    if (error.name === 'ZodError') {
      return response.status(400).json({errors: 'error.errors'})
    }
    response.status(500).json({message: 'Server Error'})
  }
}