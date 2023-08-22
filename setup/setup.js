/* eslint-disable no-console */
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.variables.env') })

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises

async function createAdmin() {
  try {
    const Admin = require('../models/erpModels/Admin')
    const newAdmin = new Admin()
    const passwordHash = newAdmin.generateHash('admin123')

    await new Admin({
      email: 'admin@demo.com',
      password: passwordHash,
      name: 'Salah Eddine',
      surname: 'Lalami'
    }).save()
    console.log('👍👍👍👍👍👍👍👍 Admin created : Done!')
    process.exit()
  } catch (e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below')
    console.log(e)
    process.exit()
  }
}
createAdmin()
