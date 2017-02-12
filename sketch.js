<<<<<<< HEAD
//////////////////////// WAVES
=======

>>>>>>> origin/master
var cnt=document.getElementById("count"); 
var water=document.getElementById("water");
document.getElementById("water").style.visibility='hidden';
var percent=cnt.innerText;
var interval;
interval=setInterval(function(){ 
    percent++; 
    cnt.innerHTML = percent; 
    water.style.transform='translate(0'+','+(100-percent)+'%)';
    if(percent==100){
        clearInterval(interval);
    }
    },80);

var week = 1;
var userName;
var Result;
var x = 0;
var y = 0;
var myBg, BathroomBack, TubBack;
var buttonStart, buttonBathroom, buttonKitchen;     // Change room
var stateStart=false;
var stateBath=false;
var stateKitchen=false;
var Expand,Jack,Bath,Sink,Dish,Garden,WMachine,Mop;     // Animations //*
var moving=false;
var swimming=false;
var restartButton;

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
var buttonShower, buttonTub, showerSlider, selTub, buttonDone1, teethSlider, buttonDone2;
var showerMinutes, tubCapacity, showerWeek, bathWeek, teethMinutes, teethWeek;
var defaultShower = 250;
var defaultBath = 320;
var defaultTeeth = 70;
var myShower, myBath, myTeeth;
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
var defaultHands = 250;
var defaultDishwasher = 60;
var buttonYes, buttonNo, selGarden, gardenSlider, buttonDone4;
var sizeGarden, gardenMinutes, waterGarden;
var defaultGarden = 250;
var myHands, myDishwasher, myGarden;
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
var laundryData = [5,33,51,45,48,78,84];
var selWMachine, WMachineSlider, buttonDone5, sliderMop, buttonDone6;
var WMachineProgram, WMachineWeek, mopWeek, bucketMop;
var defaultWMachine = 66;
var defaultMop = 15;
var myWMachine, myMop;
var resultWMachine, resultMop;
var pressDone5 = false;
var pressDone6 = false;

//------------------------------------------------•°o.O PreLoad O.o°•

function preload() {
    myBg = loadImage('images/background.png');
    BathroomBack = loadImage('images/bathroom.png');
    TubBack = loadImage('images/tub-back.png');
    KitchenBack = loadImage('images/kitchen.png');
    table = loadImage('images/table.png');
    iron = loadImage('images/iron.png');
    LaundryBack = loadImage('images/laundry.png');
}

