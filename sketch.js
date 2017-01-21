var x = 0;
var y = 0;
var myBg, BathroomBack, TubBack;
var buttonStart, buttonBath, buttonLaundry;     // Change room
var stateStart=false;
var stateBath=false;
var stateKitchen=false;
var Jack,Bath,Dish,Garden,WMachine,Mop;  // Animations

//-----> INPUT Bathroom
// > Shower
var week = 1;
var bathroomData = [5, 150, 80];
var buttonShower, buttonTub, showerSlider, selTub, buttonBathroom;
var showerMinutes, tubCapacity, showerWeek, bathWeek;
var resultShower, resultBath;
var moving=false;
var pressTooth=false;
var pressShower=false;
var pressTub=false;
var pressBathroom=false;
var pressWMachine=false;
var pressMop=false;
// > Teeth

//-----> INPUT Kitchen
// > Dish
var week = 1;
var kitchenData = [5,10,11,15];
var buttonHands, buttonDishwasher, handsSlider, selDishwasher, buttonKitchen;
var handsMinutes, dishwasherProgram, handsWeek, dishwasherWeek;
var resultHands, resultDishwasher;
var pressHands=false;
var pressDishwasher=false;
var pressKitchen=false;
var pressGarden=false;
// > Garden

//-----> INPUT Laundry
// > Washing machine


// > Mop

