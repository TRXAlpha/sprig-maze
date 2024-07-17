const player = "p";
const goal = "g";
const wall = "w";
const path = ".";
const box = "b";

// Define the sprites in our game
setLegend(
  [player, bitmap`
................
....000000......
...0......0.....
...0.0..0.0.....
...0......0.....
...0.0..0.0.....
...0.0000.0.....
...0......0.....
....000000......
......0.........
...0..0...0.....
...00000000.....
......0.........
......0.........
....00.00.......
....0...0.......`],
  [goal, bitmap`
................
................
...333333333....
...3.......3....
...3.33333.3....
..33.33233.33...
..3..33233..3...
..3..33333..3...
..3.........3...
..3.........3...
..3.........3...
..3.........3...
................
................
................
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
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`]
);

const noLevel = map`
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww`;

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
const mediumLevels = [
  map`
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
// inputs for player movement controlaa
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
    addText("random (press i)", { x: 3, y: 12, color: color`7` });

    isInMainMenu = false; // Update the flag to show the game menu
  } else if (!isGameStarted) {
    startRandomGame();
  }
});

if (isInMainMenu) {
  setMap(noLevel);
}
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
  const currentLevel = easyLevels[easyLevel];
  setMap(currentLevel);
  clearText(); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started

  afterInput(checkCompletion);
}

function startMediumGame() {
  const currentLevel = mediumLevels[mediumLevel];
  setMap(currentLevel);
  clearText(); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started

  afterInput(checkCompletion);
}

function startHardGame() {
  const currentLevel = hardLevels[hardLevel];
  setMap(currentLevel);
  clearText(); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started

  afterInput(checkCompletion);
}

function startRandomGame() {
  const randomMaze = generateRandomMaze(5, 5);
  setMap(randomMaze);
  clearText(); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started

  afterInput(checkCompletion);
}

// Function to generate a random maze
function generateRandomMaze(width, height) {
  let maze = [];
  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      row += (Math.random() > 0.7 ? "w" : ".");
    }
    maze.push(row);
  }
  maze[0] = maze[0].slice(0, 1) + "p" + maze[0].slice(2); // Place player at (1, 0)
  maze[height - 1] = maze[height - 1].slice(0, width - 2) + "g" + maze[height - 1].slice(width - 1); // Place goal at (width-2, height-1)
  return map`${maze.join("\n")}`;
}

// Check for level completion
function checkCompletion() {
  if (!isInMainMenu && isGameStarted) {
    const targetNumber = tilesWith(goal).length;
    const numberCovered = tilesWith(goal, box).length;

    if (numberCovered === targetNumber) {
      clearText();
      setMap(noLevel);
      addText("you win!", { y: 4, color: color`7` });

      isGameStarted = false;
      easyLevel = 0;
      mediumLevel = 0;
      hardLevel = 0;
      isInMainMenu = true;
    }
  }
}

