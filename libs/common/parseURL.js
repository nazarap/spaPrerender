const url = require('url')

module.exports = adr => {

  return url.parse(adr, true);

}
