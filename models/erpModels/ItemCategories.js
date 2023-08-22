const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const itemCategoriesSchema = new mongoose.Schema({
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
  description: {
    type: String,
    trim: true
  }
})

module.exports = mongoose.model('ItemCategories', itemCategoriesSchema)
