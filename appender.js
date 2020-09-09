const fs = require('fs');
const cube = require('./cube.js');
const csvjson = require('csvjson');

let seen = new Set();

async function addSolution(solutions) {
    return new Promise(resolve => {
        fs.appendFile('solutions.csv', solutions, function (err) {
            resolve('Appended.');
          });
    });
}

async function getStartingPointsAndSolutions(iii, n) {
    return new Promise(resolve => {
        fs.readFile('solutions.csv', 'utf8', function(err, data){ 
            let csvArray = csvjson.toArray(data);
            let returnArray = [];
            for (i = 0; i < n; i++) {
                seen.add(csvArray[iii + i][0])
                returnArray.push(csvArray[iii + i])
            };
            resolve(returnArray); 
        });
    });
}

const turns = ['D', 'd', 'R', 'r', 'B', 'b'];

async function addMultiple(n) {
    let addedThisRound = 0;
    for (iii = 0; iii < n; iii+=batchSize) {
        let solutionsToAdd = '';
        let startingPointsAndSolutions = await getStartingPointsAndSolutions(iii, batchSize);
        for (g = 0; g < batchSize; g ++) {
            let startingPoint = startingPointsAndSolutions[g][0];
            let startingSolution = startingPointsAndSolutions[g][1];
            for (aye = 0; aye < 6; aye++) {
                cube.state = 'A'.concat(startingPoint);
                cube.solution = startingSolution;
                cube.turn(turns[aye]);
                let stateToAdd = cube.uniqueState;
                let solutionToAdd = cube.solution;
                if (!seen.has(stateToAdd)) {
                    solutionsToAdd = solutionsToAdd.concat(`${stateToAdd}, ${solutionToAdd}\n`);
                    seen.add(stateToAdd);
                };
            };
        };
        await addSolution(solutionsToAdd);
        batchSize++;
    }
}

