/* eslint-disable no-console */
/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/
const moment = require('moment')
const momentTZ = require('moment-timezone') // Import Moment.js with timezone support

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs')
const mongoose = require('mongoose')

// const getData = require('./controllers/corsControllers/custom').getData

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment')

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

// Making a static map is really long - this is a handy helper function to make one

// inserting an SVG
exports.icon = (name) => {
  try {
    return fs.readFileSync(`./public/images/icons/${name}.svg`)
  } catch (error) {
    return null
  }
}
exports.image = (name) => fs.readFileSync(`./public/images/photos/${name}.jpg`)

exports.adminPhotoUrl = (admin) => {
  if (admin) {
    return admin.photo ? '/' + admin.photo : '/images/photos/profile.jpg'
  } else {
    return '/images/photos/profile.jpg'
  }
}

// Some details about the site
exports.siteName = 'Express.js / MongoBD / Rest Api'

exports.timeRange = (start, end, format, interval) => {
  if (format === undefined) {
    format = 'HH:mm'
  }

  if (interval === undefined) {
    interval = 60
  }
  interval = interval > 0 ? interval : 60

  const range = []
  while (moment(start).isBefore(moment(end))) {
    range.push(moment(start).format(format))
    start = moment(start).add(interval, 'minutes')
  }
  return range
}

exports.settingCommercial = async (name) => {
  try {
    const Model = mongoose.model('SettingCommercial')
    const result = await Model.findOne({ name })
    if (result) {
      return await result.value
    }
    return null
  } catch (err) {
    console.log('setting fetch failed', err)
  }
}

exports.settingGlobal = async (name) => {
  try {
    const Model = mongoose.model('SettingGlobal')
    const result = await Model.findOne({ name })
    if (result) {
      return await result.value
    }
    return null
  } catch (err) {
    console.log('setting fetch failed', err)
  }
}

exports.settingMedical = async (name) => {
  try {
    const Model = mongoose.model('SettingMedical')
    const result = await Model.findOne({ name })
    if (result) {
      return await result.value
    }
    return null
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('setting fetch failed', err)
  }
}

exports.bulkCheckByIds = async (ModelName, arrObJids) => {
  try {
    const Model = mongoose.model(ModelName)
    const foundItems = await Model.find({ _id: { $in: arrObJids } })

    if (foundItems) {
      return foundItems
    }

    return null
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('bulkCheckByIds failed', err)
  }
}

exports.firstLetterWord = async (str) => {
  let result = ''

  // Traverse the string.
  let v = true
  for (let i = 0; i < str.length; i++) {
    // If it is space, set v as true.
    if (str[i] === ' ') {
      v = true
    }

    // Else check if v is true or not.
    // If true, copy character in output
    // string and set v as false.
    else if (str[i] !== ' ' && v === true) {
      result += str[i]
      v = false
    }
  }
  return result
}

exports.formatNumberToNDigits = (num, n) => {
  return num.toString().padStart(n, '0')
}

exports.intToRoman = (num) => {
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ]

  let result = ''

  for (const numeral of romanNumerals) {
    while (num >= numeral.value) {
      result += numeral.symbol
      num -= numeral.value
    }
  }

  return result
}

exports.generatePoNumber = async (suppId) => {
  let poNo = ''

  const currentDateInTimezone = momentTZ().tz(process.env.TimeZone)
  const monthInRoman = this.intToRoman(currentDateInTimezone.format('MM'))
  const year = currentDateInTimezone.format('YYYY')

  const SupplierModel = mongoose.model('Supplier')
  const supplier = await SupplierModel.findOne({ _id: suppId, removed: false })

  const searchTerm = `ATM\\/${supplier.supplierCode}\\/${monthInRoman}\\/${year}`

  const regexTerm = new RegExp(searchTerm)

  const BillModel = mongoose.model('Bill')
  const checkTotalRow = await BillModel.countDocuments({ poNo: { $regex: regexTerm } })

  poNo = `${checkTotalRow + 1}/ATM/${supplier.supplierCode}/${monthInRoman}/${year}`
  return poNo
}

/* eslint-disable */
// const settingCommercial = () => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			resolve(getData('SettingCommercial'));
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

// const settingGlobal = () => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			resolve(getData('SettingGlobal'));
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

// const settingMedical = () => {
// 	return new Promise( (resolve, reject) => {
// 		try {
// 			resolve(getData('SettingMedical'));
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

/**
 * Medical` settings
 */
// module.exports.settings = async (callback) => {
// 	var settings = {}

// 	await settingCommercial().then(function (data) {
// 		settings['commercial'] = data;
// 	});

// 	await settingGlobal().then(function (data) {
// 		settings['global'] = data;
// 	});

// 	await settingMedical().then(function (data) {
// 		settings['medical'] = data;
// 	});

// 	callback(settings);
// }
