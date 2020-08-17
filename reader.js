//Go to line 54, input the colours on your cube, then run reader.js to get your solution!

const parse = require('csv-parse');
const fs = require('fs');
const csvjson = require('csvjson');
const csvFile = 'solutions.csv';
const cube = require('./cube.js');
 
var text = fs.readFileSync(csvFile,'utf8')
let solutionsArray = csvjson.toArray(text);

function getSolution(cubestate) {
    for (i = 0, n = solutionsArray.length; i < n; i++) {
        if (solutionsArray[i][0] === cubestate) {
            return solutionsArray[i][1]
        }
    }
};

function includesString(string) {
    return (text.includes(string));
}

function getDynamicSolution(state) {
    cube.state = state;
    let staticSolution = getSolution(cube.uniqueState);
    cube.state = state;
    let dynamicSolution = '';
    for (y = 0; y < staticSolution.length; y++) {
        let f = cube.facingAndRotation[0];
        let r = cube.facingAndRotation[1];
        let turnArray = ['U', 'u', 'D', 'd', 'L', 'l', 'R', 'r', 'F', 'f', 'B', 'b'];
        let adaptedTurnArray = [];
        switch (f) {
            case -3: adaptedTurnArray = ['B', 'b', 'F', 'f', 'L', 'l', 'R', 'r', 'U', 'u', 'D', 'd']; break;
            case -2: adaptedTurnArray = ['R', 'r', 'L', 'l', 'U', 'u', 'D', 'd', 'F', 'f', 'B', 'b']; break;
            case -1: adaptedTurnArray = ['D', 'd', 'U', 'u', 'L', 'l', 'R', 'r', 'B', 'b', 'F', 'f']; break;
            case  1: adaptedTurnArray = ['U', 'u', 'D', 'd', 'L', 'l', 'R', 'r', 'F', 'f', 'B', 'b']; break;
            case  2: adaptedTurnArray = ['L', 'l', 'R', 'r', 'D', 'd', 'U', 'u', 'F', 'f', 'B', 'b']; break;
            case  3: adaptedTurnArray = ['F', 'f', 'B', 'b', 'L', 'l', 'R', 'r', 'D', 'd', 'U', 'u']; break;
        };
        let rotationArray = [0, 1, 2, 3, 8, 9, 10, 11, 6, 7, 4, 5];
        for (j = 0; j < r; j ++) {
            adaptedTurnArray = adaptedTurnArray.map(turn => {
                return adaptedTurnArray[rotationArray[adaptedTurnArray.indexOf(turn)]];
            })
        };
        dynamicSolution = dynamicSolution.concat(adaptedTurnArray[turnArray.indexOf(staticSolution[y])]);
        cube.turn(adaptedTurnArray[turnArray.indexOf(staticSolution[y])]);
    };
    return dynamicSolution;   
};

cube.inputState('BRY BWO OBY RWB GWR YRG OWG YGO');
console.log(getDynamicSolution(cube.state));