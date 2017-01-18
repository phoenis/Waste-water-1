var x = 0;
var y = 0;
var myBg, TubBack, BathroomBg;
var buttonStart, buttonBath, buttonKitchen;
var stateStart=false;
var stateBath=false;
var stateKitchen=false;
var Jack,Bath;

//-----> INPUT Bathroom
var week = 1;
var bathroomData = [5, 150, 80];
var buttonShower, buttonTub, showerSlider, selTub, buttonBathroom;
var showerMinutes, tubCapacity, showerWeek, bathWeek;
var resultShower, resultBath;
var pressShower=false;
var pressTub=false;
var pressBathroom=false;
var RESULTS = [];

function preload() {
    myBg = loadImage('images/background.png');
    bathroom_background = loadImage('images/bathroom_background.png');
    TubBack = loadImage('images/tub-back.png');
    BathroomBg = loadImage('images/bathroom.png');
}

//------------------------------------------------•°o.O Setup O.o°•
function setup() {
    createCanvas(windowWidth,windowHeight);
    
/////////////////////////////////////////// BUTTONS Translate bg
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
//-----> INPUT NAME
    var inputName = document.getElementById ("inputName");
    inputName = createInput('');
    inputName.id("inputName");
    inputName.position(width/2,height/2);
    inputName.size(250,40);
    inputName.value = text;
    // Placeholder
   // if (isNaN(inputName) && inputName.length<1){
        inputName.placeholder = "your name..";
    /*} else {
        inputName.value = inputName.value + "!";
    }*/
/////////////////////////////////////////// JACK <3
    var JackX = width/3.4;
    var JackY = height/3*2;
    Jack = createSprite(JackX,JackY,height/2.4,height/1.6);
    
    var JackAnimation = Jack.addAnimation("start", "images/Jack_start1.png", "images/Jack_start1.png", "images/Jack_start1.png", "images/Jack_start2.png", "images/Jack_start2.png", "images/Jack_start2.png");
    Jack.addAnimation("stand", "images/Jack_stand.png");
    Jack.addAnimation("shower", "images/Jack_shower.png");
    Jack.addAnimation("moving", "images/Jack_walk1.png", "images/Jack_walk1.png", "images/Jack_walk1.png", "images/Jack_walk2.png", "images/Jack_walk2.png", "images/Jack_walk2.png");
    Jack.addAnimation("falling", "images/Jack_falling1.png", "images/Jack_falling1.png", "images/Jack_falling2.png", "images/Jack_falling2.png");

/////////////////////////////////////////// BATHROOM
    // Bathtub - Tub
    Bath = createSprite(JackX,JackY,height/2.4,height/1.6);
    var BathAnimation = Bath.addAnimation("bath_none", "images/tub0.png");
    Bath.addAnimation("bath_before", "images/tub-front.png");
    Bath.addAnimation("bath_tub", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png");
    
//-----> INPUT Bathroom
    buttonShower = createButton("Shower");
    buttonShower.mousePressed(showerOptions);
    buttonShower.position(20,80);
    buttonShower.hide();
    
    buttonTub = createButton("Bath");
    buttonTub.mousePressed(tubOptions);
    buttonTub.position(85,80);
    buttonTub.hide();
    
    showerSlider = createSlider(0,60,10);
    showerSlider.position(20,140);
    showerSlider.hide();
    
    input = createInput();
    input.id("numShower");
    input.position(265,165);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numShower");
    input.placeholder = 4;
    document.getElementById("numShower").style.visibility = "hidden";
    
    selTub = createSelect();
    selTub.position(20,140);
    selTub.size(130,20);
    selTub.option('Full');
    selTub.option('Half-full');
    selTub.hide();
    
    input = createInput();
    input.id("numBaths");
    input.position(265,165);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numBaths");
    input.placeholder = 4;
    document.getElementById("numBaths").style.visibility = "hidden";
    
    buttonBathroom = createButton("Done!");
    buttonBathroom.position(20,200);
    buttonBathroom.mousePressed(bathroomResults);
    buttonBathroom.hide();
    
}

//------------------------------------------------•°o.O Draw O.o°•
function draw(){  
/////////////////////////////////////////// BACKGROUND

    image(myBg,x,y,width*3,height*2);
    push();
    imageMode(CENTER);   
    // size objects
    var hx=width*0.56;
    var wy=width;
    var ix=x+width/2;
    var iy=y+height*1.5;
    image(bathroom_background,ix,iy,wy,hx);
    image(BathroomBg,ix,iy,wy,hx);
    image(TubBack,ix,iy,wy,hx);
    pop();
    
//??????????????????????????????? CHIEDERE (usare height/width)
    // Jack fall - resize
    if (y==0){
    Jack.scale = 0.88;
    } 
    if (y<0){
    Jack.scale -= 0.01;
    }
    if (Jack.scale <= 0.65){
    Jack.scale = 0.65;   
    Jack.position.y = height*0.64;
    }

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
        
    
    
//(()) BUTTON - Start to Bathroom
    if(stateStart==true){
        y=y-5;

        if (y<-height) {
            y=-height;
        };
    
        buttonStart.hide();
//????????????????????????????????????????? CHIEDERE (non si può traslare?)
        document.getElementById("inputName").style.visibility='hidden';
    }

/////////////////////////////////////////// BATHROOM
    // Bathtub
    Bath.position.x=x+width*0.502;
    Bath.position.y=y+height*1.495; //andrebbe height/2
    Bath.scale=1.35;

//-----> INPUT Bathroom
    if(y<=-height){
        buttonShower.show();
        buttonTub.show();

        var Q1Bath = text("Do you prefer to take a shower or a bath?", 20, 60);

        if(pressShower===true){
            var Q2Bath = text("How long does the shower last?", 20, 130);
            showerSlider.show();
            showerMinutes = showerSlider.value();
            var Q3Bath = text(showerMinutes+" minutes", 160,153);
            var Q4Bath = text("How many showers do you take each week?",20,180);
            document.getElementById("numShower").style.visibility = "visible";
            buttonBathroom.show();
        }

        if(pressTub===true){
            var Q5Bath = text("How much do you fill your bathtub?", 20, 130);
            selTub.show();
            var Q6Bath = text("How many baths do you take each week?",20,180);
            document.getElementById("numBaths").style.visibility = "visible";
            buttonBathroom.show();
        } 

        if(pressBathroom===true){

            if(pressTub===true){
                if(selTub.value() === 'Full') {
                tubCapacity = bathroomData[1];
                } else if (selTub.value() === 'Half-full') {
                    tubCapacity = bathroomData[2];
                }

            bathWeek = document.getElementById("numBaths").value;
            resultBath = week * bathWeek * tubCapacity;

            resultShower = 0;
            }

            if(pressShower===true){

            showerMinutes = showerSlider.value();

            showerWeek = document.getElementById("numShower").value;

            resultShower = week * showerWeek * showerMinutes * bathroomData[0];

            resultBath = 0;
            }
            RESULTS.push(resultBath);
            RESULTS.push(resultShower);
            
            text("results: "+resultShower+" "+resultBath, 20,25);
            text(RESULTS, 200,25);
        }        
//????????????????????????????????????????? CHIEDERE (nascondere input)
    Bath.changeAnimation("bath_tub");
    }
    
    if (pressBathroom==true) {
        Bath.changeAnimation("bath_none");
    } else if (y>-height){
        Bath.changeAnimation("bath_before");
    }

//(()) BUTTON - Bathroom to Kitchen
    if(stateBath==true){
        x=x-10;

        if (x<-width) {
            x=-width;
        }
    }

/////////////////////////////////////////// KITCHEN
//(()) BUTTON - Kitchen to Laundry
    if(stateKitchen==true){
        x=x-10;

        if (x<-width*2) {
            x=-width*2;
        }
    }
    
/////////////////////////////////////////// LAUNDRY
    
/////////////////////////////////////////// RESULTS
    if (x<-width*2){
        var myText = document.getElementById("inputName").value
        text("Hi " + myText + "!",x+width/2,y+height*1.5);
    }
    
/////////////////////////////////////////// JACK <3
        //if mouse is to the left
        if(mouseX < Jack.position.x - 10 && y==-height && pressBathroom==true) {
        Jack.changeAnimation("moving");
        //flip horizontally
        Jack.mirrorX(-1);
        //negative x velocity: move left
        Jack.velocity.x = - 2;
        }
        else if(mouseX > Jack.position.x + 10 && y==-height && pressBathroom==true) {
        Jack.changeAnimation("moving");
        //unflip 
        Jack.mirrorX(1);
        Jack.velocity.x = 2;
        }
        // don't move > START
        else if (y==0){
        Jack.changeAnimation("start");
        Jack.velocity.x = 0;
        }
        // JACK fall down
        else if(y<0 && y>-height) {
            Jack.changeAnimation("falling");
            Jack.velocity.x = 0;
        } 
        // don't move > underpants
        else if (y==-height && Jack.position.y==height*0.62 && pressBathroom==false) {
        Jack.changeAnimation("shower");
        Jack.velocity.x = 0;   
        }    
        // don't move
        else {
        Jack.changeAnimation("stand");
        Jack.velocity.x = 0;
        }    
}

//------------------------------------------------•°o.O Translate bg O.o°•

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

//------------------------------------------------•°o.O Bathroom O.o°•
//-----> INPUT Bathroom
function showerOptions(){
    if(pressShower===false && pressTub===false){
        pressShower=true;
    } else if(pressShower===false && pressTub===true){
        pressTub=false;
        selTub.hide();
        pressShower=true;
    }
}

function tubOptions(){
    if(pressTub===false && pressShower===false){
        pressTub=true;
    } else if(pressTub===false && pressShower===true){
        pressShower=false;
        showerSlider.hide();
        pressTub=true;
    }
}

function bathroomResults(){
    if(pressBathroom===false){
        pressBathroom=true;
    }
}

//------------------------------------------------•°o.O Window resize O.o°•
function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}