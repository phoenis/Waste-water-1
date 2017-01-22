var week = 1;
var x = 0;
var y = 0;
var myBg, BathroomBack, TubBack;
var buttonStart, buttonBathroom, buttonKitchen;     // Change room
var stateStart=false;
var stateBath=false;
var stateKitchen=false;
var Expand,Jack,Bath,Dish,Garden,WMachine,Mop; // Animations
var moving=false;

// DROP
var dropx;
var dropy = 100;
var stateStart=false;
var wavewS = 0;
var wavehS = 0;
var wavewB = 0;
var wavehB = 0;
var wavestroke = 255;

//-----> INPUT Bathroom
var bathroomData = [5, 150, 80];
var buttonShower, buttonTub, showerSlider, selTub, buttonDone1, teethSlider, buttonDone1;
var showerMinutes, tubCapacity, showerWeek, bathWeek, teethMinutes, teethWeek;
var resultShower, resultBath, resultTeeth;
var pressShower=false;
var pressTub=false;
var pressDone1=false;
var pressDone2=false;

//-----> INPUT Kitchen
var kitchenData = [5,10,11,15];
var gardenData = [12,1];
var buttonHands, buttonDishwasher, handsSlider, selDishwasher, buttonDone3;
var handsMinutes, dishwasherProgram, handsWeek, dishwasherWeek;
var buttonYes, buttonNo, selGarden, gardenSlider, buttonDone4;
var gardenWeek = 1;
var sizeGarden, gardenMinutes, waterGarden;
var resultHands, resultDishwasher, resultGarden;
var pressHands=false;
var pressDishwasher=false;
var pressDone3=false;
var pressYes=false;
var pressNo=false;
var pressHose=false;
var pressSprinkler=false;
var pressDone4=false;

//-----> INPUT Laundry
// > Washing machine
var pressWMachine=false;
var pressMop=false;

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
    buttonBathroom = createButton('bath');
    buttonBathroom.position(width/10*9,height/2);
    buttonBathroom.mousePressed(BathToKitchen);
    buttonBathroom.hide();
// Kitchen to Laundry
    buttonKitchen = createButton('Laundry');
    buttonKitchen.position(width/3*2,height/3*2);
    buttonKitchen.mousePressed(KitchenToLaundry);
    buttonKitchen.hide();

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
    
////    Need to expand your window
    Expand = createSprite(width/2,height/2,1,1);
    var ExpandAnimation = Expand.addAnimation("Expand", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png");
    Expand.addAnimation("NotExpand", "images/expand_none.png");
    
    
/////////////////////////////////////////// LAUNDRY
    // Washing machine
    WMachine = createSprite(width/2,height/2,1,1);
    var WMachineAnimation = WMachine.addAnimation("WMClosed", "images/washing_machine-closed.png");
    WMachine.addAnimation("WMOpened", "images/washing_machine-opened.png");
    // Mop
    Mop = createSprite(width/2,height/2,1,1);
    var MopAnimation = Mop.addAnimation("MopNotInUse", "images/mop1.png");
    Mop.addAnimation("MopInUse", "images/mop2.png");

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
    
    handsSlider = createSlider(1,60,10);
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
    
    buttonDone3 = createButton("Done!");
    buttonDone3.position(20,600);
    buttonDone3.mousePressed(Q3results);
    buttonDone3.hide();
    
    // > Garden
    buttonYes = createButton("Yes");
    buttonYes.mousePressed(yesOptions);
    buttonYes.position(20,480);
    buttonYes.hide();
    
    buttonNo = createButton("No");
    buttonNo.mousePressed(noOptions);
    buttonNo.position(80,480);
    buttonNo.hide();
    
    input = createInput();
    input.id("mqGarden");
    input.position(100,515);
    input.size(25,15);
    //placeholder
    input = document.getElementById("mqGarden");
    input.placeholder = 100;
    document.getElementById("mqGarden").style.visibility = "hidden";
    
    selGarden = createSelect();
    selGarden.position(20,570);
    selGarden.size(130,20);
    selGarden.option('Hose');
    selGarden.option('Sprinkler');
    selGarden.hide();
    
    gardenSlider = createSlider(1,60,10);
    gardenSlider.position(20,620);
    gardenSlider.hide();
    
    buttonDone4 = createButton("Done!");
    buttonDone4.position(20,650);
    buttonDone4.mousePressed(Q4results);
    buttonDone4.hide();
     
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
    Bath.addAnimation("shower", "images/shower1.png", "images/shower1.png", "images/shower1.png", "images/shower2.png", "images/shower2.png", "images/shower2.png", "images/shower3.png", "images/shower3.png", "images/shower3.png");
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
    
    showerSlider = createSlider(1,60,10);
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
    
    buttonDone1 = createButton("Done!");
    buttonDone1.position(20,200);
    buttonDone1.mousePressed(Q1results);
    buttonDone1.hide();
    
    // > Teeth
    
    teethSlider = createSlider(1,10,4);
    teethSlider.position(20,80);
    teethSlider.hide();
    
    buttonDone2 = createButton("Done!");
    buttonDone2.position(20,115);
    buttonDone2.mousePressed(Q2results);
    buttonDone2.hide();
    
}

