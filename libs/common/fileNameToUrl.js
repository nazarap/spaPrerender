module.exports = fileName => {
  fileName = fileName.replace('.html', '')
  if (fileName === 'main') return '/'

  return `/${fileName.replace(/__/g, '/')}`
}
