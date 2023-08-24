/* eslint-disable no-console */
const mongoose = require('mongoose')
const Model = mongoose.model('PaymentBill')
const Bill = mongoose.model('Bill')
const custom = require('../corsControllers/custom')

const crudController = require('../corsControllers/crudController')
const methods = crudController.createCRUDController('PaymentBill')

delete methods.create
delete methods.update
delete methods.delete

methods.create = async (req, res) => {
  try {
    const currentBill = await Bill.findOne({
      _id: req.body.bill,
      removed: false
    })

    if (!currentBill) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'unknown bill'
      })
    }

    const { total: previousTotal, discount: previousDiscount, credit: previousCredit } = currentBill

    const maxAmount = previousTotal - previousDiscount - previousCredit

    if (req.body.amount > maxAmount) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Max Amount you can add is ${maxAmount}`
      })
    }

    const result = await Model.create(req.body)

    const fileId = 'payment-bill-report-' + result._id + '.pdf'
    const updatePath = Model.findOneAndUpdate(
      { _id: result._id.toString(), removed: false },
      { pdfPath: fileId },
      {
        new: true
      }
    ).exec()
    // Returning successfull response

    const { _id: pbId, amount } = result
    const { total, discount, credit } = result.bill
    console.log('🚀 ~ file: paymentBillController.js ~ line 63 ~ methods.create= ~ total', total)

    const paymentStatus =
      total - discount === credit + amount ? 'paid' : credit + amount > 0 ? 'partially' : 'unpaid'

    const billUpdate = Bill.findOneAndUpdate(
      { _id: req.body.bill },
      {
        $push: { paymentBill: pbId },
        $inc: { credit: amount },
        $set: { paymentStatus }
      },
      {
        new: true, // return the new result instead of the old one
        runValidators: true
      }
    ).exec()

    custom.generatePdf('PaymentBill', { filename: 'payment-bill-report', format: 'A4' }, result)

    const [updatedResult] = await Promise.all([updatePath, billUpdate])
    res.status(200).json({
      success: true,
      result: updatedResult,
      message: 'Successfully Created the document in Model '
    })
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        result: null,
        message: 'Required fields are not supplied',
        error: err
      })
    } else {
      // Server Error
      res.status(500).json({
        success: false,
        result: null,
        message: 'Oops there is an Error' + err,
        error: err
      })
    }
  }
}

methods.update = async (req, res) => {
  try {
    // Find paymentBill by id and updates with the required fields
    const previousPayment = await Model.findOne({
      _id: req.params.id,
      removed: false
    })

    if (!previousPayment) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'unknown payment bill'
      })
    }

    const { amount: previousAmount } = previousPayment
    const { total, discount, credit: previousCredit } = previousPayment.bill

    const { amount: currentAmount } = req.body

    const changedAmount = currentAmount - previousAmount
    const maxAmount = total - discount - previousCredit

    if (changedAmount > maxAmount) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Max Amount you can add is ${maxAmount + previousAmount}`,
        error: `The Max Amount you can add is ${maxAmount + previousAmount}`
      })
    }

    const paymentStatus =
      total - discount === previousCredit + changedAmount
        ? 'paid'
        : previousCredit + changedAmount > 0
        ? 'partially'
        : 'unpaid'

    const updatedDate = new Date()
    const updates = {
      number: req.body.number,
      date: req.body.date,
      amount: req.body.amount,
      paymentMode: req.body.paymentMode,
      ref: req.body.ref,
      description: req.body.description,
      updated: updatedDate
    }

    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, removed: false },
      { $set: updates },
      {
        new: true // return the new result instead of the old one
      }
    ).exec()

    await Bill.findOneAndUpdate(
      { _id: req.body.bill },
      {
        $inc: { credit: changedAmount },
        $set: {
          paymentStatus
        }
      },
      {
        new: true // return the new result instead of the old one
      }
    ).exec()

    custom.generatePdf('PaymentBill', { filename: 'payment-bill-report', format: 'A4' }, result)

    res.status(200).json({
      success: true,
      result,
      message: 'Successfully updated the Payment '
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    // If err is thrown by Mongoose due to required validations
    if (err.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        result: null,
        message: 'Required fields are not supplied',
        error: err
      })
    } else {
      // Server Error
      res.status(500).json({
        success: false,
        result: null,
        message: 'Oops there is an Error' + err,
        error: err
      })
    }
  }
}

methods.delete = async (req, res) => {
  try {
    // Find document by id and updates with the required fields
    const previousPayment = await Model.findOne({
      _id: req.params.id,
      removed: false
    })

    if (!previousPayment) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found by this id: ' + req.params.id
      })
    }

    const { _id: pbId, amount: previousAmount } = previousPayment
    const { id: invoiceId, total, discount, credit: previousCredit } = previousPayment.bill

    // Find the document by id and delete it
    const updates = {
      removed: true
    }
    // Find the document by id and delete it
    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, removed: false },
      { $set: updates },
      {
        new: true // return the new result instead of the old one
      }
    ).exec()
    // If no results found, return document not found

    const paymentStatus =
      total - discount === previousCredit - previousAmount
        ? 'paid'
        : previousCredit - previousAmount > 0
        ? 'partially'
        : 'unpaid'

    await Bill.findOneAndUpdate(
      { _id: invoiceId },
      {
        $pull: {
          paymentBill: pbId
        },
        $inc: { credit: -previousAmount },
        $set: {
          paymentStatus
        }
      },
      {
        new: true // return the new result instead of the old one
      }
    ).exec()

    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully Deleted the document by id: ' + req.params.id
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Oops there is an Error',
      error: err
    })
  }
}

module.exports = methods
