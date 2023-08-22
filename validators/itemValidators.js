const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const createItemSchema = Joi.object({
  categoryId: Joi.objectId(),
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().greater(0)
})

module.exports = {
  createItemSchema
}
