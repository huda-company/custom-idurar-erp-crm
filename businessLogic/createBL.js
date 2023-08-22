const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.createBL = async (Model, req) => {
  const modelName = Model.modelName
  const respBL = {
    success: false,
    msg: ''
  }

  switch (modelName) {
    case 'Item': {
      const Model = mongoose.model('ItemCategories')
      const result = await Model.findOne({
        _id: new ObjectId(req.body.categoryId),
        removed: false
      })

      if (result) {
        respBL.success = true
      } else {
        respBL.msg = 'item category not found'
      }
      break
    }

    default:
      break
  }

  return respBL
}
