const fs = require('fs')
const path = require('path')

module.exports = fileName => new Promise(resolve =>
  fs.stat(path.resolve(__dirname, `../../cached/${fileName}`), (err, stat) => resolve(stat || null)))

