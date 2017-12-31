const height = 800, width = 1700;
const rows = 20, cols = 20, h = height/cols;
const w = (width-900)/rows;

var points = []; // holds all points
var m = 1, b = 0; // Slope & y-intercept
var xmean, ymean; // Means;
var zeroH;

var xInput, yInput, addPointBtn; // Inputs

function setup() {
  createCanvas(width, height);
}

// Linear Regression Model
// Create Graph
function drawLRGraph() {
  fill(255);
  stroke(255);
  textSize(12);
  for(let i=0; i<=cols; i++) {
    strokeWeight(2);
    line(0, i*h, 20, i*h);
    if(i%2 == 0) {
      let num = map(i, 0, cols, cols, 0);
      strokeWeight(1);
      text(num, 2, i*h-5);
    }
    if(i == 20) {
      strokeWeight(1);
      text(20, 2, 15);
    }
  }
  for(let i=1; i<=rows; i++) {
    strokeWeight(2);
    line(i*w, height, i*w, height-20);
    if(i%2 == 0) {
      strokeWeight(1);
      text(i, i*w+3, height-5);
    }
    if(i == 20) {
      strokeWeight(1);
      text(20, i*w-18, height-5);
    }
  }
}

// Draw point
class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255));
    this.residual;
  }

  // Show point
  show() {
    var newX = map(this.x, 0, 20, 0, width-900);
    var newY = map(this.y, 0, 20, height, 0);
    fill(this.color);
    noStroke();
    ellipse(newX, newY, 10, 10);
  }

  // Show Text
  showText() {
    if(mouseOverPoint(this)) {
      fill(this.color);
      textSize(14);
      strokeWeight(1);
      stroke(this.color);
      var xPos = map(this.x, 0, 20, 0, width-900);
      var yPos = map(this.y, 0, 20, height, 0);
      var x = round(this.x*1000); x = x / 1000;
      var y = round(this.y*1000); y = y / 1000;
      text("(" + x + ", " + y + ")", xPos, yPos-10);
    }
  }

  calculateResidual() {
    let yDesired = m * this.x + b;
    let yActual = this.y;
    this.residual = yActual - yDesired;
  }

  showResidual() {
    if(mouseOverResidual(this)) {
      var pos = residualPlotPoint(this);
      fill(this.color);
      textSize(14);
      strokeWeight(1);
      stroke(this.color);
      var xPos = pos[0];
      var yPos = pos[1];
      var res = round(this.residual*1000); res = res / 1000;
      if(this.residual >= 0) {text(res, xPos+900, yPos-10);}
      if(this.residual < 0) {
        text(res, xPos+900, zeroH+pos[2]+20);
      }
    }
  }
}

// Create Point
function mousePressed() {
  if(mouseX <= width-900 && mouseY <= height && mouseX >= 0 && mouseY >= 0) {
    var x = map(mouseX, 0, width-900, 0, 20);
    var y = map(mouseY, 0, height, 20, 0);
    var point = new Point(x, y);
    points.push(point);
  }
}

// Create Point by Input
function addPoint() {
  xInput = document.getElementById("xInput").value;
  yInput = document.getElementById("yInput").value;
  document.getElementById("xInput").value = "";
  document.getElementById("yInput").value = "";
  var point = new Point(Number.parseFloat(xInput), Number.parseFloat(yInput));
  if(point.x > 20 || point.x < 0 || point.y > 20 || point.y < 0) {

  } else {
    points.push(point);
  }
}

// Test if point is focused
function mouseOverPoint(point) {
  var x = map(mouseX, 0, width-900, 0, 20);
  var y = map(mouseY, 0, height, 20, 0);
  if(x >= point.x-0.125 && x <= point.x+0.125 &&
     y >= point.y-0.125 && y <= point.y+0.125) {
    return true;
  } else {
    return false;
  }
}

// Draw Line
function drawLine() {
  let xmin = 0;
  let xmax = 20;
  let ymin = b;
  let ymax = m * xmax + b;

  xmin = map(xmin, 0, 20, 0, width-900);
  xmax = map(xmax, 0, 20, 0, width-900);
  ymin = map(ymin, 0, 20, height, 0);
  ymax = map(ymax, 0, 20, height, 0);

  stroke(255, 0, 0);
  strokeWeight(1);
  noFill();
  line(xmin, ymin, xmax, ymax);
}

