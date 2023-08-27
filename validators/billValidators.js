const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Define the validation schema
const itemSchema = Joi.object({
  itemId: Joi.string().required(),
  price: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
  total: Joi.number().positive().required()
})

const createBillSchema = Joi.object({
  supplier: Joi.objectId(),
  number: Joi.number().greater(0),
  year: Joi.number().integer().min(2023).required(),
  date: Joi.date().required(),
  expiredDate: Joi.date().required(),
  items: Joi.array().items(itemSchema).min(1).required(),
  status: Joi.string(),
  note: Joi.string(),
  taxRate: Joi.string(),
  billingCode: Joi.string(),
  ppnIncluded: Joi.bool(),
  discount: Joi.number().positive()
})

module.exports = {
  createBillSchema
}
