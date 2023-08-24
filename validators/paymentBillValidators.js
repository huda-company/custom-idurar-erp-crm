const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const createPaymentBillSchema = Joi.object({
  bill: Joi.objectId(),
  number: Joi.number().greater(0),
  date: Joi.date().required(),
  amount: Joi.number().positive().greater(0),
  paymentMode: Joi.objectId(),
  ref: Joi.string(),
  description: Joi.string()
})

module.exports = {
  createPaymentBillSchema
}
