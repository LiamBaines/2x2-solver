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
                ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
                ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
                ['GRW', 'GOW', 'BOW', 'BRW', 'GRY', 'GOY', 'BOY', 'BRY'],
            ],
    stickers: {

    },
    get colourState() {
        let stickers = {
            A: ['#f3f3f3ff', '#ff3133ff', '#00a23aff'],
            I: ['#ff3133ff', '#00a23aff', '#f3f3f3ff'],
            Q: ['#00a23aff', '#f3f3f3ff', '#ff3133ff'],
            B: ['#f3f3f3ff', '#00a23aff', '#ff7c0dff'],
            J: ['#ff7c0dff', '#f3f3f3ff', '#00a23aff'],
            R: ['#00a23aff', '#ff7c0dff', '#f3f3f3ff'],
            C: ['#f3f3f3ff', '#ff7c0dff', '#2563f3ff'],
            K: ['#ff7c0dff', '#2563f3ff', '#f3f3f3ff'],
            S: ['#2563f3ff', '#f3f3f3ff', '#ff7c0dff'],
            D: ['#f3f3f3ff', '#2563f3ff', '#ff3133ff'],
            L: ['#ff3133ff', '#f3f3f3ff', '#2563f3ff'],
            T: ['#2563f3ff', '#ff3133ff', '#f3f3f3ff'],
            E: ['#edd60eff', '#00a23aff', '#ff3133ff'],
            M: ['#00a23aff', '#ff3133ff', '#edd60eff'],
            U: ['#ff3133ff', '#edd60eff', '#00a23aff'],
            F: ['#edd60eff', '#ff7c0dff', '#00a23aff'],
            N: ['#ff7c0dff', '#00a23aff', '#edd60eff'],
            V: ['#00a23aff', '#edd60eff', '#ff7c0dff'],
            G: ['#edd60eff', '#2563f3ff', '#ff7c0dff'],
            O: ['#2563f3ff', '#ff7c0dff', '#edd60eff'],
            W: ['#ff7c0dff', '#edd60eff', '#2563f3ff'],
            H: ['#edd60eff', '#ff3133ff', '#2563f3ff'],
            P: ['#ff3133ff', '#2563f3ff', '#edd60eff'],
            X: ['#2563f3ff', '#edd60eff', '#ff3133ff']
        }
        let returnObject = {
            front: [stickers[cube.state[0]][1], stickers[cube.state[3]][2], stickers[cube.state[4]][2], stickers[cube.state[7]][1]],
            back: [stickers[cube.state[2]][1], stickers[cube.state[1]][2], stickers[cube.state[6]][2], stickers[cube.state[5]][1]],
            top: [stickers[cube.state[0]][0], stickers[cube.state[3]][0], stickers[cube.state[1]][0], stickers[cube.state[3]][0]],
            bottom: [stickers[cube.state[5]][0], stickers[cube.state[6]][0], stickers[cube.state[4]][0], stickers[cube.state[7]][0]],
            left: [stickers[cube.state[1]][1], stickers[cube.state[0]][2], stickers[cube.state[5]][2], stickers[cube.state[4]][1]],
            right: [stickers[cube.state[3]][1], stickers[cube.state[2]][2], stickers[cube.state[7]][2], stickers[cube.state[6]][1]],
        }
        return returnObject;
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
    turn (sequence, record = true) {
        for (i = 0; i < sequence.length; i ++) {
            if (record === true ) {
                cube.solution = ((sequence[i] === sequence[i].toUpperCase()) ? sequence[i].toLowerCase() : sequence[i].toUpperCase()).concat(cube.solution);
            };
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
    },
    opToFacing(o, p) {
        let x = o + Math.floor(p / 2);
            x = x / (4 - 2 * Math.sign(p));
            x = Math.floor(x)
            x = x * 2;
            x = x % 4;
            x = 1 - x;
            x = x * (p + 1)
        return x;
    },
    opToRotation(o, p) {
        let x = Math.floor((7 - o) / 4);
            x = x * (p % 2);
            x = Math.abs(3 * x - (o % 4));
        let y = o / 4;
            y = 2 * Math.floor(y);
            y = p - y;
            y = Math.abs(y) / 2;
            y = Math.floor(y);
            y = 2 * ((o % 2) - 0.5)* y;
            x = Math.abs(x - y);
        return x;
    },
    get facingAndRotation() {
        let o = 0;
        let p = 0;
        for (j = 0; j < 3; j ++) {
            if (cube.state.includes(cube.blocks[j][0])) {
                o = cube.state.indexOf(cube.blocks[j][0]);
                p = j; 
            }
        };
        let facing = cube.opToFacing(o,p);
        let rotation = cube.opToRotation(o,p);
        return [facing, rotation];
    },
    get uniqueState() {
        cube.turn(['Lr', 'fB', 'LrLr', '', '', 'Fb', 'lR'][cube.facingAndRotation[0] + 3], false);
        for (h = 0, n = cube.facingAndRotation[1]; h < n; h ++) {
            cube.turn('uD', false);
        };
        return cube.state.slice(1);
    },
    inputState(colourState) {
    let alphabet = ['B','G', 'O', 'R', 'W', 'Y', ' '];
    let colourStateArray = [];
    let alphaColourStateArray = [];
    let returnState = '';
        for (i = 0; i < 8; i++) {
            let alphaColourBlock = '';
            let colourBlock = colourState.slice(i * 4, i * 4 + 3);
            for (j = 0; j < 7; j ++) {
                if (colourBlock.includes(alphabet[j])) {
                    alphaColourBlock = alphaColourBlock.concat(alphabet[j])
                }
            }
            colourStateArray.push(colourBlock);
            alphaColourStateArray.push(alphaColourBlock);
        }
        for (i = 0; i < 8; i ++) {
            let blockNumId = cube.blocks[3].indexOf(alphaColourStateArray[i]);
            let p = (colourStateArray[i].includes('W')) ? colourStateArray[i].indexOf('W') : colourStateArray[i].indexOf('Y');
            returnState = returnState.concat(cube.blocks[p][blockNumId]);
        }
    cube.state = returnState;
    }
};

function getDynamicSolution(state, staticSolution) {
    cube.state = state;
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