let x_start = 0;
let y_start = 0;
let flag = 1
let d_x = 80;
let d_y = 50;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(240);
    angleMode(DEGREES)

}

function draw() {
    rotate(0)
    for (let i = 0; i < 100; i++) {
        x_start += 10+frameCount
        y_start = -1000;
        for (let j = 0; j < 50; j++) {
            strokeWeight(2.5);
            switch (i%3) {
                case 0:
                    stroke("#0E7EAE")
                    break;
                case 1:
                    stroke("#0F0D0D")
                    break;
                default:
                    stroke("#438AE7")
                    break;
            }
            line(x_start,y_start,x_start+d_x*flag,y_start+d_y);
            x_start = x_start+d_x*flag;
            y_start = y_start+d_y;
            flag *= -1
        }
    }
    
}