function preload() {
    myBg = loadImage('images/background.png');
    BathroomBack = loadImage('images/bathroom.png');
    TubBack = loadImage('images/tub-back.png');
    KitchenBack = loadImage('images/kitchen.png');
    table = loadImage('images/table.png');
    iron = loadImage('images/iron.png');
    LuandryBack = loadImage('images/laundry.png');
    Lclothes = loadImage('images/clothes.png');
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
    buttonLaundry = createButton('Laundry');
    buttonLaundry.position(width/3*2,height/3*2);
    buttonLaundry.mousePressed(KitchenToLaundry);
    buttonLaundry.hide();

/////////////////////////////////////////// START
//-----> INPUT NAME
    var inputName = createInput();
    inputName.id("inputName");
    inputName.position(width/2,height/2-10);
    inputName.size(250,60);
    inputName.value = text;
    // Placeholder
   // if (isNaN(inputName) && inputName.length<1){
    document.getElementById("inputName").placeholder = "your name..";
    /*} else {
        inputName.value = inputName.value + "!";
    }*/
    
/////////////////////////////////////////// LAUNDRY
    // Washing machine
    WMachine = createSprite(width/2,height/2,1,1);
    var WMachineAnimation = WMachine.addAnimation("WMClosed", "images/washing_machine-closed.png");
    WMachine.addAnimation("WMOpened", "images/washing_machine-opened.png");
    // Mop
    Mop = createSprite(width/2,height/2,1,1);
    var MopAnimation = Mop.addAnimation("Mop", "images/mop1");
    Mop.addAnimation("MopInUse", "images/mop1", "images/mop1", "images/mop1", "images/mop2", "images/mop2", "images/mop2");

//-----> INPUT Laundry
    // > Washing machine
    buttonWMachine = createButton("Washing Machine");
    buttonWMachine.mousePressed(WMachineOptions);
    buttonWMachine.position(300,580);
    buttonWMachine.hide();
    
    // > Mop
    buttonMop = createButton("Mop");
    buttonMop.mousePressed(MopOptions);
    buttonMop.position(300,580);
    buttonMop.hide();
    
/////////////////////////////////////////// KITCHEN
    // Dish
    Dish = createSprite(width/2,height/2,1,1);
    var DishAnimation = Dish.addAnimation("Dish_none", "images/dish_none.png");
    Dish.addAnimation("Dishwasher", "images/dish_dishwasher.png");
    Dish.addAnimation("Sink", "images/dish_sink1.png", "images/dish_sink1.png", "images/dish_sink1.png", "images/dish_sink2.png", "images/dish_sink2.png", "images/dish_sink2.png");
    // Garden
    Garden = createSprite(width/2,height/2,1,1);
    var GardenAnimation = Garden.addAnimation("Kwindow", "images/windowK-closed.png");
    Garden.addAnimation("Kwindow_open", "images/windowK-opened.png");
    
//-----> INPUT Kitchen
    // > Dish
    buttonHands = createButton("By hands");
    buttonHands.mousePressed(handsOptions);
    buttonHands.position(20,480);
    buttonHands.hide();
    
    buttonDishwasher = createButton("Dishwasher");
    buttonDishwasher.mousePressed(dishwasherOptions);
    buttonDishwasher.position(100,480);
    buttonDishwasher.hide();
    
    handsSlider = createSlider(0,60,10);
    handsSlider.position(20,540);
    handsSlider.hide();
    
    selDishwasher = createSelect();
    selDishwasher.position(20,540);
    selDishwasher.size(130,20);
    selDishwasher.option('Eco');
    selDishwasher.option('Daily');
    selDishwasher.option('Intensive');
    selDishwasher.hide();
    
    input = createInput();
    input.id("numDishwasher");
    input.position(230,565);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numDishwasher");
    input.placeholder = 4;
    document.getElementById("numDishwasher").style.visibility = "hidden";
    
    buttonKitchen = createButton("Done!");
    buttonKitchen.position(20,600);
    buttonKitchen.mousePressed(kitchenResults);
    buttonKitchen.hide();
    // > Garden
    buttonGarden = createButton("Garden");
    buttonGarden.mousePressed(gardenOptions);
    buttonGarden.position(300,580);
    buttonGarden.hide();

/////////////////////////////////////////// JACK <3
    var JackX = width/3.4;
    var JackY = height/3*2;
    Jack = createSprite(JackX,JackY,height/2.4,height/1.6);
    // START
    var JackAnimation = Jack.addAnimation("start", "images/Jack_start1.png", "images/Jack_start1.png", "images/Jack_start1.png", "images/Jack_start2.png", "images/Jack_start2.png", "images/Jack_start2.png");
    // Falling
    Jack.addAnimation("falling", "images/Jack_falling1.png", "images/Jack_falling1.png", "images/Jack_falling2.png", "images/Jack_falling2.png");
    // Walking
    Jack.addAnimation("stand", "images/Jack_stand.png");
    Jack.addAnimation("moving", "images/Jack_walk1.png", "images/Jack_walk1.png", "images/Jack_walk1.png", "images/Jack_walk2.png", "images/Jack_walk2.png", "images/Jack_walk2.png");
    // BATHROOM
    Jack.addAnimation("shower", "images/Jack_shower.png");
    Jack.addAnimation("toothbrush", "images/Jack_toothbrush1.png", "images/Jack_toothbrush1.png", "images/Jack_toothbrush1.png", "images/Jack_toothbrush1.png", "images/Jack_toothbrush2.png", "images/Jack_toothbrush2.png", "images/Jack_toothbrush2.png", "images/Jack_toothbrush2.png");
    // KITCHEN
    Jack.addAnimation("dish", "images/Jack_dish.png");
    Jack.addAnimation("garden", "images/Jack_garden1.png", "images/Jack_garden1.png", "images/Jack_garden1.png", "images/Jack_garden1.png", "images/Jack_garden2.png", "images/Jack_garden2.png", "images/Jack_garden2.png", "images/Jack_garden2.png", "images/Jack_garden3.png", "images/Jack_garden3.png", "images/Jack_garden3.png", "images/Jack_garden3.png", "images/Jack_garden2.png", "images/Jack_garden2.png", "images/Jack_garden2.png", "images/Jack_garden2.png");
    // LAUNDRY
    Jack.addAnimation("clothes", "images/Jack_clothes1.png");
    Jack.addAnimation("mop", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png");
    
/////////////////////////////////////////// BATHROOM
    // Bathtub - Tub
    Bath = createSprite(JackX,JackY,height/2.4,height/1.6);
    var BathAnimation = Bath.addAnimation("bath_before", "images/tub-front.png");
    Bath.addAnimation("shower", "images/shower.png");
    Bath.addAnimation("bath_none", "images/tub0.png");
    Bath.addAnimation("bath_tub", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png");
    
//-----> INPUT Bathroom
    // > Shower
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
    // > Teeth
    buttonTooth = createButton("Tooth");
    buttonTooth.mousePressed(toothOptions);
    buttonTooth.position(300,80);
    buttonTooth.hide();

}

//------------------------------------------------•°o.O Draw O.o°•
function draw(){  
/////////////////////////////////////////// BACKGROUND
    background("#a6cdda");
    image(myBg,x,y,width*3,height*2);
    push();
    imageMode(CENTER);   
    // size objects
    // - Bathroom
    var wx=width;
    var hy=width*0.56;
    var bx=x+width/2;
    var py=y+height*1.5;
    image(BathroomBack,bx,py,wx,hy);
    image(TubBack,bx,py,wx,hy);
    // - Kitchen
    var kx=x+width*1.5;
    image(KitchenBack,kx,py,wx,hy);
    // - Laundry
    var lx=x+width*2.5;
    image(LuandryBack,lx,py,wx,hy);
    image(Lclothes,lx,py,wx,hy);
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
        
    
//(()) BUTTON - Start to Bathroom
    if(stateStart==true){
        y=y-height //REMOVE 5

        if (y<-height) {
            y=-height;
        };
    
        buttonStart.hide();

//????????????????????????????????????????? CHIEDERE (non si può traslare?)
        document.getElementById("inputName").style.visibility='hidden';
    }
//??????????????????????????????????????????? CHIEDERE (usare height/width)
//<3 JACK fall - resize
    if (y==0){
        Jack.scale = 0.88;
    } 
    if (y<0){
        Jack.scale -= 0.01;
    }
    if (Jack.scale <= 0.64){
        Jack.scale = 0.64;   
        Jack.position.y=height*0.64;
        moving=false;
    } if (pressBathroom==true){
        Jack.position.y=height*0.56;
    }

    //draw the sprite
    drawSprites();

/////////////////////////////////////////// BATHROOM
    // Bathtub
    Bath.position.x=x+width*0.5;
    Bath.position.y=y+height*1.5; //andrebbe height/2
    Bath.scale=1.35;

//-----> INPUT Shower
    if(y<=-height && pressBathroom==false){
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
            
            text("results: "+resultShower+" "+resultBath, 20,25);
        }        
    Bath.changeAnimation("bath_before");
    }
    
    if (pressBathroom==true) {
        Bath.changeAnimation("bath_none");
        moving=true;
    } else if (pressTub==true){
        Bath.changeAnimation("bath_tub");
    } else if (pressShower==true){
        Bath.changeAnimation("shower");
    }
    
//-----> INPUT Sink
    if (Jack.position.x>=width/10*6.5 && x==0) {
        moving=false;
        buttonTooth.show();
        
        Jack.position.x = width/10*6.5;
        Jack.velocity.x = 0;   
        
        ellipse(100,100,200,200);
    }
    
    if (pressTooth==true){
        moving=true;
        buttonBath.show();
        buttonTooth.hide();
    }

//(()) BUTTON - Bathroom to Kitchen
    if(stateBath==true){
        x=x-width // REMOVE 10

        if (x<-width) {
            x=-width;
        }
        
        buttonBath.hide();
    }

    if(x<=-width){
        buttonBath.hide();
    }
/////////////////////////////////////////// KITCHEN
    // Dishwasher
    Dish.position.x=x+width*1.5;
    Dish.position.y=y+height*1.5; //andrebbe height/2
    Dish.scale=1.33;
    
//-----> INPUT Dish
    if (Jack.position.x>=width/9*4 && x==-width && pressKitchen===false) {
        moving=false;
        
        buttonHands.show();
        buttonDishwasher.show();
        Jack.position.x=width/9*4
        
        text("How do you clean your dishes?", 20, 460);
    
    if(pressHands===true) {
        text("How many minutes the faucet is turned on?", 20, 530);
        handsSlider.show();
        handsMinutes = handsSlider.value();
        text(handsMinutes+" minutes", 160,553);
        buttonKitchen.show();
    }
    
    if(pressDishwasher===true) {
        text("Set your dishwasher…", 20, 530);
        selDishwasher.show();
        text("How many times a week do you run it?",20,580);
        document.getElementById("numDishwasher").style.visibility = "visible";
        buttonKitchen.show();
    } 
    
    if(pressKitchen===true) {
        
        if(pressDishwasher===true){
        if(selDishwasher.value() === 'Eco') {
        dishwasherProgram = kitchenData[1];
        } else if (selDishwasher.value() === 'Daily') {
            dishwasherProgram = kitchenData[2];
        } else if (selDishwasher.value() === 'Intensive') {
            dishwasherProgram = kitchenData[3];
        }
        
        dishwasherWeek = document.getElementById("numDishwasher").value;
        
        resultDishwasher = week * dishwasherWeek * dishwasherProgram;
            
        resultHands = 0;
        }
        
        if(pressHands===true){
        
            handsMinutes = handsSlider.value();
            handsWeek = 14;
            resultHands = week * handsMinutes * kitchenData[0];
            
            resultDishwasher = 0;
        }
    
        text("results: "+resultHands+" "+resultDishwasher, 20,425);

        }
    }
    
    if (pressKitchen==true) {
        Dish.changeAnimation("Dish_none");
        moving=true;
    } else if (pressHands==true){
        Dish.changeAnimation("Sink");
    } else if (pressDishwasher==true){
        Dish.changeAnimation("Dishwasher");
    }

// Window garden
    Garden.position.x=x+width*1.5;
    Garden.position.y=y+height*1.5; //andrebbe height/2
    Garden.scale=1.33;

//-----> INPUT Window garden    
    if (Jack.position.x>=width/20*17 && x==-width && pressGarden===false) {
        moving=false;
        
        buttonGarden.show();
        Jack.position.x=width/20*17;
        
        ellipse(100,100,200,200);
    }
    if (Jack.position.x>=width/20*17 && x==-width && pressGarden===false) {
        Garden.changeAnimation("Kwindow_open");
    } else {
        Garden.changeAnimation("Kwindow");
    }
    
        
    if (pressGarden==true){
        moving=true;
        buttonLaundry.show();
        buttonGarden.hide();
    }
    
//(()) BUTTON - Kitchen to Laundry
    if(stateKitchen==true){
        x=x-10;

        if (x<-width*2) {
            x=-width*2;
        }
        
        buttonLaundry.hide();
    }
    
/////////////////////////////////////////// LAUNDRY
// Washing machine
    WMachine.position.x=x+width*2.5;
    WMachine.position.y=y+height*1.5; //andrebbe height/2
    WMachine.scale=1.33;
    
//-----> INPUT Washing machine    
    if (Jack.position.x>=width/5*2 && x==-width*2 && pressWMachine===false) {
        moving=false;
        
        buttonWMachine.show();
        Jack.position.x=width/5*2;
        
        ellipse(100,100,200,200);
    }
    
    if (Jack.position.x>=width/5*2 && x==-width*2 && pressWMachine===false) {
        WMachine.changeAnimation("WMOpened");
    } else {
        WMachine.changeAnimation("WMClosed");
    }
    
    if (pressWMachine==true){
        moving=true;
        buttonWMachine.hide();
    }
    
// Mop
    Mop.position.x=x+width*2.5;
    Mop.position.y=y+height*1.5; //andrebbe height/2
    Mop.scale=1.33;
    
//-----> INPUT Mop   
    if (Jack.position.x>=width/5*4 && x==-width*2 && pressMop===false) {
        moving=false;
        
        buttonMop.show();
        Jack.position.x=width/5*4;
        
        ellipse(100,100,200,200);
    }
    
    if (pressMop==true){
        moving=true;
        buttonMop.hide();
    }
    
    
    
/////////////////////////////////////////// RESULTS
    // Name
    if (x==-width*2){
        var userName = document.getElementById("inputName").value;
        text("Hi " + userName + "!",x+400,y+400);
    }
    
/////////////////////////////////////////// JACK Animation <3
        //if mouse is to the left
        if(mouseX < Jack.position.x - 10 && y==-height && moving==true) {
        Jack.changeAnimation("moving");
        //flip horizontally
        Jack.mirrorX(-1);
        //negative x velocity: move left
        Jack.velocity.x = - 20 // REMOVE -2
        }
        else if(mouseX > Jack.position.x + 10 && y==-height && moving==true) {
        Jack.changeAnimation("moving");
        //unflip 
        Jack.mirrorX(1);
        Jack.velocity.x = 20 // REMOVE 2
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
        // don't move > shower
        else if (y<=-height && Jack.position.y==height*0.64 && pressBathroom==false) {
        Jack.changeAnimation("shower");
        Jack.velocity.x = 0;   
        } 
        // don't move > toothbrush
        else if (Jack.position.x==width/10*6.5 && pressBathroom==true && x==0) {
        Jack.changeAnimation("toothbrush");
        Jack.velocity.x = 0;   
        }     
        // don't move > dish
        else if (Jack.position.x==width/9*4 && x==-width && pressKitchen===false) {
        Jack.changeAnimation("dish");
        Jack.velocity.x = 0;   
        }     
        // don't move > garden
        else if (Jack.position.x==width/20*17 && x==-width && pressGarden===false) {
        Jack.changeAnimation("garden");
        Jack.velocity.x = 0;   
        }     
        // don't move > washing machine
        else if (Jack.position.x==width/5*2 && x==-width*2 && pressWMachine===false) {
        Jack.changeAnimation("clothes");
        Jack.velocity.x = 0;   
        }     
        // don't move > mop
        else if (Jack.position.x==width/5*4 && x==-width*2 && pressMop===false) {
        Jack.changeAnimation("mop");
        Jack.velocity.x = 0;   
        }
        // don't move > stand
        else {
        Jack.changeAnimation("stand");
        Jack.velocity.x = 0;
        }    
    
/////////////////////////////////////////// BACKGROUND
    push();
    imageMode(CENTER);   
    // size objects
    var wx=width;
    var hy=width*0.56;
    var py=y+height*1.5;
    // - Kitchen TABLE
    var kx=x+width*1.5;
    image(table,kx,py,wx,hy);
    // - Laundry
    var lx=x+width*2.5;
    image(iron,lx,py,wx,hy);
    pop();
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
        
//      Jack.position.x = width/5;
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
        selTub.hide();
        showerSlider.hide();
        buttonShower.hide();
        buttonTub.hide();
        buttonBathroom.hide();
        document.getElementById("numShower").style.visibility = "hidden";
        document.getElementById("numBaths").style.visibility = "hidden";
    }
}

function toothOptions(){
    if(pressTooth===false){
        pressTooth=true;
    }
}

//------------------------------------------------•°o.O Kitchen O.o°•
function handsOptions() {
    if(pressHands===false && pressDishwasher===false){
        pressDishwasher===false;
        handsSlider.hide();
        pressHands=true;
    } else if(pressHands===false && pressDishwasher===true){
        pressDishwasher=false;
        selDishwasher.hide();
        document.getElementById("numDishwasher").style.visibility = "hidden";
        pressHands=true;
    }
}

function dishwasherOptions() {
    if(pressDishwasher===false && pressHands===false){
        pressHands===false;
        selDishwasher.hide();
        pressDishwasher=true;
    } else if(pressDishwasher===false && pressHands===true){
        pressHands=false;
        handsSlider.hide();
        pressDishwasher=true;
    }
}

function kitchenResults() {
    if(pressKitchen===false){
        pressKitchen=true;
        buttonHands.hide();
        buttonDishwasher.hide();
        handsSlider.hide();
        selDishwasher.hide();
        buttonKitchen.hide();
        document.getElementById("numDishwasher").style.visibility = "hidden";
    }
}

function gardenOptions(){
    if(pressGarden===false){
        pressGarden=true;
    }
}

//------------------------------------------------•°o.O Laundry O.o°•
function WMachineOptions(){
    if(pressWMachine===false){
        pressWMachine=true;
    }
}

function MopOptions(){
    if(pressMop===false){
        pressMop=true;
    }
}

//------------------------------------------------•°o.O Window resize O.o°•
function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}