// Calculates mean, given input x or y
function mean(type) {
  let sum = 0;
  if(type = "x") {
    for(let i=0; i<points.length; i++) {
      sum += points[i].x;
    }
  }
  if(type = "y") {
    for(let i=0; i<points.length; i++) {
      sum += points[i].y;
    }
  }

  let mean = sum/points.length;
  return mean;
}

// Calculates m & b;
function linearRegressionModel() {
  xmean = mean("x");
  ymean = mean("y");
  let num = 0;
  let den = 0;
  for(let i = 0; i<points.length; i++) {
    // Numerator
    let xdiff = points[i].x - xmean;
    let ydiff = points[i].y - ymean;
    num += xdiff * ydiff;

    // Denominator
    den += xdiff * xdiff;
  }

  // Calculate m
  if(den != 0) {
    m = num / den;
  }

  // Calculate b
  b = ymean - (m * xmean);
}

// Output
function output() {
  let mOut = floor(m * 10000);
  mOut = mOut / 10000;
  let bOut = floor(b * 10000);
  bOut = bOut / 10000;
  document.getElementById("lineOutput").innerHTML = "y = " + mOut + "x + " + bOut;
}

// Residual Plot Model
function drawRPModel() {
  fill(255);
  stroke(255);
  textSize(12);
  for(let i=0; i<=cols; i++) {
    strokeWeight(2);
    line(width-800, i*h, width-800+20, i*h);
    if(i%2 == 0) {
      let num = map(i, 0, cols, 20, -20);
      strokeWeight(1);
      text(num, width-800+2, i*h-5);

      if(num == 0) {
        zeroH = i*h;
      }
    }

    if(i == 20) {
      strokeWeight(1);
      text(20, width-800+2, 15);
    }
  }

  strokeWeight(2);
  line(width-800, zeroH, width, zeroH);

  for(let i=1; i<=rows; i++) {
    strokeWeight(2);
    line(i*w+(width-800), zeroH-10, i*w+(width-800), zeroH+10);
  }
}

function residualPlotModel() {
  for(let i=0; i<points.length; i++) {
    let point = points[i];
    let residual = point.residual;

    noStroke();
    fill(point.color);
    if(residual >= 0) {
      let pos = residualPlotPoint(point);
      rect((pos[0]-5)+900, pos[1], 10, pos[2], 4, 4, 0, 0); // Rounded
    }

    if(residual < 0) {
      let pos = residualPlotPoint(point);
      rect((pos[0]-5)+900, zeroH, 10, pos[2], 0, 0, 4, 4); // Rounded
    }
  }
}

// Returns positioning of shape.
// Returns, xPosition, yPosition, height from zeroH.
function residualPlotPoint(point) {
  let residual = point.residual;
  let output = [];

  let x = map(point.x, 0, 20, 0, 800); // xPosition
  let y = map(residual, -20, 20, height, 0); // yPosition
  let yDiff; // height from zeroH.
  if(residual >= 0) {
    yDiff = zeroH-y;
  } 
  if(residual < 0) {
    yDiff = y-zeroH;
  }

  output = [x, y, yDiff];
  return output;
} 

function mouseOverResidual(point) {
  var x = mouseX;
  var y = mouseY;
  var pos = residualPlotPoint(point);
  var xPos = pos[0];
  var yPos = pos[1];
  var height = pos[2];

  if(point.residual >= 0) {
    if(x >= xPos+900-5 && x <= xPos+900+5 && y >= yPos && y <= zeroH) {
      return true;
    } else {
      return false;
    }
  }
  if(point.residual < 0) {
    if(x >= xPos+900-5 && x <= xPos+900+5 && y >= zeroH && y <= height+zeroH) {
      return true;
    } else {
      return false;
    }
  }
}

function draw() {
  fill(51);
  rect(0, 0, width-900, height);
  fill(255);
  rect(width-900, 0, 100, height);
  fill(51);
  rect(width-900+100, 0, width-900, height);
  drawLRGraph();
  drawRPModel();

  // Show all points
  for(var i=0; i<points.length; i++) {
    p = points[i];
    p.show();
    p.showText();
    p.calculateResidual();
    p.showResidual();
  }

  drawLine();
  if(points.length > 1) {
    linearRegressionModel();
    residualPlotModel();
    output();
  }
}