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

//-------------------------------------------------•°o.O SETUP O.o°•
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
    
//----------------------------------------------------------JACK
    Jack = createSprite(width/5,height/3*2,height/2.4,height/1.6);
    
    var myAnimation = Jack.addAnimation("start", "images/Jack_start.png");
    Jack.addAnimation("stand", "images/Jack_stand.png");
    Jack.addAnimation("bathroom", "images/Jack_bathroom.png");
    Jack.addAnimation("moving", "images/Jack_walk1.png", "images/Jack_walk2.png");
}

//-------------------------------------------------•°o.O DRAW O.o°•
function draw(){  
/////////////////////////////////////////// BACKGROUND
    image(myBg,x,y,width*3,height*2);
    
/////////////////////////////////////////// JACK <3
    if(y<=-height){
        //if mouse is to the left
        if(mouseX < Jack.position.x - 10) {
        Jack.changeAnimation("moving");
        //flip horizontally
        Jack.mirrorX(-1);
        //negative x velocity: move left
        Jack.velocity.x = - 2;
        }
        else if(mouseX > Jack.position.x + 10) {
        Jack.changeAnimation("moving");
        //unflip 
        Jack.mirrorX(1);
        Jack.velocity.x = 2;
        }
        else if (y<-height){
        //if close to the mouse, don't move
        Jack.changeAnimation("start");
        Jack.velocity.x = 0;
        } else {
        //if close to the mouse, don't move
        Jack.changeAnimation("stand");
        Jack.velocity.x = 0;
        }
    }
//??????????????????????????????????????????????????????????????????? CHIEDERE
    Jack.scale = 0.88;

    //draw the sprite
    drawSprites();
    
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
//??????????????????????????????????????????????????????????????????? CHIEDERE
        document.getElementById("inputName").style.visibility='hidden';
    }

/////////////////////////////////////////// BATHROOM
// BUTTON - Bathroom to Kitchen
    if(stateBath==true){
        x=x-10;

        if (x<-width) {
            x=-width;
        }
    }
    /*
    if(Jack.position.x==width/5 && y<=-height){
        ellipse(width/2,height/2,50,50);
        Jack.changeAnimation("bathroom");
        Jack.velocity.x = 0;
    }*/

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
