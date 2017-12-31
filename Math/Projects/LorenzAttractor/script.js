var sliderA; // σ
var sliderB; // ρ
var sliderC; // β
var generate;
var A;
var B;
var C;
var divs = [];

function setup() {
	frameRate(60);
	createCanvas(350, 100);
	sliderA = createSlider(1, 20, 10, 0.5);
	sliderB = createSlider(1, 40, 28, 1);
	sliderC = createSlider(1, 10, 8/3, 1/3);
	sliderA.position(10, 300);
	sliderA.style('width', '80px');
	sliderB.position(100, 300);
	sliderB.style('width', '80px');
	sliderC.position(190, 300);
	sliderC.style('width', '80px');
	generate = createButton('Generate');
	generate.position(280, 300);
	generate.mousePressed(generateLorenz);
	textSize(20);

}

function draw() {
	background(255);
	A = sliderA.value();
	B = sliderB.value();
	C = sliderC.value();
	var textC = floor(C*10);
	textC /= 10;
	text("σ: " + A, 25, 25);
	text("ρ: " + B, 115, 25);
	text("β: " + textC, 205, 25);
}


function generateLorenz() {
	var max = 5000, i = 0;
	for(i=0; i<max; i++) {
		div = document.createElement("div");
		divs.push(div);
		document.body.appendChild(div);
	}
	function callback(x, y, z) {
		divs[i=(i+1)%max].style.cssText = 
			"left:" + (x*8) + "px;" + 
			"top:" + (y*8)  + "px;" +
      		"width:" + Math.abs(z/8) + "px;" +
      		"height:" + Math.abs(z/8) + "px;"
	}
	lorenz(0.01, A, B, C, 0, 10, 10, callback);
}

function lorenz(h, a, b, c, x, y, z, j) {
	setInterval(function(){j(
		x += h*(a*(y-x)),
		y += h*(x*(b-z)-y),
		z += h*(x*y-c*z))},
		9)
}