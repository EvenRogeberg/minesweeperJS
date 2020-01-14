function Cell(i, j, w) {
  this.i = i; //index
  this.j = j;
  this.x = i*w; //row
  this.y = j*w; //columns
  this.w = w; //width
  this.neighborCount = 0;

  this.flagged = false;
  this.bomb = false;
  this.opened = false;
}

Cell.prototype.show = function () {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if(this.opened){
    if(this.bomb){
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.w)
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 5);
      }
    }
  }
};

Cell.prototype.flag = function () {
  if(!this.opened){
    this.flagged = !this.flagged;
    if (this.flagged) {
      console.log("flagged");
      fill('red')
      triangle(this.x, this.y, this.x + this.w, this.y + this.w, this.x + (this.w/2), (this.x +this.w)+ (this.y+(this.w/2)));
    } else {
      console.log("not flagged");
    }
  }
};

Cell.prototype.countBomb = function () {
  if(this.bomb){
    this.neighborCount = -1;
    return;
  }

  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < columns && j > -1 && j < rows) {
        var neighbor = grid[i][j];
          if(neighbor.bomb){
            total++;
          }
      }
    }
  }
  //console.log(total);
  this.neighborCount = total;
  //return total
};

Cell.prototype.contains = function (x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < (this.y + this.w))
};

Cell.prototype.open = function () {
  this.opened = true;
  if (this.neighborCount == 0) {
      //floodFill()
      this.floodFill();
  }
};

Cell.prototype.floodFill = function () {
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < columns && j > -1 && j < rows) {
        var neighbor = grid[i][j];
          if(!neighbor.bomb && !neighbor.opened){
            neighbor.open();
          }
      }
    }
  }
};
