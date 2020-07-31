const stickerOrder = ['W','W','W','W','R','R','B','B','O','O','G','G','Y','Y','Y','Y','G','G','O','O','B','B','R','R'];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let testArray = ['a','b'];

function colourOf(stickerNum) {
  return stickerOrder[stickerNum];
};

function colourMap(state) {
    return state.map(element => {
      return colourOf(element);
    });
};

function stateToId(state) {
  let returnString = '';
  state.forEach(num => {
    returnString = returnString.concat(alphabet.charAt(num));
  });
  return returnString;
}

function idToState(Id) {
  let returnArray = [];
  for (i = 0; i < Id.length; i++) {
    returnArray.push(alphabet.indexOf(Id.charAt(i)))
  };
  return returnArray;
}

function reverseRoute(array) {
  let returnArray = [];
  array.forEach(turn => {
    let reverseDirection = ''
    let plane = turn[0];
    let direction = turn[1];
    switch(direction) {
      case 'cw': reverseDirection = 'acw'; break;
      case 'acw': reverseDirection = 'cw'; break;
    }
    let reversedMove = [plane, reverseDirection];
    returnArray.unshift(reversedMove);   
  });
  return returnArray;
}
  
function shiftArray(array,shiftDirection) {
    switch (shiftDirection) {
        case 'left': 
            array.push(array[0]);
            array.shift();
            break;
        case 'right':

            array.unshift(array[[array.length-1]]);
            array.pop();
            break
    }
    return array;
}

function storePosition(location) {
  if (!location[stateToId(cube.state)]) {
    navigator.positionsAddedThisIteration ++;
    location[stateToId(cube.state)] = {
      routeHome: cube.routeHome,
      routeTaken: cube.routeTaken,
      get distanceHome () {
        return this.routeHome.length;
      },
    };
  };
}

function fillCache() {
  let planes = ['U', 'D', 'L', 'R', 'F', 'B'];
  let directions = ['cw','acw'];
  let turns = 0;
  while (true) {
    navigator.positionsAddedThisIteration = 0;
    for (position in navigator.positions) {
        planes.forEach(plane => {
          directions.forEach(direction => {
            cube.state = idToState(position);
            cube.routeTaken = navigator.positions[position].routeTaken.slice();
            cube.routeHome = navigator.positions[position].routeHome.slice();
            turn (plane, direction);
            storePosition(navigator.cache);
            turns = turns + 1;
            });
        });
      };
  
      if (navigator.positionsAddedThisIteration = 0 || Object.keys(navigator.positions).length > 0) { break; }
    }
}

function fillNavigator() {
      fillCache();
      Object.assign(navigator.positions, navigator.cache);
      navigator.cache = [];
}

function turn(plane,direction) {
    cube.activePlane = plane;
    switch (direction) {
    case 'cw': cube.cw(); break;
    case 'acw': cube.acw(); break;
    };
    let reverseDirection = ''
    switch(direction) {
      case 'cw': reverseDirection = 'acw'; break;
      case 'acw': reverseDirection = 'cw'; break;
    }
  cube.routeTaken.push([plane,direction]);
  cube.routeHome = reverseRoute(cube.routeTaken);
  };

const cube = {
  state: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  //state: ['W','W','W','W','R','R','B','B','O','O','G','G','Y','Y','Y','Y','G','G','O','O','B','B','R','R'],
  activePlane: '',
  maps: {
    U : [0,1,2,3,4,5,6,7,8,9,10,11],
    D : [12,13,14,15,16,17,18,19,20,21,22,23],
    R : [6,7,20,21,5,22,13,14,19,8,2,3],
    L : [16,17,10,11,23,4,0,1,9,18,15,12],
    F : [4,5,22,23,12,13,21,6,3,0,11,16],
    B : [18,19,8,9,17,10,1,2,7,20,14,15],
  },
  get activePlaneState() {
    let returnArray = [[],[]];
    let map = cube.maps[cube.activePlane];
    for (i = 0; i < 4; i++) {
      returnArray[0].push(cube.state[map[i]])
    };
    for (i = 4; i < 12; i++) {
      returnArray[1].push(cube.state[map[i]])
    };
    return returnArray;
  },
  routeTaken: [],
  routeHome: [],
  cw() { 
    let store = [[],[]];
    for (j = 0; j < 4; j++) {
      store[0].push(cube.activePlaneState[0][j]);
    };
    for (j = 0; j < 8; j++) {
      store[1].push(cube.activePlaneState[1][j]);
    };
    store[0] = shiftArray(store[0], 'right');
    store[1] = shiftArray(store[1], 'left');
    store[1] = shiftArray(store[1], 'left');
    let map = cube.maps[cube.activePlane];
    let storeConcat = store[0].concat(store[1]);
    for (i = 0; i <12; i++) {
      let inputNum = storeConcat[i];
      cube.state[map[i]] = inputNum;
    };
  },
  acw() { 
    let store = [[],[]];
    for (j = 0; j < 4; j++) {
      store[0].push(cube.activePlaneState[0][j]);
    };
    for (j = 0; j < 8; j++) {
      store[1].push(cube.activePlaneState[1][j]);
    };
    store[0] = shiftArray(store[0], 'left');
    store[1] = shiftArray(store[1], 'right');
    store[1] = shiftArray(store[1], 'right');
    let map = cube.maps[cube.activePlane];
    let storeConcat = store[0].concat(store[1]);
    for (i = 0; i <12; i++) {
      let inputNum = storeConcat[i];
      cube.state[map[i]] = inputNum;
    };
  },
  reset() {
    this.state = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    this.routeTaken = [];
    this.routeHome = [];
  },  
  testProperty: [],
};

let navigator = {
  positionsAddedThisIteration: 0,
  cache: [],
  positions: {
    ABCDEFGHIJKLMNOPQRSTUVWX: {
      routeTaken: [],
      routeHome: [],
      get distanceHome () {
        return this.routeHome.length;
      },
    }
  }
};
