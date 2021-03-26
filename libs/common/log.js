const fs = require('fs')
const path = require('path')

module.exports = async (logName, content) => {
  fs.writeFile(path.resolve(__dirname, `../../logs/${logName}`), content, function(err) {
    if(err) {
      return console.log(err)
    }

    console.log(`Logs was saved to '${logName}' file!`)
  })
}
