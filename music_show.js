function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
    angleMode(DEGREES);

}
var test = {
    x: 100,
    y: 100,
    r: 150
}
function draw() {
    background(0);
    // circle(width/2,height/2,150)
    fill(255);
    circle(test.x, test.y, test.r)
}