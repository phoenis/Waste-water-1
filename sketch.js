var valueW=0;
var valueH=0;

function preload() {
    myBg = loadImage('images/background.png');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    imageMode(CORNER);
}

function draw() {

    image(myBg,valueW,valueH,width*3,height*2);
    
}

function mousePressed() {
    if (valueH == 0) {
        valueH = -height;
    } else if (valueW ==0 && valueH == -height) {
        valueW = -width;
    } else if (valueW ==-width && valueH == -height) {
        valueW = -width*2;
    }
}