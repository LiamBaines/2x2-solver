const cube = {
    state: 'ABCDEFGH',
    cache: '',
    solution: '',
    activePlane: '',
    activeFulcrum: 0,
    activeBlock: {
        name: '',
        numID: 0,
        ori: 0,
        perm: 0,
        update() {
            for (k = 0; k < 3; k ++) {
                if (cube.blocks[k].includes(cube.activeBlock.name)) {
                    cube.activeBlock.numID = cube.blocks[k].indexOf(cube.activeBlock.name);
                    cube.activeBlock.ori = cube.state.indexOf(cube.activeBlock.name);
                    cube.activeBlock.perm = k;
                }
            }    
        }
    },
    planes: {
        R: [3, 2, 6, 7],
        L: [0, 4, 5, 1],
        U: [0, 1, 2, 3],
        D: [4, 7, 6, 5],
        F: [0, 3, 7, 4],
        B: [1, 5, 6, 2]
    },
    blocks: [
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
                ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
                ['@', '&', '(', ')', '£', '+', '?', '#'],
                ['WRG', 'WGO', 'WOB', 'WBR', 'YGR', 'YOG', 'YBO', 'YRB']
            ],
    get colourState() {
        let returnString = '';
        for (i = 0; i < 8; i++) {
            cube.activeBlock.name = cube.state.charAt(i);
            cube.activeBlock.update(); 
            let orderArray = [];
            let z = (1+((cube.activeBlock.perm+cube.activeBlock.ori%2)*Math.sign(cube.activeBlock.perm))%2+Math.sign(cube.activeBlock.perm))*(1-2*(Math.floor(cube.activeBlock.ori/4)));
            orderArray.push((4-(2-Math.sign(z)+(z-1)%3))%3);
            orderArray.push((3+orderArray[0]+Math.sign(z))%3);
            orderArray.push((3+orderArray[1]+Math.sign(z))%3);
            for (j = 0; j < 3; j ++) {
                returnString = returnString.concat(cube.blocks[3][cube.activeBlock.numID].charAt(orderArray[j]));     
            }
            returnString = returnString.concat(' ');        
        }
        return returnString;
    },
    turns: {
        R: {
            plane: 'R',
            Oshift: -1,
            fulcrum: 1
        },
        r: {
            plane: 'R',
            Oshift: 1,
            fulcrum: 1
        },
        L: {
            plane: 'L',
            Oshift: -1,
            fulcrum: 1
        },
        l: {
            plane: 'L',
            Oshift: 1,
            fulcrum: 1
        },
        U: {
            plane: 'U',
            Oshift: -1,
            fulcrum: 0
        },
        u: {
            plane: 'U',
            Oshift: 1,
            fulcrum: 0
        },
        D: {
            plane: 'D',
            Oshift: -1,
            fulcrum: 0
        },
        d: {
            plane: 'D',
            Oshift: 1,
            fulcrum: 0
        },
        F: {
            plane: 'F',
            Oshift: -1,
            fulcrum: 2
        },
        f: {
            plane: 'F',
            Oshift: 1,
            fulcrum: 2
        },
        B: {
            plane: 'B',
            Oshift: -1,
            fulcrum: 2
        },
        b: {
            plane: 'B',
            Oshift: 1,
            fulcrum: 2
        },
    },
    permute(blockToPermute) {
        cube.activeBlock.name = blockToPermute;
        cube.activeBlock.update();
        if (cube.activeBlock.perm !== cube.activeFulcrum) {
            return cube.blocks[3 - cube.activeBlock.perm - cube.activeFulcrum][cube.activeBlock.numID];
        } else {
            return blockToPermute;
        }
    },
    turn (sequence) {
        for (i = 0; i < sequence.length; i ++) {
            cube.solution = ((sequence[i] === sequence[i].toUpperCase()) ? sequence[i].toLowerCase() : sequence[i].toUpperCase()).concat(cube.solution);
            cube.cache = cube.state.valueOf();
            cube.activePlane = cube.turns[sequence[i]].plane;
            cube.activeFulcrum = cube.turns[sequence[i]].fulcrum;
            for (j = 0; j < 4; j++) {
                let blockToCache = cube.cache[cube.planes[cube.activePlane][j]];
                cube.cache = cube.cache.replace(blockToCache, j);
            }; 
            for (j = 0; j < 4; j++) {
                let blockToAdd = cube.state[cube.planes[cube.activePlane][(j + 4 + cube.turns[sequence[i]].Oshift)%4]];
                blockToAdd = cube.permute(blockToAdd);
                cube.cache = cube.cache.replace(j, blockToAdd);
            }
            cube.state = cube.cache.valueOf();
        }
    }
};

cube.turn('RFdUUbLflr');