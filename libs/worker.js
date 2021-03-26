const prerender = require('../index')

const urls = process.argv.slice(2)

if (urls.length >= 1) {
  const cachedItems = urls.length === 1 ? urls[0] : urls
  prerender.cached(cachedItems)
} else {
  console.info('Prerender worker finished with code 1. Empty urls list')
}
