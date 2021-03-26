const fs = require('fs')
const path = require('path')
const urlToFileName = require('../common/urlToFileName')
const isArray = require('../common/isArray')

module.exports = async urls => {
  const removerFile = fileName => new Promise(resolve =>
    fs.unlink(path.resolve(__dirname, `../../cached/${fileName}.html`), err => {
      if(err) {
        return resolve(null)
      }

      resolve(fileName)
      console.log(`Page with name: cached/${fileName}.html was successfully removed!`)
    })
  )

  if (isArray(urls)) {
    const removedList = []
    for (let index = 0; index < urls.length; index++) {
      const fileName = urlToFileName(urls[index])
      const result = await removerFile(fileName)
      removedList.push(result)
    }
    return { status: 'success', files: removedList }
  } else {
    const fileName = urlToFileName(urls)
    const result = await removerFile(fileName)
    return { status: 'success', files: [result] }
  }
}
