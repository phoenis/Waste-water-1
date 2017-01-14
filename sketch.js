var x = 0;
var y = 0;
var buttonStart, buttonBath, buttonKitchen;
var stateStart=false;
var stateBath=false;
var stateKitchen=false;

function preload() {
    myBg = loadImage('images/background.png');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    
    // Start to Bathroom
    buttonStart = createButton('start');
    buttonStart.position(width/3,height/2);
    buttonStart.mousePressed(StartToBath);
    // Bathroom to Kitchen
    buttonBath = createButton('bath');
    buttonBath.position(width/2,height/2);
    buttonBath.mousePressed(BathToKitchen);
    // Kitchen to Laundry
    buttonKitchen = createButton('kitchen');
    buttonKitchen.position(width/3*2,height/2);
    buttonKitchen.mousePressed(KitchenToLaundry);
    
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
    if(stateBath==true){
        x=x-10;
        y=-height;

        if (x<-width) {
            x=-width;
        }
    }
    // Kitchen to Laundry
    if(stateKitchen==true){
        x=x-10;
        y=-height;

        if (x<width) {
            x=-width*2;
        }
    }
}

// Start to Bathroom
function StartToBath() {
    if(stateStart==false){
        stateStart=true;
    } 
}
// Bathroom to Kitchen
function BathToKitchen() {
    if(stateBath==false){
        stateBath=true;
    } 
}
// Kitchen to Laundry
function KitchenToLaundry() {
    if(stateKitchen==false){
        stateKitchen=true;
    } 
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

