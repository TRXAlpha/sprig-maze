// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";


setLegend(
 [player, bitmap`
................
....00000000....
...0666666660...
..066666666660..
..066666666660..
..066666666660..
..066660660660..
..066660660660..
..006666666660..
...0006666660...
..0CCC0666600...
..0CCC066660F0..
..0CCC066660F0..
...0006606600...
......00.00.....
................`],
  [goal, bitmap`
................
................
..000000000000..
.00777777777700.
0077555555557700
0775555555555770
075555HHHH555570
07555HHHHHH55570
0755HHH11HHH5570
0755HH1111HH5570
0755HH1LL1HH5570
0755HH1LL1HH5570
0755HH1LL1HH5570
0755HH1LL1HH5570
0000000000000000
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
   [box, bitmap`
................
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CC..CC..CC..CC.
.CC..CC..CC..CC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CC..CC..CC..CC.
.CC..CC..CC..CC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CC..CC..CC..CC.
.CC..CC..CC..CC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
................`]
);


const noLevel = map`
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww`
// create game levels
let easyLevel = 0; // this tracks the level we are on
const easyLevels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.b..
....
..w.`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`,
  map`
gw...gw
.b..www
.....ww
p.w..ww
.ww.www
.b..www
ww..www`
];
let mediumLevel = 0; // this tracks the level we are on
const mediumLevels = [  map`
p..g
.b..
..w.
..w.`,
  map`
p..w
.b.w
..g.
..w.`,
  map`
p..w
.b.w
...g
..w.`,
  map`
.p..w
..b..
...g.`,
];
let hardLevel = 0; // this tracks the level we are on
const hardLevels = [
  map`
p.......gw
.ww.ww.www
.b..w...w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.......w.`,
  map`
p....ww..gw
.ww...w...w
.w....w....
.w.bw.w.w..
.w..w.w.w.w
.w.ww.w.w.w
.w.ww.w.w.w
.w.ww.w.w.w
.w........w
...w.w.w..w`,
  map`
p........gw
w..wwww.www
.......w...
w...w......
w.w.wwwww.w
w.w.......w
w.w.ww.w.w.
w.w....w..w
w.wwwwbw.w.
w.......w.w`,
  map`
p..g....w.
..wwww.w..
.bw..w.w..
w.w...w...
w.w.....w.
w.w.www.w.
w.w.w.w.w.
..w..ww.w.
.....ww.w.
.........w`,
  map`
wp.......g
w.w.wwww.w
w.w..b...w
w.w.w.w..w
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w...w...w.`,
  map`
p...g.w..w
.ww.ww.w..
.w....b...
.w...w.w.w
.w.w.w.w.w
.w.w.w.w.w
.w.w.w.w.w
.w.w.w...w
.w....w..w
...ww...ww`,
  map`
p.ww....wg
w...www.w.
....w...w.
..w.w...w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w...w.w.w.
wb........
w.....w...`
];

setSolids([player, box, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});
// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});
onInput("w", () => {
  getFirst(player).y -= 1; // positive y is upwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
// Add text at the top (title)
addText("THE MAZE", { x: 6, y: 2, color: color`3` });

// Add text in the middle (instruction to start)
addText("Press 'i' to start", { x: 1, y: 8, color: color`7` });

let isInMainMenu = true; // Keep track if the player is in the menu screen
let isGameStarted = false;


// Input to start the game or transition
onInput("i", () => {
  if (isInMainMenu) {
    clearText(); // Clear the existing text elements
    addText("Select Difficulty", { x: 2, y: 2, color: color`3` });
    addText("easy (press j)", { x: 3, y: 6, color: color`7` });
    addText("medium (press k)", { x: 3, y: 8, color: color`7` });
    addText("hard (press l)", { x: 3, y: 10, color: color`7` });
    addText("press i to restart", {x :1, y: 13, color: color`8`});


    isInMainMenu = false; // Update the flag to show the game menu
  }
});
if (isInMainMenu){
  setMap(noLevel);
// Inputs to select difficulty
onInput("j", () => {
  if (!isInMainMenu && !isGameStarted) {

    startEasyGame();
  }
});

onInput("k", () => {
  if (!isInMainMenu && !isGameStarted) {

    startMediumGame();
  }
});

onInput("l", () => {
  if (!isInMainMenu && !isGameStarted) {

    startHardGame();
  }
});

// Start the games based on the difficulty
function startEasyGame() {
  // set the map displayed to the current level
const currentLevel = easyLevels[easyLevel];
setMap(currentLevel);
  clearText(""); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started
  setMap(currentLevel); // Show the current level map

  // these get run after every input
  afterInput(() => {
    if (!isInMainMenu && isGameStarted) {
      // count the number of tiles with goals
      const targetNumber = tilesWith(goal).length;

      // count the number of tiles with goals and boxes
      const numberCovered = tilesWith(goal, box).length;

      // if the number of goals is the same as the number of goals covered
      // all goals are covered and we can go to the next level
      if (numberCovered === targetNumber) {
        // increase the current level number
        easyLevel++;

        const currentLevel = easyLevels[easyLevel];

        // make sure the level exists and if so set the map
        // otherwise, we have finished the last level, there is no level
        // after the last level
        if (currentLevel !== undefined) {
          setMap(currentLevel);
        } else {
          setMap(noLevel);
          addText("you win!", { y: 4, color: color`7` });
        }
      }
    }
    onInput("i", () => {
      const currentLevel = easyLevels[easyLevel]; // get the original map of the level

      // make sure the level exists before we load it
      if (currentLevel !== undefined) {
        clearText("");
        setMap(currentLevel);
      }
    });
  });
}
function startMediumGame() {
  // set the map displayed to the current level
const currentLevel = mediumLevels[mediumLevel];
setMap(currentLevel);
  clearText(""); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started
  setMap(currentLevel); // Show the current level map

  // these get run after every input
  afterInput(() => {
    if (!isInMainMenu && isGameStarted) {
      // count the number of tiles with goals
      const targetNumber = tilesWith(goal).length;

      // count the number of tiles with goals and boxes
      const numberCovered = tilesWith(goal, box).length;

      // if the number of goals is the same as the number of goals covered
      // all goals are covered and we can go to the next level
      if (numberCovered === targetNumber) {
        // increase the current level number
        mediumLevel++;

        const currentLevel = mediumLevels[mediumLevel];

        // make sure the level exists and if so set the map
        // otherwise, we have finished the last level, there is no level
        // after the last level
        if (currentLevel !== undefined) {
          setMap(currentLevel);
        } else {
          setMap(noLevel);
          addText("you win!", { y: 4, color: color`7` });
        }
      }
    }
    onInput("i", () => {
      const currentLevel = mediumLevels[mediumLevel]; // get the original map of the level

      // make sure the level exists before we load it
      if (currentLevel !== undefined) {
        clearText("");
        setMap(currentLevel);
      }
    });
  });
}
function startHardGame() {
  // set the map displayed to the current level
const currentLevel = hardLevels[hardLevel];
setMap(currentLevel);
  clearText(""); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started
  setMap(currentLevel); // Show the current level map

  // these get run after every input
  afterInput(() => {
    if (!isInMainMenu && isGameStarted) {
      // count the number of tiles with goals
      const targetNumber = tilesWith(goal).length;

      // count the number of tiles with goals and boxes
      const numberCovered = tilesWith(goal, box).length;

      // if the number of goals is the same as the number of goals covered
      // all goals are covered and we can go to the next level
      if (numberCovered === targetNumber) {
        // increase the current level number
        hardLevel++;

        const currentLevel = hardLevels[hardLevel];

        // make sure the level exists and if so set the map
        // otherwise, we have finished the last level, there is no level
        // after the last level
        if (currentLevel !== undefined) {
          setMap(currentLevel);
        } else {
          setMap(noLevel);
          addText("you win!", { y: 4, color: color`7` });
        }
      }
    }
    onInput("i", () => {
      const currentLevel = hardLevels[hardLevel]; // get the original map of the level

      // make sure the level exists before we load it
      if (currentLevel !== undefined) {
        clearText("");
        setMap(currentLevel);
      }
    });
  });
}
}
