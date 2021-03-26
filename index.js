const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const urlToFileName = require('./libs/common/urlToFileName')
const isArray = require('./libs/common/isArray')
// const all = require('./libs/snapshot/all')
// const sitemap = require('./libs/snapshot/sitemap')

const render = async urls => {
  let result = null

  const renderPage = async url => {
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    const html = await page.content()
    return html.replace(/<script[=\ \"\w\/\.\:\-]*><\/script>/gi, '')
  }

  const browser = await puppeteer.launch({
    // executablePath: path.resolve(__dirname, './chromium/chrome-win/chrome.exe'),
    headless: true })

  if (isArray(urls)) {
    result = []
    for (let index = 0; index < urls.length; index++) {
      result.push(await renderPage(urls[index]))
    }
  } else {
    result = await renderPage(urls)
  }
  await browser.close()

  return result
}

const cached = async urls => {
  const results = await render(urls)

  const writeFile = (fileName, html) => {
    fs.writeFile(path.resolve(__dirname, `./cached/${fileName}.html`), html, err => {
      if(err) {
        return console.log(err)
      }

      console.log(`Page with name: cached/${fileName}.html was successfully cached!`)
    })
  }

  if (isArray(urls)) {
    urls.forEach((url, index) => {
      const fileName = urlToFileName(url)
      writeFile(fileName, results[index])
    })
  } else {
    const fileName = urlToFileName(urls)
    writeFile(fileName, results)
  }

  return results
}

module.exports.render = render
module.exports.cached = cached
// module.exports.sitemap = sitemap
// module.exports.all = all
