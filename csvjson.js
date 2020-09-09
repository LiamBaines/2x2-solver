const fs = require('fs');
const csvjson = require('csvjson');


var text = fs.readFileSync('solutions.csv','utf8')
let solutionsArray = csvjson.toArray(text);
let toAppend = JSON.stringify(solutionsArray)

async function addSolution(solutions) {
    return new Promise(resolve => {
        fs.appendFile('solutions.js', solutions, function (err) {
            resolve('Appended.');
          });
    });
}

addSolution(toAppend);