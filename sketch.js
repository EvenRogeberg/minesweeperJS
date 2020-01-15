
var grid;
var columns;
var rows;
var w = 20;

var totalBombs = 30;
var bombsFound;
var allBombsFound;
var gameOver;


function twoDArray (rows, columns) {
    var array = new Array(rows);
    for (var i = 0; i < array.length; i++) {
      array[i] = new Array(columns)
    }
    return array;
}


function setup() {
  gameOver = false;
  bombsFound = 0;
  allBombsFound = false;
  createCanvas(401,401);
  rows = floor(height / w);
  columns = floor(width / w);

  grid = twoDArray(rows, columns);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  //pick totalBombs
  var opt = [];
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
        opt.push([i, j])
    }
  }

  for (var n = 0; n < totalBombs; n++) {
    var index = floor(random(opt.length));
    var choice = opt[index];
    var i = choice[0];
    var j = choice[1];
    //Deletes that spot so its no longer an option
    opt.splice(index, 1);
    grid[i][j].bomb = true;
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      grid[i][j].countBomb();
    }
  }
}

function gameOverFunc() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      grid[i][j].opened = true;
    }
  }
  fill('red');
  textAlign(CENTER);
  textSize(30);
  text("GAME OVER", width/2, height/2);
  textSize(18);
  text("SPACE to restart",  width/2, height/2 + 20);
  if(keyIsDown(32)){
    setup();
  }
}

function youWin() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      grid[i][j].opened = true;
    }
  }
  fill('green');
  textAlign(CENTER);
  textSize(30);
  text("YOU WIN", width/2, height/2);
  textSize(18);
  text("SPACE to restart",  width/2, height/2 + 20);
  if(keyIsDown(32)){
    setup();
  }
}


function mousePressed() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if(grid[i][j].contains(mouseX, mouseY)) {
        if(mouseButton === LEFT){
          grid[i][j].open();

          if (grid[i][j].bomb && grid[i][j].opened) {
            gameOver = true;
          }
        }

        if (mouseButton === RIGHT) {
          console.log("Pressed RIGHT");
            grid[i][j].flag();
            if (grid[i][j].flagged && grid[i][j].bomb) {
              bombsFound++;
              if(bombsFound === totalBombs){
                allBombsFound = true;
              }
            } else if (!grid[i][j].flagged && grid[i][j].bomb) {
              bombsFound--;
            }
        }
      }
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      grid[i][j].show();
    }
  }
  if (gameOver) {
    gameOverFunc();
  }
  if (allBombsFound) {
    youWin();
  }

}
