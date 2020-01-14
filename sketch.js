
function twoDArray (rows, columns) {
    var array = new Array(rows);
    for (var i = 0; i < array.length; i++) {
      array[i] = new Array(columns)
    }
    return array;
}

var grid;
var columns;
var rows;
var w = 20;

var totalBombs = 10;

function setup() {
  createCanvas(201,201);
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

function gameOver() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      grid[i][j].opened = true;
    }
  }
}


function mousePressed() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if(grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].open();

        if (grid[i][j].bomb) {
          gameOver();
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
}
