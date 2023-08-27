const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const billSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false
  },
  number: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  recurring: {
    type: String,
    default: '0'
  },
  date: {
    type: Date,
    required: true
  },
  expiredDate: {
    type: Date,
    required: true
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    required: true,
    autopopulate: true
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: true,
        autopopulate: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    }
  ],
  ppnIncluded: {
    type: Boolean,
    default: false
  },
  billingCode: {
    type: String
  },
  poNo: {
    type: String
  },
  taxRate: {
    type: Number,
    default: 0
  },
  subTotal: {
    type: Number,
    default: 0
  },
  taxTotal: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  credit: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  paymentBill: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'PaymentBill'
    }
  ],
  paymentStatus: {
    type: String,
    default: 'unpaid'
  },
  note: {
    type: String
  },
  status: {
    type: String,
    default: 'draft'
  },
  pdfPath: {
    type: String,
    default: ''
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
})

billSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Bill', billSchema)
