const fs = require('fs')
const parser = require('xml2json')

const run = () => {
  return new Promise(resolve => {
    fs.readFile( '../client/sitemap.xml', function(err, data) {
      const json = JSON.parse(parser.toJson(data, {reversible: true}));

      resolve(JSON.stringify(json))
    });
  })
}


if (process.argv[2] === 'run') {
  run().then(result => {
    console.log(result)
  })
}

module.exports = run
