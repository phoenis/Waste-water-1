var x = 0;
var y = 0;
var buttonStart, buttonBath, buttonKitchen;
var stateStart=false;
var stateBath=false;
var stateKitchen=false;
var Jack;
var input;

function preload() {
    myBg = loadImage('images/background.png');
    Jack_start = loadImage('images/Jack_start.png');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    
/////////////////////////////////////////// BUTTONS
// Start to Bathroom
    buttonStart = createButton("→<br>Let's go!");
    buttonStart.addClass('buttons');
    buttonStart.size(250,90);
    buttonStart.position(width/2,height/3*2);
    buttonStart.mousePressed(StartToBath);
// Bathroom to Kitchen
    buttonBath = createButton('bath');
    buttonBath.position(width/2,height/3*2);
    buttonBath.mousePressed(BathToKitchen);
    buttonBath.hide();
// Kitchen to Laundry
    buttonKitchen = createButton('kitchen');
    buttonKitchen.position(width/3*2,height/3*2);
    buttonKitchen.mousePressed(KitchenToLaundry);
    buttonKitchen.hide();

/////////////////////////////////////////// START
// INPUT NAME
    input = createInput();
    input.id("inputName");
    input.position(width/2,height/2);
    input.size(250,40);
    input.value = text;
    // Placeholder
    var input = document.getElementById ("inputName");
    input.placeholder = "your name..";
}

function draw(){  
/////////////////////////////////////////// BACKGROUND
    image(myBg,x,y,width*3,height*2);
    
/////////////////////////////////////////// JACK <3
    push();
    imageMode(CENTER);
    Jack=image(Jack_start,width/5,height/3*2,height/2.4,height/1.5);
    pop();
    
/////////////////////////////////////////// START
// TEXT - Question
    push();
    fill(255);
    textSize(width/20);
    textAlign(CENTER);
    textStyle(BOLD);
    textFont("Dosis");
    text('HOW MUCH WATER DO YOU USE?',width/2,y+height/6);
    pop();
// TEXT - Hi x!
    push();
    fill(255);
    textSize(40);
    textAlign(RIGHT);
    //textFont("Arial");
    text('Hi,',width/2-15,y+height/2+35);
    pop();
        
    /*var myText = document.getElementById("inputName").value
    text("Hi " + myText + "!",width/3,height/3+y);*/
    
// BUTTON - Start to Bathroom
    if(stateStart==true){
        y=y-10;

        if (y<-height) {
            y=-height;
        };

        buttonStart.hide();
/*||||||||||||||||||||||||||||||||| CHIEDERE ||||||||||||||||||||||||||||||||*/
        document.getElementById("inputName").style.display='none';
        push();
        imageMode(CENTER);        
       // Jack=image(Jack_walk,width/5,height/3*2,height/2.6,height/1.5);
        pop();
    }

/////////////////////////////////////////// BATHROOM
// BUTTON - Bathroom to Kitchen
    if(stateBath==true){
        x=x-10;

        if (x<-width) {
            x=-width;
        }
    }

/////////////////////////////////////////// KITCHEN
// BUTTON - Kitchen to Laundry
    if(stateKitchen==true){
        x=x-10;

        if (x<-width*2) {
            x=-width*2;
        }
    }
    
/////////////////////////////////////////// LAUNDRY
    
    
}

/////////////////////////////////////////// TRANSLATE BACKGROUND
    // Start to Bathroom
function StartToBath() {
    if(stateStart==false){
        stateStart=true;
    }
}
    // Bathroom to Kitchen
function BathToKitchen() {
    if(stateBath==false){
        stateStart=false;
        stateBath=true;
    } 
}
    // Kitchen to Laundry
function KitchenToLaundry() {
    if(stateKitchen==false){
        stateBath=false;
        stateKitchen=true;
    } 
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

function hideImage() { 
    document.getElementById(Jack).style.display = 'none';
}