//------------------------------------------------•°o.O Draw O.o°•
function draw(){  
    background("#a6cdda");
    
//// CAMBIARE?? (Così i background e le posizioni di Jack rimangono in un range per cui non si creano problemi... almeno che non si trova un altro modo..!! :D) > da qui
    
////    Need to expand your window    
        Expand.position.x=width*0.5;
        Expand.position.y=height*0.3;
        Expand.scale=width/1000;

    if (width/height <= 1.75) {
        push();
        textSize(width/15);
        textAlign(CENTER);
        textFont("Arial");
        fill(255);
        text("Please,\nexpand your window!",width/2,height/2);
        fill(0, 102, 153);
        
        buttonStart.hide();
        document.getElementById("inputName").style.visibility='hidden';
        pop();
        
        Jack.visible=false;
        Bath.visible=false;
        Dish.visible=false;
        Garden.visible=false;
        WMachine.visible=false;
        Mop.visible=false;
        
        drawSprites();
    } else {
    Expand.changeAnimation("NotExpand");
// CAMBIARE > a qui (più una parentesi in fondo al draw() )
        
/////////////////////////////////////////// BACKGROUND
    buttonStart.show();
    document.getElementById("inputName").style.visibility='visible';
        
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
// DROP
    if(stateStart==false){
        dropy=dropy+5;

        if (dropy>=height/6*5.8) {
            dropy=height/6*5.8;
        }
    
    // Waves
    if(dropy==height/6*5.8) {
        var a=3;
        wavewS=wavewS+a;
        wavehS=wavehS+0.5;
    //      > Small
        if (wavewS>=a*100) {
            dropy=height/6;
            wavewS=0;
            wavehS=0;
        }
    //      > Big
        wavewB=wavewB+a*2;
        wavehB=wavehB+1;
        
        if (wavewB>=a*200) {
            wavewB=0;
            wavehB=0;
        }
    }
    
    // Drop
    push();
    dropx = width/5*4.01;
    if (dropy>=height/6*5.8 || dropy<height/6) {
        fill(255,0);
    }
    noStroke();
    var dropsize = width/152;
    ellipse(dropx,dropy,dropsize,dropsize);
    triangle(dropx-dropsize/2,dropy,dropx+dropsize/2,dropy,dropx,dropy-dropsize)
    pop();
    
    // Waves
    push();
    noFill();
    // Stroke
    if(dropy==height/6*5.8) {
        wavestroke=wavestroke-3;
        if (wavehS<=1){
            wavestroke=255;
        }
    }
    stroke(255,wavestroke);
    // > Small
    ellipse(dropx,height/6*5.8,wavewS,wavehS)
    // > Big
    ellipse(dropx,height/6*5.8,wavewB,wavehB)
    pop();
    }
    
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
// CAMBIARE if
    if (stateStart==false){
        fill(255);
        textSize(40);
        textAlign(RIGHT);
        //textFont("Arial");
        text('Hi,',width/2-15,y+height/2+35);
        pop();
    }
        
    
//(()) BUTTON - Start to Bathroom
    if(stateStart==true){
        y=y-6 //REMOVE 6

        if (y<-height) {
            y=-height;
        };
    
        buttonStart.hide();
        document.getElementById("inputName").style.visibility='hidden';
    }
//??????????????????????????????????????????? CHIEDERE (usare height/width)
//<3 JACK fall - resize
    if (y==0){
// CAMBIARE
        Jack.scale = width/1552;    // 0.88
    } 
    if (y<0){
        Jack.scale -= 0.01;
    }
// CAMBIARE
    var JackScale = width/2134;
    
    if (Jack.scale <= JackScale){
        Jack.scale = JackScale;   
        Jack.position.y=height*0.64;   //// CAMBIARE VALORI
        moving=false;
    } if (pressDone1==true){
        Jack.position.y=height*0.56;
    }

    //draw the sprite
    drawSprites();

/////////////////////////////////////////// BATHROOM
    // Bathtub
// CAMBIARE
    var AnimationScale=width/2265;
    Bath.position.x=x+width*0.5;
    Bath.position.y=y+height*1.5;
    Bath.scale=AnimationScale;
    
//-----> INPUT Shower
    if(y<=-height && pressDone1==false){
        
        text("Do you prefer to take a shower or a bath?", 20, 60);
        buttonShower.show();
        buttonTub.show();

        if(pressShower===true){
            text("How long does the shower last?", 20, 130);
            showerSlider.show();
            showerMinutes = showerSlider.value();
            
            if(showerMinutes===1){
                text(showerMinutes+" minute", 160,153);
            } else {
            text(showerMinutes+" minutes", 160,153);}
            
            text("How many showers do you take each week?",20,180);
            document.getElementById("numShower").style.visibility = "visible";
            buttonDone1.show();
        }

        if(pressTub===true){
            text("How much do you fill your bathtub?", 20, 130);
            selTub.show();
            text("How many baths do you take each week?",20,180);
            document.getElementById("numBaths").style.visibility = "visible";
            buttonDone1.show();
        } 

        if(pressDone1===true){

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
        }
        
    Bath.changeAnimation("bath_before");
    }
    
    if (pressDone1==true) {
        Bath.changeAnimation("bath_none");
        moving=true;
    } else if (pressTub==true){
        Bath.changeAnimation("bath_tub");
    } else if (pressShower==true){
        Bath.changeAnimation("shower");
    }
    
//-----> INPUT Sink
    if (Jack.position.x>=width/10*6.5 && x==0 && pressDone2==false) {
        moving=false;
        
        text("How many minutes do you spend to brushing your teeth?", 20, 60);
        teethSlider.show();
        buttonDone2.show();
        
        teethMinutes = teethSlider.value();
        if(teethMinutes===1){
            text(teethMinutes+ " minute", 160,93);
        } else {
        text(teethMinutes+ " minutes", 160,93); }
        
        Jack.position.x = width/10*6.5;
        Jack.velocity.x = 0;   

        if(pressDone2==true){
            teethWeek = 14;
            resultTeeth = week * teethMinutes * bathroomData[0];
        }
    }
    
    if (pressDone2==true){
        moving=true;
        buttonBathroom.show();
        buttonDone2.hide();
    }

//(()) BUTTON - Bathroom to Kitchen
    if(stateBath==true){
        x=x-10 // REMOVE 10
        
        if (x<-width) {
            x=-width;
        }        
    }
    if(stateBath==true && x>-width){
        Jack.position.x=Jack.position.x-11;
        
        if (Jack.position.x<100) {
            Jack.position.x=100;
            
        }
    }

    if(x<=-width){
        buttonBathroom.hide();
    }
/////////////////////////////////////////// KITCHEN
    // Dishwasher
    Dish.position.x=x+width*1.5;
    Dish.position.y=y+height*1.5;
    Dish.scale=AnimationScale;
    
//-----> INPUT Dish
    // CAMBIARE position
    if (Jack.position.x>=width/4.5 && x==-width && pressDone3===false) {
        moving=false;
        
        text("How do you clean your dishes?", 20, 460);
        buttonHands.show();
        buttonDishwasher.show();
        // CAMBIARE position
        Jack.position.x=width/4.5;
    
    if(pressHands===true) {
        text("How many minutes the faucet is turned on?", 20, 530);
        handsSlider.show();
        handsMinutes = handsSlider.value();
        text(handsMinutes+" minutes", 160,553);
        buttonDone3.show();
    }
    
    if(pressDishwasher===true) {
        text("Set your dishwasher…", 20, 530);
        selDishwasher.show();
        text("How many times a week do you run it?",20,580);
        document.getElementById("numDishwasher").style.visibility = "visible";
        buttonDone3.show();
    } 
    
    if(pressDone3===true) {
        
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

        }
    }
    
    if (pressDone3==true) {
        Dish.changeAnimation("Dish_none");
        moving=true;
    } else if (pressHands==true){
        Dish.changeAnimation("Sink");
    } else if (pressDishwasher==true){
        Dish.changeAnimation("Dishwasher");
    }

// Window garden
    Garden.position.x=x+width*1.5;
    Garden.position.y=y+height*1.5;
    Garden.scale=AnimationScale;

//-----> INPUT Window garden    
    // CAMBIARE position
    if (Jack.position.x>=width/5*4 && x==-width && pressDone4===false && pressNo===false) {
        moving=false;
        // CAMBIARE da qui
        if(pressYes===false) {
        text("Do you have a garden?", 20, 460);
        buttonYes.show();
        buttonNo.show();
        }
        
        Jack.position.x=width/5*4;
        // a qui
        
        if(pressYes===true) {
        buttonYes.hide();
        buttonNo.hide();
            
        text("How big is it?", 20, 530);
        document.getElementById("mqGarden").style.visibility = "visible";
            
        text("square meters", 135, 530);
            
        text("How do you water?",20,560);
        selGarden.show();
            
        text("How long do you water each time?", 20, 610);
        gardenSlider.show();
        gardenMinutes = gardenSlider.value();
            
        if(gardenMinutes===1){
            text(gardenMinutes+" minute", 160,631);
        } else {
        text(gardenMinutes+" minutes", 160,631);}
        
        buttonDone4.show();
        }
        
        if(pressNo===true) {
            resultGarden=0;
        }
        
        if(pressDone4===true) {
            
            sizeGarden = document.getElementById("mqGarden").value;

            if(selGarden.value() === 'Hose') {
                waterGarden = gardenData[0];
            } else if (selGarden.value() === 'Sprinkler') {
                waterGarden = gardenData[1];
            }
            
            gardenMinutes = gardenSlider.value();
        
            resultGarden = week * gardenWeek * sizeGarden * gardenMinutes * waterGarden;
            
        }
    }
// CAMBIARE if
    if (Jack.position.x==width/5*4 && x==-width && pressDone4===false && pressNo===false) {
        Garden.changeAnimation("Kwindow_open");
    } else {
        Garden.changeAnimation("Kwindow");
    }

// CAMBIARE if
    if (pressDone4==true || pressNo==true){
        moving=true;
        buttonKitchen.show();
        buttonDone4.hide();
    }
    
//(()) BUTTON - Kitchen to Laundry
    if(stateKitchen==true){
        x=x-10; // REMOVE 10

        if (x<-width*2) {
            x=-width*2;
        }
        
        buttonKitchen.hide();
    }
    
    if(stateKitchen==true && x>-width*2){
        Jack.position.x=Jack.position.x-13;
        
        if (Jack.position.x<100) {
            Jack.position.x=100;
            
        }
    }
/////////////////////////////////////////// LAUNDRY
// Washing machine
    WMachine.position.x=x+width*2.5;
    WMachine.position.y=y+height*1.5;
    WMachine.scale=AnimationScale;
    
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
    Mop.position.y=y+height*1.5;
    Mop.scale=AnimationScale;
    
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
    
    if (Jack.position.x>=width/5*4 && x==-width*2 && pressMop===false) {
        Mop.changeAnimation("MopInUse");
    } else {
        Mop.changeAnimation("MopNotInUse");
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
        Jack.velocity.x = - 3 // REMOVE -3
        }
        else if(mouseX > Jack.position.x + 10 && y==-height && moving==true) {
        Jack.changeAnimation("moving");
        //unflip 
        Jack.mirrorX(1);
        Jack.velocity.x = 3 // REMOVE 3
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
    // CAMBIARE position
        else if (y<=-height && Jack.position.y==height*0.64 && pressDone1==false) {
        Jack.changeAnimation("shower");
        Jack.velocity.x = 0;   
        } 
        // don't move > toothbrush
        else if (Jack.position.x==width/10*6.5 && pressDone1==true && x==0) {
        Jack.changeAnimation("toothbrush");
        Jack.velocity.x = 0;   
        }     
        // don't move > dish
    // CAMBIARE position
        else if (Jack.position.x==width/4.5 && x==-width && pressDone3===false) {
        Jack.changeAnimation("dish");
        Jack.velocity.x = 0;   
        }     
        // don't move > garden
    // CAMBIARE position
        else if (Jack.position.x==width/5*4 && x==-width && pressDone4===false) {
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

    }   // CAMBIARE > questa parentesi qui
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

function Q1results(){
    if(pressDone1===false){
        pressDone1=true;
        selTub.hide();
        showerSlider.hide();
        buttonShower.hide();
        buttonTub.hide();
        buttonDone1.hide();
        document.getElementById("numShower").style.visibility = "hidden";
        document.getElementById("numBaths").style.visibility = "hidden";
    }
}

function Q2results(){
    if(pressDone2===false){
        pressDone2=true;
        teethSlider.hide();
        buttonDone2.hide();
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

function Q3results() {
    if(pressDone3===false){
        pressDone3=true;
        buttonHands.hide();
        buttonDishwasher.hide();
        handsSlider.hide();
        selDishwasher.hide();
        buttonDone3.hide();
        document.getElementById("numDishwasher").style.visibility = "hidden";
    }
}

function yesOptions() {
    if(pressYes===false){
        pressYes=true;
    }
}

function noOptions() {
    if(pressNo===false){
        pressNo=true;
        buttonYes.hide();
        buttonNo.hide();
    }
}

function Q4results() {
    if(pressDone4===false){
        pressDone4=true;
        document.getElementById("mqGarden").style.visibility = "hidden";
        selGarden.hide();
        gardenSlider.hide();
        buttonDone4.hide();
        buttonYes.hide();
        buttonNo.hide();
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
