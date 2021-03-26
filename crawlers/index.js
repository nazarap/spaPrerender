const fs = require('fs');
const crawlersMap = require('./crawlersMap.json');

const crawlers = crawlersMap.reduce((a, crowler) => ([...a, ...crowler.instances]), []);

fs.writeFile('./crawlers/crawlers.json', JSON.stringify(crawlers), err => {
  if(err) {
    return console.log(err);
  }
  console.log("Success!");
});
