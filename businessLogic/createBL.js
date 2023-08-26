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

    case 'Supplier': {
      respBL.success = true
      break
    }

    case 'Role': {
      respBL.success = true
      break
    }

    case 'Client': {
      respBL.success = true
      break
    }

    case 'ItemCategory': {
      respBL.success = true
      break
    }

    case 'Employee': {
      respBL.success = true
      break
    }

    case 'Branch': {
      respBL.success = true
      break
    }

    default:
      break
  }

  return respBL
}
