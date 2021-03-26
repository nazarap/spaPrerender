const { render } = require('../../index')

// const regexp = /((href|src)="[\w\/\.\:\-]*")|(\?+php)|(\.+php)/gi
const regexp = /href="\/[\w\/]*"/gi

const run = async startLink => {
  const allPath = new Set(['/'])
  const result = {}

  for(let path of allPath) {
    if (result[path]) continue

    let pageHTML = await render(startLink + path)

    const findLinks = pageHTML.match(regexp);
    findLinks.forEach(path => allPath.add(path.slice(6, -1)))
    result[path] = true
  }

  return allPath
}

module.exports = run
