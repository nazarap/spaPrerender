const fs = require('fs')
const path = require('path')
const parser = require('xml2json')
const linksmap = require('../common/linksmap')

const priority = path => {
  if (path.length === 1) return 1

  return 1 - (path.split('/').length - 1) / 10
}

const prepareList = (url, links) => ({
  urlset:
    { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
      url: links.map(link => ({
        loc: {
          $t: url + link
        },
        lastmod: {
          $t: new Date().toISOString()
        },
        priority: {
          $t: priority(link)
        }
      }))
    }
})

const run = async url => {
  const result = await linksmap(url)
  const json = prepareList(url, [...result])
  const stringified = JSON.stringify(json)
  const xml = parser.toXml(stringified)

  return new Promise(resolve => {
    fs.writeFile(path.resolve(__dirname, '../../sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`, err => {
      if (err) {
        resolve(err)
        return
      }
      resolve({ sitemap: '/sitemap.xml' })
    })
  })
}

if (process.argv[2] === 'run') {
  run('http://basketballzone.org').then(result => {
    console.log(result)
  })
}

module.exports = run
