const mongoose = require('mongoose')
const BillModel = mongoose.model('Bill')
const Model = mongoose.model('BillDoc')
const custom = require('../corsControllers/custom')
const sendMail = require('./mailInvoiceController')
const crudController = require('../corsControllers/crudController')
const methods = crudController.createCRUDController('BillDoc')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

delete methods.create
delete methods.update
delete methods.filter

methods.create = async (req, res) => {
  const validateBill = Joi.objectId().validate(req.body.bill)
  if (!validateBill.value) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'bill not valid'
    })
  }

  const checkBill = await BillModel.find({ _id: req.body.bill })
  if (!checkBill) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'bill not found'
    })
  }

  try {
    const body = req.body
    body.fileName = req.file.filename

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
        message: 'Oops there is an Error'
      })
    }
  }
}

methods.update = async (req, res) => {
  try {
    const previousInvoice = await Model.findOne({
      _id: req.params.id,
      removed: false
    })

    const { credit } = previousInvoice

    const { items = [], taxRate = 0, discount = 0 } = req.body

    // default
    let subTotal = 0
    let taxTotal = 0
    let total = 0

    // Calculate the items array with subTotal, total, taxTotal
    items.forEach((item) => {
      const total = item.quantity * item.price
      // sub total
      subTotal += total
      // item total
      item.total = total
    })
    taxTotal = subTotal * taxRate
    total = subTotal + taxTotal

    const body = req.body

    body.subTotal = subTotal
    body.taxTotal = taxTotal
    body.total = total
    body.items = items
    body.pdfPath = 'Bill-' + req.params.id + '.pdf'
    // Find document by id and updates with the required fields

    const paymentStatus = total - discount === credit ? 'paid' : credit > 0 ? 'partially' : 'unpaid'
    body.paymentStatus = paymentStatus

    const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
      new: true // return the new result instead of the old one
    }).exec()

    // Returning successfull response

    custom.generatePdf('Bill', { filename: 'bill', format: 'A4' }, result)
    return res.status(200).json({
      success: true,
      result,
      message: 'we update this document by this id: ' + req.params.id
    })
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    // eslint-disable-next-line no-console
    console.log(err)
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
        message: 'Oops there is an Error'
      })
    }
  }
}

methods.filter = async (req, res) => {
  if (req.query.q === undefined || req.query.q.trim() === '') {
    return res
      .status(202)
      .json({
        success: false,
        result: [],
        message: 'No document found by this request'
      })
      .end()
  }
  const fieldsArray = req.query.fields
    ? req.query.fields.split(',')
    : ['name', 'surname', 'birthday']

  const fields = { $or: [] }

  for (const field of fieldsArray) {
    fields.$or.push({ [field]: { $regex: new RegExp(req.query.q, 'i') } })
  }

  try {
    const results = await Model.find(fields).where('removed', false).limit(10)

    if (results.length >= 1) {
      return res.status(200).json({
        success: true,
        result: results,
        message: 'Successfully found all documents'
      })
    } else {
      return res
        .status(202)
        .json({
          success: false,
          result: [],
          message: 'No document found by this request'
        })
        .end()
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: `Oops there is an Error, ${err}`,
      error: err
    })
  }
}

// methods.update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     var { items = [], taxRate = 0, discount = 0 } = req.body;

//     // default
//     var subTotal = 0;
//     var taxTotal = 0;
//     var total = 0;
//     var credit = 0;

//     //Calculate the items array with subTotal, total, taxTotal
//     items = items.map((item) => {
//       let total = item["quantity"] * item["price"];
//       //sub total
//       subTotal += total;
//       //item total
//       item["total"] = total;
//       return item;
//     });

//     taxTotal = subTotal * taxRate;
//     total = subTotal + taxTotal;

//     let body = req.body;

//     body["subTotal"] = subTotal;
//     body["taxTotal"] = taxTotal;
//     body["total"] = total;

//     //Calculate credited amount
//     const findById = await Model.findById(id).populate("paymentInvoice");
//     if (findById["paymentInvoice"].length > 0) {
//       findById["paymentInvoice"].map((payment) => {
//         credit += payment.amount;
//       });
//     }

//     body["credit"] = credit;

//     //Calculate payment status
//     if (total - discount - credit <= 0) {
//       body["paymentStatus"] = "paid";
//     }
//     // Find document by id and updates with the required fields
//     const result = await Model.findOneAndUpdate({ _id: id }, body, {
//       new: true,
//     })
//       .populate("client")
//       .exec();

//     await custom.generatePdf(
//       "Invoice",
//       { filename: "Invoice report", format: "A5" },
//       result,
//       function (callback) {
//         if (callback.hasOwnProperty("success") && callback.success) {
//           let { data } = callback;

//           // Returning successfull response
//           res.status(200).json({
//             success: true,
//             data: data,
//             message: "Successfully updated the Invoice in Model",
//           });
//         } else {
//           // Server Error
//           return res.status(500).json({
//             success: false,
//             result: null,
//             message: "Oops there is an Error",
//           });
//         }
//       }
//     );
//   } catch (err) {
//     // If err is thrown by Mongoose due to required validations send error message
//     if (err.name == "ValidationError") {
//       return res.status(400).json({
//         success: false,
//         result: null,
//         message: "Required fields are not supplied",
//       });
//     } else {
//       // Server Error
//       return res.status(500).json({
//         success: false,
//         result: null,
//         message: "Oops there is an Error",
//       });
//     }
//   }
// };

methods.sendMail = sendMail
module.exports = methods
