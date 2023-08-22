const { createItemSchema } = require('../validators/itemValidators')

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      const errorMessage = error.details[0].message
      //   return res.status(400).json({ error: errorMessage })
      return res.status(400).json({
        success: false,
        result: null,
        error: 'validation error',
        message: errorMessage
      })
    }

    next()
  }
}

module.exports = {
  validateCreateItem: validateRequest(createItemSchema)
}
