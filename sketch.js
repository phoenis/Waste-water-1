var x = 0;
var y = 0;
var buttonStart, buttonBath, buttonKitchen;
var stateStart=false;
var stateBath=false;
var stateKitchen=false;
var Jack;
var name=input.value();

function preload() {
    myBg = loadImage('images/background.png');
    Jack = loadImage('images/Jack_Start.png');
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
//    buttonBath.hide();
// Kitchen to Laundry
    buttonKitchen = createButton('kitchen');
    buttonKitchen.position(width/3*2,height/3*2);
    buttonKitchen.mousePressed(KitchenToLaundry);
//    buttonKitchen.hide();

/////////////////////////////////////////// START
// INPUT NAME
    input = createInput();
    input.id("inputName");
    input.position(width/2,height/2);
    input.size(250,40);
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
    image(Jack,width/5,height/3*2,height/2.4,height/1.5);
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
// TEXT - Insert name
    push();
    fill(255);
    textSize(40);
    textAlign(RIGHT);
    textFont("Arial");
    text('Hi,',width/2-20,y+height/2+33);
    pop();
    
// BUTTON - Start to Bathroom
    if(stateStart==true){
        y=y-10;

        if (y<-height) {
            y=-height;
        };
        buttonStart.hide();  
/*||||||||||||||||||||||||||||||||| CHIEDERE ||||||||||||||||||||||||||||||||*/
        document.getElementById("inputName").style.display='none';
    
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
    
    var abc = document.getElementById("inputName").value;
    document.getElementById("demo").innerHTML = abc;
    
    text(abc,30,30);
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