//------------------------------------------------•°o.O Setup O.o°•
function setup() {
    createCanvas(windowWidth,windowHeight);    
    
/////////////////////////////////////////// BUTTONS Translate bg
// Start to Bathroom
    buttonStart = createButton("→<br>Let's start!");
    buttonStart.id("startButton");
    buttonStart.size(250,90);
    buttonStart.position(width/2,height/3*2);
    buttonStart.mousePressed(StartToBath);
// Bathroom to Kitchen
    buttonBathroom = createButton("");
    buttonBathroom.id("toKitchen");
    buttonBathroom.position(width-110,height/2);
    buttonBathroom.size(50,49);
    buttonBathroom.mousePressed(BathToKitchen);
    buttonBathroom.hide();
// Kitchen to Laundry
    buttonKitchen = createButton("");
    buttonKitchen.id("toLaundry");
    buttonKitchen.position(width-110,height/2);
    buttonKitchen.size(50,49);
    buttonKitchen.mousePressed(KitchenToLaundry);
    buttonKitchen.hide();

/////////////////////////////////////////// START
//-----> INPUT NAME
    var inputName = createInput();
    inputName.id("inputName");
    inputName.position(width/2+10,height/1.8-44);
    inputName.size(350,60);
    inputName.value = text;
    // Placeholder
    document.getElementById("inputName").placeholder = "your name..";

////    Need to expand your window
    Expand = createSprite(width/2,height/2,1,1);
    var ExpandAnimation = Expand.addAnimation("Expand", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png");
    Expand.addAnimation("NotExpand", "images/expand_none.png");
    
////    Restart Button
    restartButton= createButton("Restart");
    restartButton.position(width/10,height/5);
    restartButton.mousePressed(restart);
    restartButton.hide();
    
/////////////////////////////////////////// LAUNDRY
    // Washing machine
    WMachine = createSprite(width/2,height/2,1,1);
    var WMachineAnimation = WMachine.addAnimation("WMClosed", "images/washing_machine-closed.png");
    WMachine.addAnimation("WMOpened", "images/washing_machine-opened.png");
    WMachine.addAnimation("WMGlow", "images/washing_machine-closed.png","images/washing_machine-glow.png"); //*
    // Mop
    Mop = createSprite(width/2,height/2,1,1);
    var MopAnimation = Mop.addAnimation("MopNotInUse", "images/mop-visible.png");
    Mop.addAnimation("MopInUse", "images/mop-hidden.png");
    Mop.addAnimation("MopGlow", "images/mop-visible.png", "images/mop-glow.png"); //*

//-----> INPUT Laundry
    // > Washing machine
    selWMachine = createSelect();
    selWMachine.position(width/10,height/8.2);
    selWMachine.size(130,20);
    selWMachine.option('Eco');
    selWMachine.option('Mix');
    selWMachine.option('Intensive');
    selWMachine.hide();
    
    WMachineSlider = createSlider(0,1,0);
    WMachineSlider.position(170+width/10,height/8);
    WMachineSlider.size(28,10);
    WMachineSlider.hide();
    
    input = createInput();
    input.id("numWMachine");
    input.position(215+width/10,height/6.3);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numWMachine");
    input.placeholder = 3;
    document.getElementById("numWMachine").style.visibility = "hidden";
    
    buttonDone5 = createButton("Done!");
    buttonDone5.position(width/10,height/5);
    buttonDone5.mousePressed(Q5results);
    buttonDone5.hide();
    
    // > Mop
    mopSlider = createSlider(1,10,3);
    mopSlider.position(width/10,height/6.5);
    mopSlider.hide();
    
    input = createInput();
    input.id("numMop");
    input.position(280+width/10,height/12.7);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numMop");
    input.placeholder = 2;
    document.getElementById("numMop").style.visibility = "hidden";
    
    buttonDone6 = createButton("Done!");
    buttonDone6.position(width/10,height/5);
    buttonDone6.mousePressed(Q6results);
    buttonDone6.hide();
    
/////////////////////////////////////////// KITCHEN
    // Dish
    Dish = createSprite(width/2,height/2,1,1);
    var DishAnimation = Dish.addAnimation("Dish_none", "images/dish.png");
    Dish.addAnimation("Dishwasher", "images/dish_dishwasher.png");
    Dish.addAnimation("Sink", "images/dish_sink1.png", "images/dish_sink1.png", "images/dish_sink1.png", "images/dish_sink2.png", "images/dish_sink2.png", "images/dish_sink2.png");
    Dish.addAnimation("DishGlow", "images/dish.png", "images/dish-glow.png"); //*
    // Garden
    Garden = createSprite(width/2,height/2,1,1);
    var GardenAnimation = Garden.addAnimation("Kwindow", "images/windowK-closed.png");
    Garden.addAnimation("Kwindow_open", "images/windowK-opened.png");
    Garden.addAnimation("GardenGlow", "images/windowK-closed.png", "images/garden-glow.png"); //*
    
//-----> INPUT Kitchen
    // > Dish
    buttonHands = createButton("By hands");
    buttonHands.mousePressed(handsOptions);
    buttonHands.position(width/10,height/8.5);
    buttonHands.hide();
    
    buttonDishwasher = createButton("Dishwasher");
    buttonDishwasher.mousePressed(dishwasherOptions);
    buttonDishwasher.position(80+width/10,height/8.5);
    buttonDishwasher.hide();
    
    handsSlider = createSlider(1,40,5);
    handsSlider.position(width/10,height/5.4);
    handsSlider.hide();
    
    selDishwasher = createSelect();
    selDishwasher.position(width/10,height/5.4);
    selDishwasher.size(130,20);
    selDishwasher.option('Eco');
    selDishwasher.option('Daily');
    selDishwasher.option('Intensive');
    selDishwasher.hide();
    
    input = createInput();
    input.id("numDishwasher");
    input.position(215+width/10,height/4.6);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numDishwasher");
    input.placeholder = 6;
    document.getElementById("numDishwasher").style.visibility = "hidden";
    
    buttonDone3 = createButton("Done!");
    buttonDone3.position(width/10,height/3.8);
    buttonDone3.mousePressed(Q3results);
    buttonDone3.hide();
    
    // > Garden
    buttonYes = createButton("Yes");
    buttonYes.mousePressed(yesOptions);
    buttonYes.position(width/10,height/8.5);
    buttonYes.hide();
    
    buttonNo = createButton("No");
    buttonNo.mousePressed(noOptions);
    buttonNo.position(60+width/10,height/8.5);
    buttonNo.hide();
    
    input = createInput();
    input.id("mqGarden");
    input.position(80+width/10,height/6.5);
    input.size(25,15);
    //placeholder
    input = document.getElementById("mqGarden");
    input.placeholder = 100;
    document.getElementById("mqGarden").style.visibility = "hidden";
    
    selGarden = createSelect();
    selGarden.position(width/10,height/4.5);
    selGarden.size(130,20);
    selGarden.option('Hose');
    selGarden.option('Sprinkler');
    selGarden.hide();
    
    gardenSlider = createSlider(1,60,10);
    gardenSlider.position(width/10,height/3.5);
    gardenSlider.hide();
    
    buttonDone4 = createButton("Done!");
    buttonDone4.position(width/10,height/3);
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
    Jack.addAnimation("clothes", "images/Jack_clothes.png");
    Jack.addAnimation("mop", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop1.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png", "images/Jack_mop2.png");
    // RESULTS
    Jack.addAnimation("swimming", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png");
    Jack.addAnimation("float", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png");
    
/////////////////////////////////////////// BATHROOM
    // Bathtub - Tub
    Bath = createSprite(JackX,JackY,height/2.4,height/1.6);
    var BathAnimation = Bath.addAnimation("bath_before", "images/tub-front.png");
    Bath.addAnimation("shower", "images/shower1.png", "images/shower1.png", "images/shower1.png", "images/shower2.png", "images/shower2.png", "images/shower2.png", "images/shower3.png", "images/shower3.png", "images/shower3.png");
    Bath.addAnimation("bath_none", "images/tub0.png");
    Bath.addAnimation("bath_tub", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub2.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub3.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub4.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png", "images/tub5.png");
    
    Sink = createSprite(JackX,JackY,height/2.4,height/1.6); //*
    var SinkAnimation = Sink.addAnimation("Sink_before", "images/mop-hidden.png");
    Sink.addAnimation("SinkGlow", "images/mop-hidden.png", "images/mop-hidden.png", "images/mop-hidden.png", "images/mop-hidden.png", "images/sink-glow.png", "images/sink-glow.png", "images/sink-glow.png", "images/sink-glow.png");
    
//-----> INPUT Bathroom
    // > Shower
    buttonShower = createButton("Shower");
    buttonShower.mousePressed(showerOptions);
    buttonShower.position(width/10,height/8.5);
    buttonShower.hide();
    
    buttonTub = createButton("Bath");
    buttonTub.mousePressed(tubOptions);
    buttonTub.position(60+width/10,height/8.5);
    buttonTub.hide();
    
    showerSlider = createSlider(1,60,10);
    showerSlider.position(width/10,height/5.4);
    showerSlider.hide();
    
    input = createInput();
    input.id("numShower");
    input.position(250+width/10,height/4.6);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numShower");
    input.placeholder = 5;
    document.getElementById("numShower").style.visibility = "hidden";
    
    selTub = createSelect();
    selTub.position(width/10,height/5.4);
    selTub.size(130,20);
    selTub.option('Full');
    selTub.option('Half-full');
    selTub.hide();
    
    input = createInput();
    input.id("numBaths");
    input.position(230+width/10,height/4.6);
    input.size(25,15);
    //placeholder
    input = document.getElementById("numBaths");
    input.placeholder = 4;
    document.getElementById("numBaths").style.visibility = "hidden";
    
    buttonDone1 = createButton("Done!");
    buttonDone1.position(width/10,height/3.8);
    buttonDone1.mousePressed(Q1results);
    buttonDone1.hide();
    
    // > Teeth
    
    teethSlider = createSlider(1,10,1);
    teethSlider.position(width/10,height/8.5);
    teethSlider.hide();
    
    buttonDone2 = createButton("Done!");
    buttonDone2.position(width/10,height/6);
    buttonDone2.mousePressed(Q2results);
    buttonDone2.hide();
}

//------------------------------------------------•°o.O Draw O.o°•
function draw(){  
    background("#a6cdda");
    
////    Need to expand your window    
        Expand.position.x=width*0.5;
        Expand.position.y=height*0.3;
        Expand.scale=width/1000;

    if (width/height <= 1.3) {
        push();
        textSize(width/15);
        textAlign(CENTER);
        textFont("Lato");
        fill(255);
        text("Please,\nextend and refresh\nyour browser window!",width/2,height/2);
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
        
/////////////////////////////////////////// BACKGROUND
    buttonStart.show();
    document.getElementById("inputName").style.visibility='visible';
    
    if (percent<100){
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
        image(LaundryBack,lx,py,wx,hy);
        pop();
    }
        
/////////////////////////////////////////// RESULTS - WAVES        
    if(pressDone6===false){
        percent=0;
    } else {
        document.getElementById("water").style.visibility='visible';
    }
        
    if (percent==100){
        document.getElementById("water").style.visibility='hidden';
        WMachine.visible=false;
        Mop.visible=false;
    }
        
/////////////////////////////////////////// START
// DROP
    if(stateStart==false){
        dropy=dropy+5;

        if (dropy>=height/6*5.8) {
            dropy=height/6*5.8;
        }
    
    // DropWaves
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
    
    // DropWaves
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
        
    if (stateStart==false){
        fill(255);
        textSize(40);
        textAlign(RIGHT);
        textFont("Lato");
        text('Hi,',width/2,y+height/1.8);
        pop();
    }
        
    if (keyCode == ENTER) {
        stateStart = true;
    }
        
//(()) BUTTON - Start to Bathroom
    if(stateStart==true){
        y=y-6; //REMOVE 6

        if (y<-height) {
            y=-height;
        };
    
        buttonStart.hide();
        document.getElementById("inputName").style.visibility='hidden';
    }
        
/////////////////////////////////////////// JACK Size
//<3 JACK fall - resize
    if (y==0){
        Jack.scale = width/1552;    // 0.88
    } 
    if (y<0){
        Jack.scale -= 0.01;
    }
    var JackScale = width/2134;
    
    if (Jack.scale <= JackScale && percent<100){
        Jack.scale = JackScale;   
        Jack.position.y=height*0.64;
        moving=false;
    } if (pressDone1==true && percent<100){
        Jack.position.y=height*0.56;
    } 
    
    //// RESULTS - WAVES
    if (percent > 90 && percent < 100){                 
        Jack.position.y=height*1.5;
    } 
    if (percent > 90){
        swimming=true;
    }
    if (Jack.position.y<=height*0.5){
        swimming=false;
        Jack.position.y=height*0.5;
    }

    //draw the sprite
    drawSprites();

/////////////////////////////////////////// BATHROOM
    // Bathtub
    var AnimationScale=width/2265;
    Bath.position.x=x+width*0.5;
    Bath.position.y=y+height*1.5;
    Bath.scale=AnimationScale;
        
    // Sink
    var AnimationScale=width/2265;
    Sink.position.x=x+width*0.5;
    Sink.position.y=y+height*1.5;
    Sink.scale=AnimationScale;
    
//-----> INPUT Shower
    if(y<=-height && pressDone1==false){
        
        text("Do you prefer to take a shower or a bath?", width/10,height/10);
        buttonShower.show();
        buttonTub.show();
    
        if(pressShower===true){
            text("How long does the shower last?", width/10,height/5.8);
        
            showerSlider.show();
            showerMinutes = showerSlider.value();
            
            if(showerMinutes===1){
                text(showerMinutes+" minute",140+width/10,height/4.9);
            } else {
            text(showerMinutes+" minutes",140+width/10,height/4.9);}
          
            text("How many showers do you take each week?", width/10,height/4.2);
            document.getElementById("numShower").style.visibility = "visible";
        
            buttonDone1.show();
        }
        
        if(pressTub===true){
        text("How much do you fill your bathtub?", width/10,height/5.8);
        selTub.show();
        
        text("How many baths do you take each week?", width/10,height/4.2);
        document.getElementById("numBaths").style.visibility = "visible";
        
        buttonDone1.show();
        }
    }
    
    if(y<=-height && pressDone1==false){
        
        Bath.changeAnimation("bath_before");
    
    }
    
    if(pressDone1===true){
      
        if(pressTub===true){
            if(selTub.value() === 'Full') {
                tubCapacity = bathroomData[1];
            } else if (selTub.value() === 'Half-full') {
                tubCapacity = bathroomData[2];
            }
        
        bathWeek = document.getElementById("numBaths").value;
        
        myBath = week * bathWeek * tubCapacity;
        
        resultShower = 0;
        
        if(myBath !== 0 && myBath !== defaultBath){
          resultBath = myBath;
        } else { resultBath = defaultBath; }

        }
      
        if(pressShower===true){
        
            showerMinutes = showerSlider.value();
        
            showerWeek = document.getElementById("numShower").value;
        
            myShower = week * showerWeek * showerMinutes * bathroomData[0];
        
            resultBath = 0;
        
            if(myShower !== 0 && myShower !== defaultShower){
                resultShower = myShower;
            } else { resultShower = defaultShower; }
        
        }  
    
    }
    
    if (pressDone1==true) {
        Bath.changeAnimation("bath_none");
        moving=true;
        Sink.changeAnimation("SinkGlow"); //*
    } else if (pressTub==true){
        Bath.changeAnimation("bath_tub");
    } else if (pressShower==true){
        Bath.changeAnimation("shower");
    }
    
//-----> INPUT Sink
    if (Jack.position.x>=width/10*6.5 && x==0 && pressDone2==false) {
        moving=false;
        
        text("How many minutes do you spend to brushing your teeth?", width/10,height/10);
        teethSlider.show();
        buttonDone2.show();
        
        Jack.position.x=width/10*6.5;
    
        teethMinutes = teethSlider.value();
        if(teethMinutes===1){
            text(teethMinutes+ " minute", 140+width/10,height/7.4);
        } else {
            text(teethMinutes+ " minutes", 140+width/10,height/7.4); }

        }
  
    if(pressDone2===true){
        
        teethWeek = 14;
        
        myTeeth = week * teethWeek * teethMinutes * bathroomData[0];
        
        if(myTeeth !== 0 && myTeeth !== defaultTeeth){
          resultTeeth = myTeeth;
        } else { resultTeeth = defaultTeeth; }
      
        buttonDone2.hide();
    }
        
    if(pressDone2===true){
        Sink.changeAnimation("Sink_before"); //*
        moving=true;
        buttonBathroom.show();
    }
        
    if(pressDone2==true && Jack.position.x>=width/8*7){ //*
        stateBath = true;
    }

//(()) BUTTON - Bathroom to Kitchen
    if(stateBath==true){
        x=x-10; // REMOVE 10
        
        if (x<-width) {
            x=-width;
        } 
        
        buttonBathroom.hide();
    }
    if(stateBath==true && x>-width){
        Jack.position.x=Jack.position.x-11;
        
        if (Jack.position.x<100) {
            Jack.position.x=100;
            
        }
    }
        
/////////////////////////////////////////// KITCHEN
    // Dishwasher
    Dish.position.x=x+width*1.5;
    Dish.position.y=y+height*1.5;
    Dish.scale=AnimationScale;
    
//-----> INPUT Dish
    if (Jack.position.x>=width/4.5 && x==-width && pressDone1===true && pressDone2===true && pressDone3===false) {
        
        moving=false;

        Jack.position.x=width/4.5;
            
        text("How do you clean your dishes?", width/10,height/10);
        buttonHands.show();
        buttonDishwasher.show();
    
        if(pressHands===true){
            text("How many minutes the faucet is turned on?", width/10,height/5.8);
        
            handsSlider.show();
            handsMinutes = handsSlider.value();
        
            if(handsMinutes===1){
                text(handsMinutes+" minute",140+width/10,height/4.9);
            } else {
                text(handsMinutes+" minutes",140+width/10,height/4.9);
            }
        
            buttonDone3.show();
        }
    
        if(pressDishwasher===true){
            text("Set your dishwasher…", width/10,height/5.8);
            selDishwasher.show();
        
            text("How many times a week do you run it?", width/10,height/4.2);
            document.getElementById("numDishwasher").style.visibility = "visible";
        
            buttonDone3.show();
        } 
    }
  
  if(pressDone3===true){
      
      if(pressDishwasher===true){
        if(selDishwasher.value() === 'Eco') {
          dishwasherProgram = kitchenData[1];
        } else if (selDishwasher.value() === 'Daily') {
          dishwasherProgram = kitchenData[2];
        } else if (selDishwasher.value() === 'Intensive') {
          dishwasherProgram = kitchenData[3];
        }
      }
        
        dishwasherWeek = document.getElementById("numDishwasher").value;
        
        myDishwasher = week * dishwasherWeek * dishwasherProgram;
        
        resultHands = 0;
        
        if(myDishwasher !== 0 && myDishwasher !== defaultDishwasher){
          resultDishwasher = myDishwasher;
        } else { resultDishwasher = defaultDishwasher; }

      }
      
      if(pressHands===true){
        
        handsMinutes = handsSlider.value();
        
        handsWeek = 10;
        
        myHands = week * handsWeek * handsMinutes * kitchenData[0];
            
        resultDishwasher = 0;
        
        if(myHands !== 0 && myHands !== defaultHands){
          resultHands = myHands;
        } else { resultHands = defaultHands; }
        
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
    if (Jack.position.x>=width/5*4 && x==-width && pressDone1===true && pressDone2===true && pressDone3===true && pressNo===false && pressDone4===false) {
        moving=false;
        
            text("Do you have a garden?", width/10,height/10);
            buttonYes.show();
            buttonNo.show();
        
        Jack.position.x=width/5*4;
        
        if(pressYes===true){
      
            text("How big is it?", width/10,height/5.8);
        
            document.getElementById("mqGarden").style.visibility = "visible";
            text("square meters", 120+width/10,height/5.8);
        
            text("How do you water?",width/10,height/4.8);
            selGarden.show();
        
            text("How long do you water each time?", width/10,height/3.7);
            gardenSlider.show();
            gardenMinutes = gardenSlider.value();
        
            if(gardenMinutes===1){
                text(gardenMinutes+" minute",140+width/10,height/3.3);
            } else {
                text(gardenMinutes+" minutes",140+width/10,height/3.3);
            }
        
            buttonDone4.show();
        }
        
        if(pressNo===true) {
            resultGarden=0;
        }
    }
        
        if(pressNo===true || pressDone4===true){

            if(pressYes === true){
      
                sizeGarden = document.getElementById("mqGarden").value;
    
                if(selGarden.value() === 'Hose') {
                    waterGarden = gardenData[0];
                } else if (selGarden.value() === 'Sprinkler') {
                    waterGarden = gardenData[1];
                }
        
                gardenMinutes = gardenSlider.value();
      
                gardenWeek = 1;
        
                myGarden = week * gardenWeek * sizeGarden * gardenMinutes * waterGarden;
        
                if(myGarden !== 0 && myGarden !== defaultGarden){
                    resultGarden = myGarden;
                } else { resultGarden = defaultGarden; }
      
            } else { resultGarden = 0; }
            
            moving=true;
            buttonKitchen.show();
        }
    
    if(Jack.position.x==width/5*4 && x==-width && pressDone4===false && pressNo===false) {
        Garden.changeAnimation("Kwindow_open");
    } else {
        Garden.changeAnimation("Kwindow");
    }
<<<<<<< HEAD
        
    if (pressDone4==true || pressNo==true){
        moving=true;
        buttonKitchen.show();
    }
=======
>>>>>>> origin/master
    
//(()) BUTTON - Kitchen to Laundry
    if(stateKitchen==true){
        x=x-10; // REMOVE 10

        if (x<-width*2) {
            x=-width*2;
        }
        
        buttonBathroom.hide();
        buttonKitchen.hide();
    }
    
    if(stateKitchen==true && x>-width*2){
        Jack.position.x=Jack.position.x-11;
        
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
    if(Jack.position.x>=width/5*2 && x==-width*2 && pressDone5===false){
        
        moving=false;
        Jack.position.x=width/5*2;
    
        text("Set your washine machine...", width/10,height/10);
        selWMachine.show();
        WMachineSlider.show();
    
        text("40°",150+width/10,height/7.2);
        text("60°",210+width/10,height/7.2);
    
        text("How many times a week do you run it?", width/10,height/5.6);
        document.getElementById("numWMachine").style.visibility = "visible";
    
        buttonDone5.show();

    }
  
    if(pressDone5===true){
    
        moving=true;
      
        if(selWMachine.value() === 'Eco' && WMachineSlider.value() === 0){
            WMachineProgram = laundryData[1];
        } else if(selWMachine.value() === 'Eco' && WMachineSlider.value() === 1){
            WMachineProgram = laundryData[2];
        } else if(selWMachine.value() === 'Mix' && WMachineSlider.value() === 0){
            WMachineProgram = laundryData[3];
        } else if(selWMachine.value() === 'Mix' && WMachineSlider.value() === 1){
            WMachineProgram = laundryData[4];
        } else if(selWMachine.value() === 'Intensive' && WMachineSlider.value() === 0){
            WMachineProgram = laundryData[5];
        } else if(selWMachine.value() === 'Intensive' && WMachineSlider.value() === 1){
            WMachineProgram = laundryData[6];
        }
        
        WMachineWeek = document.getElementById("numWMachine").value;
        
        myWMachine = week * WMachineWeek * WMachineProgram;
        
        if(myWMachine !== 0 && myWMachine !== defaultWMachine){
          resultWMachine = myWMachine;
        } else { resultWMachine = defaultWMachine; }
      
    }
    
            
    if (x==-width*2 && Jack.position.x>=width/5*2 && pressDone5===false){
        WMachine.changeAnimation("WMOpened");
    } else {
        WMachine.changeAnimation("WMClosed");
    }
    
// Mop
    Mop.position.x=x+width*2.5;
    Mop.position.y=y+height*1.5;
    Mop.scale=AnimationScale;
    
//-----> INPUT Mop   
    if(Jack.position.x>=width/5*4 && x==-width*2 && pressDone6===false){
        
        moving=false;
        Jack.position.x=width/5*4;
    
        text("How many times a week do you clean your house?", width/10,height/10);
        document.getElementById("numMop").style.visibility = "visible";
    
        text("How many mop bucket do you fill?", width/10,height/7.4);
        mopSlider.show();
    
        bucketMop = mopSlider.value();
    
        if(bucketMop===1){
            text(bucketMop+" bucket",140+width/10,height/5.7);
        } else {
            text(bucketMop+" buckets",140+width/10,height/5.7);}
    
        buttonDone6.show();
  }
  
  if(pressDone6===true){
      
        moving=true;
        
        mopWeek = document.getElementById("numWMachine").value;
        
        myMop = week * mopWeek * bucketMop;
        
        if(myMop !== 0 && myMop !== defaultMop){
          resultMop = myMop;
        } else { resultMop = defaultMop; }
        
  }
    
    if (Jack.position.x>=width/5*4 && x==-width*2 && pressDone6===false) {
        Mop.changeAnimation("MopInUse");
    } else {
        Mop.changeAnimation("MopNotInUse");
    }
        
/////////////////////////////////////////// RESULTS
    // Name
    if (pressDone6===true){
        
        text("Results: "+resultShower+", "+resultBath+", "+resultTeeth+", "+resultHands+", "+resultDishwasher+", "+resultGarden+", "+resultWMachine+", "+resultMop, 20,20);
        
        Result = resultMop + resultWMachine + resultGarden + resultDishwasher + resultHands + resultTeeth + resultBath + resultShower;
        
        userName = document.getElementById("inputName").value;
        
        if(userName=="" || userName==null || userName==undefined){
        text("You used "+Result+" liters of water!", 20,40);
        } else { text(userName+", you used "+Result+" liters of water!", 20,40); }
        
        restartButton.show();
        
    }
        
    if (percent>=95){
        moving=false;
        Jack.scale = width/1600;    // RIMPICCIOLIRE JACK
        Jack.position.x=width/6;
    }
        
/////////////////////////////////////////// JACK Animation <3
        // move left
        if(mouseX < Jack.position.x - 10 && moving==true) {
<<<<<<< HEAD
            Jack.changeAnimation("moving");
            //flip horizontally
            Jack.mirrorX(-1);
            Jack.velocity.x = - 4 // REMOVE -4
=======
        Jack.changeAnimation("moving");
        //flip horizontally
        Jack.mirrorX(-1);
        //negative x velocity: move left
        Jack.velocity.x = - 4 // REMOVE -4
>>>>>>> origin/master
        }
        // move right
        else if(mouseX > Jack.position.x + 10 && moving==true) {
<<<<<<< HEAD
            Jack.changeAnimation("moving");
            //unflip 
            Jack.mirrorX(1);
            Jack.velocity.x = 4 // REMOVE 4
=======
        Jack.changeAnimation("moving");
        //unflip 
        Jack.mirrorX(1);
        Jack.velocity.x = 4 // REMOVE 4
>>>>>>> origin/master
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
        else if (y<=-height && Jack.position.y==height*0.64 && pressDone1==false) {
            Jack.changeAnimation("shower");
            Jack.velocity.x = 0;   
        } 
        // don't move > toothbrush
        else if (Jack.position.x==width/10*6.5 && pressDone2==false && x==0) {
<<<<<<< HEAD
            Sink.changeAnimation("Sink_before"); //*
            Jack.changeAnimation("toothbrush");
            Jack.velocity.x = 0;   
=======
        Sink.changeAnimation("Sink_before"); //*
        Jack.changeAnimation("toothbrush");
        Jack.velocity.x = 0;   
>>>>>>> origin/master
        }     
        // don't move > dish
        else if (Jack.position.x==width/4.5 && x==-width && pressDone3===false) {
            Jack.changeAnimation("dish");
            Jack.velocity.x = 0;   
        }     
        // don't move > garden
        else if (Jack.position.x==width/5*4 && x==-width && pressDone4===false) {
            Jack.changeAnimation("garden");
            Jack.velocity.x = 0;   
        }     
        // don't move > washing machine
        else if (Jack.position.x==width/5*2 && x==-width*2 && pressDone5===false) {
            Jack.changeAnimation("clothes");
            Jack.velocity.x = 0;   
        }     
        // don't move > mop
        else if (Jack.position.x==width/5*4 && x==-width*2 && pressDone6===false) {
            Jack.changeAnimation("mop");
            Jack.velocity.x = 0;   
        }
        // swimming > bottom to up
        else if(swimming==true && moving==false && Jack.position.y > height*0.5) {
            Jack.changeAnimation("swimming");
            Jack.mirrorX(1);
            Jack.velocity.y = - 4 // REMOVE -4
        }
        // swimming > stay floating > results
        else if(swimming==false && moving==false && Jack.position.y==height*0.5) {
            Jack.changeAnimation("float");
            Jack.velocity.y = 0
        }
        // don't move > stand
        else {
            Jack.changeAnimation("stand");
            Jack.velocity.y = 0;
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
    if (percent<100){
        var lx=x+width*2.5;
        image(iron,lx,py,wx,hy);
    }
    pop();
    
// fine del draw, non cancellare le due parentesi
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
function showerOptions(){
    if(pressShower===false && pressTub===false){
        pressShower=true;
    } else if(pressShower===false && pressTub===true){
        pressTub=false;
        selTub.hide();
        document.getElementById("numBaths").style.visibility = "hidden";
        pressShower=true;
    }
}

function tubOptions(){
    if(pressTub===false && pressShower===false){
        pressTub=true;
    } else if(pressTub===false && pressShower===true){
        pressShower=false;
        showerSlider.hide();
        document.getElementById("numShower").style.visibility = "hidden";
        pressTub=true;
    }
}

function Q1results(){
    if(pressDone1===false){
      pressDone1=true;
        buttonShower.hide();
        showerSlider.hide();
        document.getElementById("numShower").style.visibility = "hidden";
        buttonTub.hide();
        selTub.hide();
        document.getElementById("numBaths").style.visibility = "hidden";
        buttonDone1.hide();
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
        buttonYes.hide();
        buttonNo.hide();
        document.getElementById("mqGarden").style.visibility = "hidden";
        selGarden.hide();
        gardenSlider.hide();
        buttonDone4.hide();
    }
}

//------------------------------------------------•°o.O Laundry O.o°•

function Q5results() {
    if(pressDone5===false){
        pressDone5=true;
        selWMachine.hide();
        WMachineSlider.hide();
        document.getElementById("numWMachine").style.visibility = "hidden";
        buttonDone5.hide();
    }
}

function Q6results() {
    if(pressDone6===false){
        pressDone6=true;
        document.getElementById("numMop").style.visibility = "hidden";
        mopSlider.hide();
        buttonDone6.hide();
    }
}

// button RESTART

function restart() {
    location.reload();
}

//------------------------------------------------•°o.O Window resize O.o°•
function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}
