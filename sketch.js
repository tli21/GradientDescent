var data = [];

var m = 0;
var b = 0;

function setup() {
  createCanvas(400, 400);
  var button = createButton("Random point");
  button.mousePressed(randomDot);
}

function gradientDescent() {
  
  var learning_rate = 0.1;
  
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    
    var guess = m * x + b;
    
    var error = y - guess;
    
    m = m + (error * x) * learning_rate;
    b = b + error * learning_rate;
  }
}

function rSquared() {
  var xsum = 0;
  var ysum = 0;
  
  for (var i = 0; i < data.length; i++) {
    xsum += data[i].x;
    ysum += data[i].y;
  }
  
  var xmean = xsum / data.length;
  var ymean = ysum / data.length;
  
  var hat = 0;
  var rsquareden = 0;
  
  for (var i = 0; i < data.length; i++) {
    ypredicted = m * data[i].x + b
    diff = ypredicted - data[i].y
    hat += diff * diff;
    rsquareden += (data[i].y - ymean) * (data[i].y - ymean)
  }
  
  rsquared = 1 - hat/rsquareden;
  Math.round((rsquared + Number.EPSILON) * 1000) / 1000
  console.log(rsquared);
}

function drawLine() {
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;
  
  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);
  
  stroke(255,0,255);
  line(x1, y1, x2, y2);
}

function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0); 
  var point = createVector(x,y);
  data.push(point);
}

function randomDot() {
  var x = map(random(0, 400), 0, width, 0, 1);
  var y = map(random(0, 400), 0, width, 1, 0); 
  
  var point = createVector(x,y);
  data.push(point);
}

function draw() {
  background(51);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    fill(255);
    stroke(255);
    ellipse(x,y,8,8);
  }
  
  if (data.length > 1) {
    gradientDescent();
    rSquared();
    drawLine(); 
  }
}
