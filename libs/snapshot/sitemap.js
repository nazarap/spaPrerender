const { cached, render } = require('../../index')
const urlToFileName = require('../common/urlToFileName')
const log = require('../common/log')
const ACTION_TYPES = require('./ACTION_TYPES')
const fileInfo = require('./info')
const dateDiff = require('../common/dateDiff')

const regexp = /href="\/[\w\/]*"/gi

const run = async (startLink, { lastUpdatedWas = 0 } = {}) => {
  const allPath = new Set(['/'])
  const result = {}

  for(let path of allPath) {
    if (result[path]) return

    let action = ACTION_TYPES.IGNORED
    const info = await fileInfo(urlToFileName(path) + '.html')
    if (info) {
      const snapWasUpdatesInDays = dateDiff(new Date(info.mtime), new Date())
      action = (snapWasUpdatesInDays >= lastUpdatedWas) ? ACTION_TYPES.UPDATED : ACTION_TYPES.IGNORED
    } else {
      action = ACTION_TYPES.CREATED
    }

    let pageHTML = null
    let date = null

    if (action === ACTION_TYPES.IGNORED) {
      pageHTML = await render(startLink + path)
      date = new Date(info.mtime).getTime()
    } else {
      pageHTML = await cached(startLink + path)
      date = new Date().getTime()
    }

    result[path] = { action, date }

    const findLinks = pageHTML.match(regexp);
    findLinks.forEach(path => allPath.add(path.slice(6, -1)))
  }

  return result
}

if (process.argv[2] === 'run') {
  run('http://basketballzone.org').then(result => {
    log('fullSaved.json', JSON.stringify(result))
    console.log('Website tree snapshots were updated!')
  })
}

module.exports = run
