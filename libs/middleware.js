const path = require('path')
const prerender = require('../index')
const urlToFileName = require('./common/urlToFileName')
const crawlers = require('../crawlers/crawlers')
const { fork } = require('child_process')

module.exports = (req, res, next) => {
  if (crawlers.includes(req.headers['user-agent'])) {
    const url = 'http://' + req.headers.host + req.url
    const fullPath = path.join(path.resolve(__dirname, `../cached/${urlToFileName(url)}.html`))

    res.sendFile(fullPath, {}, async err => {
      if (err) {
        fork(path.resolve(__dirname, './worker.js'), [ url ])

        const html = await prerender.render(url)

        res.set('Content-Type', 'text/html')
        res.send(html)
      }
    })
    return
  }
  next()
}
