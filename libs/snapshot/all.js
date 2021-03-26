const fs = require('fs')
const path = require('path')
const info = require('./info')
const fileNameToUrl = require('../common/fileNameToUrl')

const cachedPath = path.join(__dirname, '../../cached')

const run = ({ detail = false } = {}) =>
  new Promise(resolve => {
    fs.readdir(cachedPath, async (err, files = []) => {
      const filterFiles = files.filter(fileName => fileName.endsWith('.html'))

      if (detail) {
        const filesWithInfo = []
        for (let index = 0; index < filterFiles.length; index++) {
          const fileName = filterFiles[index]
          const fileInfo = await info(fileName)
          filesWithInfo.push({
            fileName,
            url: fileNameToUrl(fileName),
            lastUpdated: new Date(fileInfo.mtime).getTime()
          })
        }
        resolve(filesWithInfo)
      } else {
        resolve(filterFiles)
      }
    })
  })

if (process.argv[2] === 'run') run({ detail: true }).then(console.log)

module.exports = run
