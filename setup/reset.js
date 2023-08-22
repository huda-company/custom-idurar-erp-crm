const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '..', '.variables.env') })

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises

async function deleteData() {
  const Admin = require('../models/erpModels/Admin')
  await Admin.remove()
  // eslint-disable-next-line no-console
  console.log(
    '👍👍👍👍👍👍👍👍 admin Deleted. To setup demo admin data, run\n\n\t npm run setup\n\n'
  )
  process.exit()
}

deleteData()
