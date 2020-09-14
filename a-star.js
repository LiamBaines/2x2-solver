const cube = require('./scripts/cube.js');
const solutions = require ('./scripts/solutions.js')

class Node {
    constructor(name, distance, previousNode, routeTaken, heuristic) {
        this.name = name;
        this.distance = distance;
        this.previousNode = previousNode;
        this.routeTaken = routeTaken
        this.heuristic = heuristic
    }
};

function solve(state) {
    cube.state = state;
    let solved = false;
    let staticSolution = '';
    let queue = [];
    eval('var ' + cube.uniqueState  + ' = new Node("' + cube.uniqueState + '", ' + 0 + ', "N/A", "", ' + 40000000 + ')');
    queue.push(eval(cube.uniqueState))
    let turns = ['U', 'u', 'R', 'r', 'F', 'f']
    function extend(node) {
        let origin = node;
        let newFirstItem = false;
        for (x = 0; x < 6; x++) {
            cube.state = 'A'.concat(origin.name);
            cube.turn(turns[x])
            if (!queue.some(element => element.name === cube.uniqueState)) {
                let heuristic = -2
                for (let i = 0; i < 3674160; i ++) {
                    if (solutions[i][0] == cube.uniqueState) {
                        heuristic = i;
                        break;
                    }
                }
                eval('var ' + cube.uniqueState  + ' = new Node("' + cube.uniqueState + '", ' + (origin.distance + 1) + ', "' + origin.name + '", "' + origin.routeTaken.concat(turns[x]) + '", ' + heuristic + ')');
                let insertNode = eval(cube.uniqueState)
                if (insertNode.name == 'BCDEFGH') {
                    staticSolution = insertNode.routeTaken
                    solved = true;
                    break;
                }
                n = queue.length.valueOf();
                 for (y = 0; y < n; y++) {
                    let checkNode = queue[y]
                    if (insertNode.heuristic < checkNode.heuristic) {
                        queue.splice(y, 0, insertNode);
                        newFirstItem = true;
                        break;
                     } else if (y == n - 1) {
                         queue.push(insertNode);
                     }
                 }
            }
        }
        if (!newFirstItem) {queue.shift()}
    }
    while (!solved) {
    //for (z = 0; z < 100; z++) {
        extend(queue[0])
    }
    console.log(queue.length)
    return cube.getDynamicSolution(state, staticSolution)
}

console.log(solve('TOECXRVI'))
