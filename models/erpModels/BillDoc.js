const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const billSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false
  },
  bill: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bill',
    required: true,
    autopopulate: true
  },
  fileName: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
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
module.exports = mongoose.model('BillDoc', billSchema)
