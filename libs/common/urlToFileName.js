const parseURL = require('./parseURL')

module.exports = url => {
  const { pathname } = parseURL(url)
  let fileName = pathname.replace(/^[\s\\/\xA0]+|[\s\\/\xA0]+$/g, '').replace(/\//g, '__')
  if (!fileName) (fileName = 'main')

  return fileName
}
