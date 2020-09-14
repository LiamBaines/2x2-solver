fs = require('fs')

fs.appendFile('./scripts/solutions.js', '\nmodule.exports = solutions', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });