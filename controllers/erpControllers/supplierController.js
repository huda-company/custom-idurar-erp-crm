const mongoose = require('mongoose')
const Model = mongoose.model('Supplier')
const helpers = require('../../helpers')
const crudController = require('../corsControllers/crudController')
const methods = crudController.createCRUDController('Supplier')

delete methods.create

methods.create = async (req, res) => {
  try {
    let suppCode = (await helpers.firstLetterWord(req.body.company)).trim()

    const checkCompCode = await Model.find({ supplierCode: suppCode })
    if (checkCompCode.length > 0) {
      suppCode = `${suppCode}${helpers.formatNumberToNDigits(checkCompCode.length, 2)}`
    }

    const body = req.body
    body.supplierCode = suppCode

    // Creating a new document in the collection
    const result = await new Model(body).save()

    // Returning successfull response
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully Created the document in Model '
    })
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        error: err,
        message: 'Required fields are not supplied'
      })
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        error: err,
        message: 'Oops there is an Error on Supplier' + err
      })
    }
  }
}

module.exports = methods
