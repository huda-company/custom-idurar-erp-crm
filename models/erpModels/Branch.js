const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const itemSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false
  },
  enabled: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  }
})

module.exports = mongoose.model('Branch', itemSchema)
