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
    
    // Start to Bathroom
    buttonStart = createButton('start');
    buttonStart.position(width/3,height/2);
    buttonStart.mousePressed(Start);
    // Bathroom to Kitchen
    buttonBath = createButton('change');
    buttonBath.position(width/2,height/2);
    buttonBath.mousePressed(changeRoom);
    
}

function draw() {  
    image(myBg,x,y,width*3,height*2);
    
    // Start to Bathroom
    if(stateStart==true){
        y=y-10;

        if (y<-height) {
            y=-height;
        }
        
    }
    // Bathroom to Kitchen
    if(stateRoom==true){
        x=x-10;
        y=-height;

        if (x<-width) {
            x=-width;
        }
    }
}

// Start to Bathroom
function Start() {
    if(stateStart==false){
        stateStart=true;
    } 
}
// Bathroom to Kitchen
function changeRoom() {
    if(stateRoom==false){
        stateRoom=true;
    } 
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

