var x, y = 0;
var button;
var state=false;

function preload() {
    myBg = loadImage('images/background.png');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    button = createButton('click me');
    button.position(width/2,height/2);
    button.mousePressed(changeRoom);
    
}

function draw() {  
    image(myBg,x,y,width*3,height*2);
    
    if(state==true){
        y=y-10;

        if (y>height) {
            y==height;
        }
    }
}

function changeRoom() {
    if(state==false){
        state=true;
    } else {
        state=false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

