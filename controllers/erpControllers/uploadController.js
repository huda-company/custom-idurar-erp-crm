/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express')
const router = express.Router()

exports.uploadsView = async (req, res, next) => {
  // res.render("upload", { title: "Upload" });
  res.status(200).json({ api: ' uploadForm' })
}

exports.upload = async (req, res, next) => {
  console.warn(req)
  // eslint-disable-next-line no-undef
  upload.single('imageupload')
  res.send('File upload sucessfully.')
}
