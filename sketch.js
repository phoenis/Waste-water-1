var x = 0;
var y = 0;
var buttonStart, buttonBath;
var stateStart=false;
var stateRoom=false;

function preload() {
    myBg = loadImage('images/background.png');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    buttonStart = createButton('start');
    buttonStart.position(width/3,height/2);
    buttonStart.mousePressed(Start);
    
    buttonBath = createButton('change');
    buttonBath.position(width/2,height/2);
    buttonBath.mousePressed(changeRoom);
    
}

function draw() {  
    image(myBg,x,y,width*3,height*2);
    
    if(stateStart==true){
        y=y-10;

        if (y>height) {
            y==height;
        }
    }
    
    if(stateRoom==true){
        x=x-10;
        y=-height;

        if (x>=width) {
            x==width;
        }
    }
}

function Start() {
    if(stateStart==false){
        stateStart=true;
    } 
}

function changeRoom() {
    if(stateRoom==false){
        stateRoom=true;
    } 
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

