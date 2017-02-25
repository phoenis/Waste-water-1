//////////////////////// TIME
var timeSinkGlow;
var timeSinkOverGlow;
var timeGardenGlow;
var timeWMGlow;
var timeMopGlow;
var timeGlow=3500;

//////////////////////// WAVES
var cnt=document.getElementById("count"); 
var water=document.getElementById("water");
document.getElementById("water").style.visibility='hidden';
var percent=cnt.innerText;
var interval;
interval=setInterval(function(){ 
    percent++; 
    cnt.innerHTML = percent; 
    water.style.transform='translate(0'+','+(100-percent)+'%)';
    },40);

var week = 1;
var userName;
var Result;
var x = 0;
var y = 0;
var myBg, myBg_small, BathroomBack, TubBack, myTub, mySound, myImage, Jack_info;
var buttonStart, buttonBathroom, buttonKitchen;     // Change room
var stateStart=false;
var stateBath=false;
var stateKitchen=false;
var Expand,Jack,Bath,Sink,Dish,Garden,WMachine,Mop;     // Animations
var moving=false;
var swimming=false;
var speedUP=false;

var infoButton, seeCode;
var pressInfo=false;
var soundButton;
var restartButton;
var shareButton;
var pressShare=false;
var fbButton, twButton, pinButton;

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
var defaultBath = 600;
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
var defaultHands = 500;
var defaultDishwasher = 77;
var buttonYes, buttonNo, selGarden, gardenSlider, buttonDone4;
var sizeGarden, gardenMinutes, waterGarden;
var defaultGarden = 1000;
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
var defaultWMachine = 135;
var defaultMop = 40;
var myWMachine, myMop;
var resultWMachine, resultMop;
var pressDone5 = false;
var pressDone6 = false;

//------------------------------------------------•°o.O PreLoad O.o°•

function preload() {
    myBg = loadImage('images/background.png');
    myBg_small = loadImage("images/background_small.png");
    Jack_info = loadImage("images/Jack_stand.png");
    BathroomBack = loadImage('images/bathroom.png');
    TubBack = loadImage('images/tub-back.png');
    KitchenBack = loadImage('images/kitchen.png');
    table = loadImage('images/table.png');
    iron = loadImage('images/iron.png');
    LaundryBack = loadImage('images/laundry.png');
    myTub=loadImage("images/wastetub.png");
    mySound = loadSound('sound/cute.mp3');
}

//------------------------------------------------•°o.O Setup O.o°•
function setup() {
    createCanvas(windowWidth,windowHeight);

/////////////////////////////////////////// MUSIC
    analyzer = new p5.Amplitude();
    analyzer.setInput(mySound);
    mySound.loop(); //LOOP
    
/////////////////////////////////////////// BUTTONS Translate bg
// Start to Bathroom
    buttonStart = createButton("Let's start!");
    buttonStart.id("startButton");
    buttonStart.size(width/8,height/18);
    buttonStart.position(width/1.87,height/1.35);
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
    inputName.position(width/1.92,height/2.08);
    inputName.size(width/3,height/10);
    inputName.value = text;
    // Placeholder
    document.getElementById("inputName").placeholder = "your name..";

////    Need to expand your window
    Expand = createSprite(width/2,height/2,1,1);
    var ExpandAnimation = Expand.addAnimation("Expand", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand1.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand2.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png", "images/expand3.png");
    Expand.addAnimation("NotExpand", "images/expand_none.png");
    
////    Button RESTART - SHARE - INFO - SOUND
    restartButton=createButton("Restart");
    restartButton.addClass("button");
    restartButton.position(width/18.8,43*height/48);
    restartButton.mousePressed(restart);
    restartButton.hide();
    
    shareButton=createButton("Share");
    shareButton.id("share");
    shareButton.addClass("button");
    shareButton.position(width/8,43*height/48);
    shareButton.mousePressed(shareOptions);
    shareButton.hide();

    fbButton=createButton("");
    fbButton.id("facebook");
    fbButton.position(width/5.5,43.3*height/48);
    fbButton.size(width/30,width/30);
    fbButton.mousePressed(shareFb);
    fbButton.hide();
 
    twButton=createButton("");
    twButton.id("twitter");
    twButton.position(width/4.9,43.3*height/48);
    twButton.size(width/30,width/30);
    twButton.mousePressed(shareTw);
    twButton.hide();
    
    pinButton=createButton("");
    pinButton.id("pinterest");
    pinButton.position(width/4.4,43.3*height/48);
    pinButton.size(width/30,width/30);
    pinButton.mousePressed(sharePin);
    pinButton.hide();

    infoButton=createButton("");
    infoButton.id("info");
    infoButton.addClass("info");
    infoButton.position(width/38,height/30);
    infoButton.size(width/30,width/30);
    infoButton.mousePressed(infoBox);
    infoButton.show();

    soundButton=createButton("");
    soundButton.id("sound");
    soundButton.addClass("sound");
    soundButton.position(width/18.8,height/30);
    soundButton.size(width/30,width/30);
    soundButton.mousePressed(playSound);
    soundButton.show();
    
    seeCode=createButton("see code on github");
    seeCode.id("seeCode");
    seeCode.position(width/2.1,height/1.32);
    seeCode.size(width/8.5,width/50);
    seeCode.mousePressed(github);
    seeCode.hide();
    
/////////////////////////////////////////// LAUNDRY
    // Washing machine
    WMachine = createSprite(width/2,height/2,1,1);
    var WMachineAnimation = WMachine.addAnimation("WMClosed", "images/washing_machine-closed.png");
    WMachine.addAnimation("WMOpened", "images/washing_machine-opened.png");
    WMachine.addAnimation("WMGlow", "images/washing_machine-closed.png", "images/washing_machine-closed.png", "images/washing_machine-closed.png", "images/washing_machine-closed.png", "images/washing_machine-closed.png", "images/washing_machine-closed.png", "images/washing_machine-glow.png", "images/washing_machine-glow.png", "images/washing_machine-glow.png", "images/washing_machine-glow.png", "images/washing_machine-glow.png", "images/washing_machine-glow.png");
    // Mop
    Mop = createSprite(width/2,height/2,1,1);
    var MopAnimation = Mop.addAnimation("MopNotInUse", "images/mop-visible.png");
    Mop.addAnimation("MopInUse", "images/mop-hidden.png");
    Mop.addAnimation("MopGlow", "images/mop-visible.png", "images/mop-visible.png", "images/mop-visible.png", "images/mop-visible.png", "images/mop-visible.png", "images/mop-visible.png", "images/mop-glow.png", "images/mop-glow.png", "images/mop-glow.png", "images/mop-glow.png", "images/mop-glow.png", "images/mop-glow.png");

//-----> INPUT Laundry
    // > Washing machine
    selWMachine = createSelect();
    selWMachine.addClass("selection");
    selWMachine.position(width/1.64,height/5.7);
    selWMachine.size(width/10,height/25);
    selWMachine.option('Mix');
    selWMachine.option('Eco');
    selWMachine.option('Intensive');
    selWMachine.hide();
    
    WMachineSlider = createSlider(0,1,0);
    WMachineSlider.size(width/40,20);
    WMachineSlider.position(width/1.325,height/5.6);
    WMachineSlider.hide();
    
    input = createInput();
    input.id("numWMachine");
    input.position(width/1.64,height/3.43);
    input.size(width/40,height/20);
    //placeholder
    input = document.getElementById("numWMachine");
    input.placeholder = 3;
    document.getElementById("numWMachine").style.visibility = "hidden";
    
    buttonDone5 = createButton("Done!");
    buttonDone5.addClass("button");
    buttonDone5.position(width/1.46,height/2.7);
    buttonDone5.size(width/15,height/18);
    buttonDone5.mousePressed(Q5results);
    buttonDone5.hide();
    
    // > Mop
    mopSlider = createSlider(1,10,4);
    mopSlider.position(width/8.3,height/3.05);
    mopSlider.size(width/8,0);
    mopSlider.hide();
    
    input = createInput();
    input.id("numMop");
    input.position(width/8.3,height/5);
    input.size(width/40,height/20);
    //placeholder
    input = document.getElementById("numMop");
    input.placeholder = 2;
    document.getElementById("numMop").style.visibility = "hidden";
    
    buttonDone6 = createButton("Done!");
    buttonDone6.addClass("button");
    buttonDone6.position(width/5.15,height/2.6);
    buttonDone6.size(width/15,height/18);
    buttonDone6.mousePressed(Q6results);
    buttonDone6.hide();
    
/////////////////////////////////////////// KITCHEN
    // Dish
    Dish = createSprite(width/2,height/2,1,1);
    var DishAnimation = Dish.addAnimation("Dish_none", "images/dish.png");
    Dish.addAnimation("Dishwasher", "images/dish_dishwasher.png");
    Dish.addAnimation("Sink", "images/dish_sink1.png", "images/dish_sink1.png", "images/dish_sink1.png", "images/dish_sink2.png", "images/dish_sink2.png", "images/dish_sink2.png");
    // Garden
    Garden = createSprite(width/2,height/2,1,1);
    var GardenAnimation = Garden.addAnimation("Garden_closed", "images/windowK-closed.png");
    Garden.addAnimation("Garden_open", "images/windowK-opened.png");
    Garden.addAnimation("GardenGlow", "images/windowK-closed.png", "images/windowK-closed.png", "images/windowK-closed.png", "images/windowK-closed.png", "images/windowK-closed.png", "images/windowK-closed.png", "images/windowK-glow.png", "images/windowK-glow.png", "images/windowK-glow.png", "images/windowK-glow.png", "images/windowK-glow.png", "images/windowK-glow.png");
    
//-----> INPUT Kitchen
    // > Dish
    buttonHands = createButton("By hand");
    buttonHands.addClass("button");
    buttonHands.id("buttonHands");
    buttonHands.size(width/10,height/18);
    buttonHands.position(width/1.64,height/5.3);
    buttonHands.mousePressed(handsOptions);
    buttonHands.hide();
    
    buttonDishwasher = createButton("Dishwasher");
    buttonDishwasher.addClass("button");
    buttonDishwasher.id("buttonDishwasher");
    buttonDishwasher.size(width/10,height/18);
    buttonDishwasher.position(width/1.39,height/5.3);
    buttonDishwasher.mousePressed(dishwasherOptions);
    buttonDishwasher.hide();
    
    handsSlider = createSlider(1,40,10);
    handsSlider.position(width/1.64,height/2.55);
    handsSlider.size(width/8,0);
    handsSlider.hide();
    
    selDishwasher = createSelect();
    selDishwasher.addClass("selection");
    selDishwasher.position(width/1.64,height/3.1);
    selDishwasher.size(width/10,height/25);
    selDishwasher.option('Daily');
    selDishwasher.option('Eco');
    selDishwasher.option('Intensive');
    selDishwasher.hide();
    
    input = createInput();
    input.id("numDishwasher");
    input.position(width/1.64,height/2.18);
    input.size(width/40,height/20);
    //placeholder
    input = document.getElementById("numDishwasher");
    input.placeholder = 7;
    document.getElementById("numDishwasher").style.visibility = "hidden";
    
    buttonDone3 = createButton("Done!");
    buttonDone3.addClass("button");
    buttonDone3.size(width/15,height/18);
    buttonDone3.mousePressed(Q3results);
    buttonDone3.hide();
    
    // > Garden
    buttonYes = createButton("Yes");
    buttonYes.addClass("button");
    buttonYes.id("buttonYes");
    buttonYes.size(width/10,height/18);
    buttonYes.position(width/8.3,height/5.3);
    buttonYes.mousePressed(yesOptions);
    buttonYes.hide();
    
    buttonNo = createButton("No");
    buttonNo.addClass("button");
    buttonNo.size(width/10,height/18);
    buttonNo.position(width/4.3,height/5.3);
    buttonNo.mousePressed(noOptions);
    buttonNo.hide();
    
    input = createInput();
    input.id("mqGarden");
    input.position(width/4.75,height/3.8);
    input.size(width/20,height/20);
    //placeholder
    input = document.getElementById("mqGarden");
    input.placeholder = 100;
    document.getElementById("mqGarden").style.visibility = "hidden";
    
    selGarden = createSelect();
    selGarden.addClass("selection");
    selGarden.position(width/8.3,height/2.68);
    selGarden.size(width/10,height/25);
    selGarden.option('Sprinkler');
    selGarden.option('Hose');
    selGarden.hide();
    
    gardenSlider = createSlider(1,60,10);
    gardenSlider.position(width/8.3,height/2.02);
    gardenSlider.size(width/8,0);
    gardenSlider.hide();
    
    buttonDone4 = createButton("Done!");
    buttonDone4.addClass("button");
    buttonDone4.size(width/15,height/18);
    buttonDone4.position(width/5.15,height/1.82);
    buttonDone4.mousePressed(Q4results);
    buttonDone4.hide();
    
/////////////////////////////////////////// BATHROOM - SINK
    // Bathtub - Sink    
    Sink = createSprite(JackX,JackY,height/2.4,height/1.6); //*
    var SinkAnimation = Sink.addAnimation("Sink_before", "images/sink.png");
    Sink.addAnimation("SinkGlow", "images/sink.png", "images/sink.png", "images/sink.png", "images/sink.png", "images/sink-glow.png", "images/sink-glow.png", "images/sink-glow.png", "images/sink-glow.png");
     
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
    Jack.addAnimation("swimming", "images/Jack_swimming1.png", "images/Jack_swimming1.png", "images/Jack_swimming1.png", "images/Jack_swimming1.png", "images/Jack_swimming2.png", "images/Jack_swimming2.png", "images/Jack_swimming2.png", "images/Jack_swimming2.png");
    Jack.addAnimation("float", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating1.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png", "images/Jack_floating2.png");  
    Jack.addAnimation("bravo", "images/Jack_bravo1.png", "images/Jack_bravo1.png", "images/Jack_bravo1.png", "images/Jack_bravo1.png", "images/Jack_bravo1.png", "images/Jack_bravo1.png", "images/Jack_bravo2.png", "images/Jack_bravo2.png", "images/Jack_bravo2.png", "images/Jack_bravo2.png", "images/Jack_bravo2.png", "images/Jack_bravo2.png");  
    Jack.addAnimation("bad", "images/Jack_bad1.png", "images/Jack_bad1.png", "images/Jack_bad1.png", "images/Jack_bad1.png", "images/Jack_bad1.png", "images/Jack_bad1.png", "images/Jack_bad2.png", "images/Jack_bad2.png", "images/Jack_bad2.png", "images/Jack_bad2.png", "images/Jack_bad2.png", "images/Jack_bad2.png");    
    
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
    buttonShower.addClass("button");
    buttonShower.id("buttonShower");
    buttonShower.size(width/10,height/18);
    buttonShower.position(width/1.64,height/4.5);
    buttonShower.mousePressed(showerOptions);
    buttonShower.hide();
    
    buttonTub = createButton("Bath");
    buttonTub.addClass("button");
    buttonTub.id("buttonTub");
    buttonTub.size(width/10,height/18);
    buttonTub.position(width/1.39,height/4.5);
    buttonTub.mousePressed(tubOptions);
    buttonTub.hide();
    
    showerSlider = createSlider(1,60,10);
    showerSlider.addClass("slider");
    showerSlider.size(width/8,20);
    showerSlider.position(width/1.64,height/2.8);
    showerSlider.hide();
    
    input = createInput();
    input.id("numShower");
    input.position(width/1.64,height/2.08);
    input.size(width/40,height/20);
    //placeholder
    input = document.getElementById("numShower");
    input.placeholder = 5;
    document.getElementById("numShower").style.visibility = "hidden";
    
    selTub = createSelect();
    selTub.addClass("selection");
    selTub.position(width/1.64,height/2.85);
    selTub.size(width/10,height/25);
    selTub.option('Full');
    selTub.option('Half-full');
    selTub.hide();
    
    input = createInput();
    input.id("numBaths");
    input.position(width/1.64,height/2.08);
    input.size(width/40,height/20);
    //placeholder
    input = document.getElementById("numBaths");
    input.placeholder = 4;
    document.getElementById("numBaths").style.visibility = "hidden";
    
    buttonDone1 = createButton("Done!");
    buttonDone1.addClass("button");
    buttonDone1.size(width/15,height/18);
    buttonDone1.position(width/1.46,height/1.75);
    buttonDone1.mousePressed(Q1results);
    buttonDone1.hide();
    
    // > Teeth
    
    teethSlider = createSlider(1,10,1);
    teethSlider.position(width/8.3,height/4);
    teethSlider.size(width/8,0);
    teethSlider.hide();
    
    buttonDone2 = createButton("Done!");
    buttonDone2.addClass("button");
    buttonDone2.position(width/5.15,height/3);
    buttonDone2.size(width/15,height/18);
    buttonDone2.mousePressed(Q2results);
    buttonDone2.hide();
    
    //FinalTubs
    myImage = createSprite(width/2,height/2);
    myImage.addAnimation("waste", "images/wastetub.png","images/wastetub.png","images/wastetub.png","images/wastetub.png","images/wastetub2.png","images/wastetub2.png","images/wastetub2.png","images/wastetub2.png"); 
}

//------------------------------------------------•°o.O Draw O.o°•
function draw(){  
    background("#a6cdda");
    myImage.visible=false;
    Sink.visible=false;
    
////    Need to expand your window    
        Expand.position.x=width*0.5;
        Expand.position.y=height*0.3;
        Expand.scale=width/1000;

    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        push();
        textSize(width/18);
        textAlign(CENTER);
        textStyle(NORMAL);
        textFont("Lato");
        fill(255);
        text("We are sorry,\nbut this website is not yet\navailable on the mobile.",width/2,height/2);
        fill(0, 102, 153);
        pop();
        
        buttonStart.hide();
        document.getElementById("inputName").style.visibility='hidden';
        mySound.stop();
        infoButton.hide();
        soundButton.hide();
        
        Jack.visible=false;
        Bath.visible=false;
        Dish.visible=false;
        Garden.visible=false;
        WMachine.visible=false;
        Mop.visible=false;
        
        drawSprites();
    } else {
    Expand.changeAnimation("NotExpand");
    Sink.visible=true;
        
/////////////////////////////////////////// BACKGROUND
    fill("#58595b");
    textSize(height/100*2.5);
    textFont("Lato");
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
        image(table,kx,py,wx,hy);
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
        
    if (percent>=100){
        document.getElementById("water").style.visibility='hidden';
        WMachine.visible=false;
        Mop.visible=false;
    }
        
/////////////////////////////////////////// START
// DROP
    if(stateStart==false){
        fill(255);
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
            dropy=height/5.5;
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
    dropx = width/5*4.091;
    if (dropy>=height/6*5.8 || dropy<height/6) {
        fill(255,0);
    } else { fill(255); }
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
    text("HOW MUCH WATER DO YOU USE?",width/2,y+height/5.5);
    pop();
// TEXT - Hi x!
    push();
    if (stateStart==false){
        fill(255);
        textSize((width/100)*3.5);
        textAlign(LEFT);
        textFont("Lato");
        text("Hi,",width/2.13,height/1.81);
    }
    pop();
    push();
    if (stateStart==false){
        fill(color('rgba(255, 255, 255, 0.7)'));
        textSize((width/100)*2.5);
        textAlign(LEFT);
        textFont("Lato");
        text("I'm Jack. Are you ready\nto find it out together?",width/2.13,height/1.6);
    }
    pop();
        
// Start to Bathroom        
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
    } 
    if (pressDone1==true && percent<100){
        Jack.position.y=height*0.56;
    } 

    //draw the sprite
    drawSprites();

/////////////////////////////////////////// BATHROOM
    // Bathtub
    var AnimationScale=width/1405;
    Bath.scale=AnimationScale;
    Bath.position.x=x+width*0.2935;
    Bath.position.y=y+height*1.5+width*0.057;
        
    // Sink
    Sink.scale=AnimationScale;
    Sink.position.x=x+width*0.706;
    Sink.position.y=y+height*1.5+width*0.026;
    
//-----> INPUT Shower
    if(y<=-height && pressDone1==false){
        push();
        noStroke();
        fill(color('rgba(255, 255, 255, 0.9)'));
        rect(width/1.7, height/10, width/3.6, height/1.69, 20);
        pop();
        
        text("Do you prefer to take a shower\nor a bath?", width/1.64,height/6.2);
        buttonShower.show();
        buttonTub.show();
    
        if(pressShower===true){
            document.getElementById("buttonShower").className = "selected"; 
            document.getElementById("buttonTub").className = "button"; 
     
            text("How long does the shower last?", width/1.64,height/3);
        
            showerSlider.show();
            showerMinutes = showerSlider.value();
            
            push();
            textSize(height/100*2.2);
            if(showerMinutes===1){
                text(showerMinutes+" minute",width/1.34,height/2.65);
            } else {
            text(showerMinutes+" minutes",width/1.34,height/2.65);}
            pop();
          
            text("How many showers do you take\neach week?", width/1.64,height/2.3);
            document.getElementById("numShower").style.visibility = "visible";

            push();
            textSize(height/100*2.2);
            text("times",width/1.56,height/1.93);
            pop();
        
            buttonDone1.show();
        }
        
        if(pressTub===true){
            document.getElementById("buttonShower").className = "button";
            document.getElementById("buttonTub").className = "selected";
            
            text("How much do you fill your bathtub?", width/1.64,height/3);
            selTub.show();
        
            text("How many baths do you take\neach week?", width/1.64,height/2.3);
            document.getElementById("numBaths").style.visibility = "visible";
            
            push();
            textSize(height/100*2.2);
            text("times",width/1.56,height/1.93);
            pop();
        
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
        speedUp=false;
    } else if (pressTub==true){
        Bath.changeAnimation("bath_tub");
    } else if (pressShower==true){
        Bath.changeAnimation("shower");
    }
    
//-----> INPUT Sink
    if (Jack.position.x>=width/10*6.5 && x==0 && pressDone2==false) {
        moving=false;
        push();
        noStroke();
        fill(color('rgba(255, 255, 255, 0.9)'));
        rect(width/10, height/10, width/3.6, height/2.8, 20);
        pop();
        
        text("How long do you leave the tap running\nwhile you are brushing your teeth?", width/8.3,height/6.2);
        teethSlider.show();
        buttonDone2.show();
        
        Jack.position.x=width/10*6.5;
        
        push();
        textSize(height/100*2.2);
        teethMinutes = teethSlider.value();
        if(teethMinutes===1){
            text(teethMinutes+ " minute", width/3.9,height/3.9);
        } else {
            text(teethMinutes+ " minutes", width/3.9,height/3.9); }
        pop();
        }
  
    if(pressDone2===true){
        Sink.onMousePressed = function() {}
        teethWeek = 14;
        
        myTeeth = week * teethWeek * teethMinutes * bathroomData[0];
        
        if(myTeeth !== 0 && myTeeth !== defaultTeeth){
          resultTeeth = myTeeth;
        } else { resultTeeth = defaultTeeth; }
      
        buttonDone2.hide();
    }
        
    if(pressDone2===true){
        Sink.onMouseOver = function() {this.changeAnimation("Sink_before");}    //*
        Sink.changeAnimation("Sink_before");
        moving=true;
        buttonBathroom.show();
    }
        
    if(pressDone2==true && pressDone3==false && Jack.position.x>=width/8*7){
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
        Jack.position.x=Jack.position.x-13;
        
        if (Jack.position.x<100) {
            Jack.position.x=100;
            
        }
    }
        
/////////////////////////////////////////// KITCHEN
    // Dishwasher
    Dish.scale=AnimationScale;
    Dish.position.x=x+width*1.373;
    Dish.position.y=y+height*1.52;
    
//-----> INPUT Dish
    if (Jack.position.x>=width/4.5 && x==-width && pressDone3===false) {
        moving=false;
        Jack.position.x=width/4.5;

        push();
        noStroke();
        fill(color('rgba(255, 255, 255, 0.9)'));
        rect(width/1.7, height/10, width/3.6, height/1.8, 20);
        pop();
            
        text("How do you wash your dishes?", width/1.64,height/6.2);
        buttonHands.show();
        buttonDishwasher.show();
    
        if(pressHands===true){
            document.getElementById("buttonHands").className = "selected"; 
            document.getElementById("buttonDishwasher").className = "button";
 
            text("How long do you leave the tap running\nwhile you are doing your dishes?", width/1.64,height/3.3);
        
            handsSlider.show();
            handsMinutes = handsSlider.value();
            
            push();
            textSize(height/100*2.2);
            if(handsMinutes===1){
                text(handsMinutes+" minute",width/1.34,height/2.5);
            } else {
                text(handsMinutes+" minutes",width/1.34,height/2.5);
            }
            pop();
        
            buttonDone3.show();
            buttonDone3.position(width/1.46,height/2.1);
        }
    
        if(pressDishwasher===true){
            document.getElementById("buttonHands").className = "button"; 
            document.getElementById("buttonDishwasher").className = "selected"; 
    
            text("Set the dishwasher program…", width/1.64,height/3.3);
            selDishwasher.show();
        
            text("How many times a week\ndo you run it?", width/1.64,height/2.4);
            document.getElementById("numDishwasher").style.visibility = "visible";
            
            push();
            textSize(height/100*2.2);
            text("times",width/1.56,height/2.03);
            pop();
        
            buttonDone3.show();
            buttonDone3.position(width/1.46,height/1.82);
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
            moving=true;  //<<AGGIUNGI
        } else if (pressHands==true){
            Dish.changeAnimation("Sink");
        } else if (pressDishwasher==true){
            Dish.changeAnimation("Dishwasher");
        }

// Window garden
    Garden.scale=AnimationScale;
    Garden.position.x=x+width*1.725;
    Garden.position.y=y+height*1.5-width*0.17;
        
    if (pressDone3==true && pressDone4==false && pressNo==false && Jack.position.y!=width/5*4) { 
        Garden.onMousePressed = function() {activeSpeed();}
    } else {
        Garden.onMousePressed = function() {}
    }

//-----> INPUT Window garden 
    if (Jack.position.x>=width/5*4 && x==-width && pressNo===false && pressDone4===false) {
        moving=false;
        
        push();
        noStroke();
        fill(color('rgba(255, 255, 255, 0.9)'));
        rect(width/10, height/10, width/3.6, height/1.8, 20);
        pop();

        text("Do you have a garden?", width/8.3,height/6.2);
            buttonYes.show();
            buttonNo.show();
        
        Jack.position.x=width/5*4;
        
        if(pressYes===true){
            document.getElementById("buttonYes").className = "selected";
            
            text("How big is it?", width/8.3,height/3.3);
        
            document.getElementById("mqGarden").style.visibility = "visible";
            push();
            textSize(height/100*2.2);
            text("square meters", width/3.75,height/3.3);
            pop();
        
            text("How do you water it?",width/8.3,height/2.8);
            selGarden.show();
        
            text("How long do you water each time?", width/8.3,height/2.2);
            gardenSlider.show();
            gardenMinutes = gardenSlider.value();
            
            push();
            textSize(height/100*2.2);
            if(gardenMinutes===1){
                text(gardenMinutes+" minute",width/3.9,height/2);
            } else {
                text(gardenMinutes+" minutes",width/3.9,height/2);
            }
            pop();
        
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
            }
        
        if(pressNo===true || pressDone4===true){
            Garden.changeAnimation("Garden_closed");
            moving=true;
            buttonKitchen.show();
        }
    
    if (Jack.position.x==width/5*4 && x==-width && pressDone4===false && pressNo===false) {
        Garden.changeAnimation("Garden_open");
    }
        
    if (pressDone4==true || pressNo==true){
        Garden.onMouseOver = function() {this.changeAnimation("Garden_closed");}    //*
        moving=true;
        buttonKitchen.show();
    }
                  
    if (x==-width*2 && Jack.position.x!=width/5*2 && pressDone5==false){
        WMachine.onMouseOver = function() {this.changeAnimation("WMGlow");}     //*
    }
        
    if(pressDone5==false && Jack.position.x>=width/8*7){
        stateBath=false;
        stateKitchen=true;
    }
    
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
        Jack.position.x=Jack.position.x-13;
        
        if (Jack.position.x<100) {
            Jack.position.x=100;
            
        }
    }
/////////////////////////////////////////// LAUNDRY
// Washing machine
    WMachine.scale=AnimationScale;
    WMachine.position.x=x+width*2.502;
    WMachine.position.y=y+height*1.5+width*0.0475;
        
    if (pressDone3==true && pressDone5==false && x==-width*2 && Jack.position.x!=width/5*2) {
        WMachine.onMousePressed = function() {activeSpeed();}
    } else {
        WMachine.onMousePressed = function() {}
    }
    
//-----> INPUT Washing machine    
    if(Jack.position.x>=width/5*2 && x==-width*2 && pressDone5===false){
        moving=false;
        WMachine.changeAnimation("WMOpened");
        Jack.position.x=width/5*2;
        
        push();
        noStroke();
        fill(color('rgba(255, 255, 255, 0.9)'));
        rect(width/1.7, height/10, width/3.6, height/2.6, 20);
        pop();
    
        text("Set the washine machine program...",width/1.64,height/6.2);
        selWMachine.show();
        WMachineSlider.show();
    
        push();
        textSize(height/100*2.2);
        text("40°",width/1.37,height/5);
        text("60°",width/1.27,height/5);
        pop();
    
        text("How many times a week do you\nrun it?",width/1.64,height/3.9);
        document.getElementById("numWMachine").style.visibility = "visible";
        
        push();
        textSize(height/100*2.2);
        text("times",width/1.56,height/3.07);
        pop();
    
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
    
        if(pressDone5===true){
            WMachine.onMouseOver = function() {this.changeAnimation("WMClosed");}
            WMachine.changeAnimation("WMClosed");
            moving=true;
        }
            
    if (x==-width*2 && Jack.position.x>=width/5*2 && pressDone5===false){
        WMachine.changeAnimation("WMOpened");
    }
    
// Mop
    Mop.scale=AnimationScale;
    Mop.position.x=x+width*2.8;
    Mop.position.y=y+height*1.5+width*0.02;
        
    if (pressDone5==true && pressDone6==false && Jack.position.y!=width/5*4) {
        Mop.onMousePressed = function() {activeSpeed();}
    } else {
        Mop.onMousePressed = function() {}
    }
    
//-----> INPUT Mop   
    if(Jack.position.x>=width/5*4 && x==-width*2 && pressDone6===false){
        moving=false;
        Jack.position.x=width/5*4;
        
        push();
        noStroke();
        fill(color('rgba(255, 255, 255, 0.9)'));
        rect(width/10, height/10, width/3.6, height/2.6, 20);
        pop();
    
        text("How many times a week do you\nclean your house?",width/8.3,height/6.2);
        document.getElementById("numMop").style.visibility = "visible";
    
        text("How many mop bucket do you fill?", width/8.3,height/3.4);
        mopSlider.show();
        
        push();
        textSize(height/100*2.2);
        text("times",width/6.5,height/4.25);
        pop();
    
        bucketMop = mopSlider.value();
        
        push();
        textSize(height/100*2.2);
        if(bucketMop===1){
            text(bucketMop+" bucket",width/3.9,height/3);
        } else {
            text(bucketMop+" buckets",width/3.9,height/3);}
        pop();
    
        buttonDone6.show();
  }
  
  if(pressDone6===true){
        Mop.onMouseOver = function() {this.changeAnimation("MopNotInUse");}     //*
      
        moving=true;
        
        mopWeek = document.getElementById("numWMachine").value;
        
        myMop = week * mopWeek * bucketMop;
        
        if(myMop !== 0 && myMop !== defaultMop){
          resultMop = myMop;
        } else { resultMop = defaultMop; }
        
  }
    
    if (Jack.position.x>=width/5*4 && x==-width*2 && pressDone6===false) {
        Mop.changeAnimation("MopInUse");
    }
        
/////////////////////////////////////////// RESULTS
// RESULTS
    if (pressDone6===true){
        Result = resultMop + resultWMachine + resultGarden + resultDishwasher + resultHands + resultTeeth + resultBath + resultShower;
        
        userName = document.getElementById("inputName").value;
        userNamemaiuscola = userName.toUpperCase();

        Mop.changeAnimation("MopNotInUse");        
    }
        
        var WaterWaste =Math.round(Result - 700,1);
        var Waste = Math.round(WaterWaste/100);
        
//// RESULTS - WAVES
    if (percent > 90 && percent < 100){                 
        Jack.position.y=height*1.5;
    } 
    if (percent > 90){
        swimming=true;
    }
    if (Jack.position.y<=height/2.2 && Waste>=1){
        swimming=false;
        Jack.position.y=height/2.2;
    }
    if (Jack.position.y<=5*height/8 && Waste<1){
        swimming=false;
        Jack.position.y=5*height/8;
    }            
    if (percent>=95){
        moving=false;
        if(Waste>=1){
        Jack.scale = width/1600;    // RIMPICCIOLIRE JACK
        Jack.position.x=width/6;
        }else{
        Jack.scale = width/2000;    // RIMPICCIOLIRE JACK
        Jack.position.x=width/2;    
        }
    }

// RESULTS tubs & text
    if(percent>=95 &&Jack.position.y==height/2.2 && Waste>=1){
        myImage.visible=true;
        restartButton.show();
        shareButton.show();
        wasteTubs(Waste);
        image(myTub,8*width/24,42.3*height/48,width/30,width/30);    
        fill(255);
        textFont("Lato");
        textAlign(LEFT);
        textSize(height/40);
        textStyle(NORMAL);   
        text("= 100 liters", 9*width/24,45*height/48); 
            
      if(userName=="" || userName==null || userName==undefined){
   
        fill(255);
        textFont("Dosis");
        textAlign(LEFT);
        textSize(width/28);
        textStyle(BOLD);   
        text("YOU USED "+Result+" LITERS OF WATER IN A WEEK!", 8*width/24,3*height/24);
        
        textStyle(NORMAL);
        textFont("Lato");
        textSize(height/100*3.2);
        text("According to the World Health Organization you would need only 700 liters.\nWith the water you wasted, you could fill "+Waste+" bathtubs.", 8*width/24,9*height/48);
          
        } else { 
        fill(255);
        textFont("Dosis");
        textAlign(LEFT);
        textSize(width/28);
        textStyle(BOLD);     
        text(userNamemaiuscola+",", 8*width/24,3*height/24);    
            
        fill(255);
        textFont("Dosis");
        textAlign(LEFT);
        textSize(width/28);
        textStyle(BOLD);     
        text("YOU USED "+Result+" LITERS OF WATER IN A WEEK!", 8*width/24,9*height/48); 
            
        textStyle(NORMAL);
        textFont("Lato");
        textSize(height/100*3.2);     
        text("According to the World Health Organization you would need only 700 liters. \nWith the water you wasted, you could fill  "+Waste+" bathtubs.", 8*width/24,11*height/48);
        }    
  } else if (percent>=95 && Jack.position.y==5*height/8 && Waste<1){
      
        restartButton.show();
        shareButton.show();
      if(userName=="" || userName==null || userName==undefined){
        
        fill(255);
        textFont("Dosis");
        textAlign(CENTER);
        textSize(width/28);
        textStyle(BOLD);   
        text("YOU USED "+Result+" LITERS OF WATER IN A WEEK!", width/2,height/6);
        
        textStyle(NORMAL);
        textFont("Lato");
        textSize(height/100*3.2); 
        text("Compliments! You have respected the amount of water setted by the World Health Organization, \nwhich says that 100 liters per person per day are needed to ensure that most basic human needs.", width/2,2*height/9);  
          
        } else {    
            
        fill(255);    
        textFont("Dosis");
        textAlign(CENTER);
        textSize(height/15);
        textStyle(BOLD);   
        text(userNamemaiuscola+", YOU USED "+Result+" LITERS OF WATER IN A WEEK!", width/2,height/6);
        
        textStyle(NORMAL);
        textFont("Lato");
        textSize(height/100*3.2); 
        text("Compliments! You have respected the amount of water setted by the World Health Organization, \nwhich says that 100 liters per person per day are needed to ensure that most basic human needs.", width/2,2*height/9);  
        }
        } else if(Jack.position.y==height/2.2 && Waste<1){
        myImage.visible=false;
        } else if(Jack.position.y!=height/2.2){
        myImage.visible=false;
        }
/////////////////////////////////////////// JACK Animation <3        
        // moving left
        if(mouseX < Jack.position.x - 10 && moving==true) {
            Jack.changeAnimation("moving");
            //flip horizontally
            Jack.mirrorX(-1);
            Jack.velocity.x = - 5 // REMOVE -5
        }
        // moving right
        else if(mouseX > Jack.position.x + 10 && moving==true) {
            Jack.changeAnimation("moving");
            //unflip 
            Jack.mirrorX(1);
            Jack.velocity.x = 5 // REMOVE 5
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
            speedUp=false;
        } 
        // don't move > toothbrush
        else if (Jack.position.x==width/10*6.5 && pressDone2==false && x==0) {
            Sink.onMouseOver = function() {this.changeAnimation("Sink_before");}    //*
            Sink.changeAnimation("Sink_before");    //*
            Jack.changeAnimation("toothbrush");
            clearInterval(timeSinkGlow);  //<< TIME
            speedUP=false;
            Jack.velocity.x = 0;   
        }     
        // don't move > dish
        else if (Jack.position.x==width/4.5 && x==-width && pressDone3===false) {
            Jack.changeAnimation("dish");
            speedUP=false;
            Jack.velocity.x = 0;   
        }     
        // don't move > garden
        else if (Jack.position.x==width/5*4 && x==-width && pressDone4===false) {
            Garden.onMouseOver = function() {this.changeAnimation("Garden_open");}    //*
            Jack.changeAnimation("garden");
            clearInterval(timeGardenGlow);  //<< TIME
            speedUP=false;
            Jack.velocity.x = 0;   
        }     
        // don't move > washing machine
        else if (Jack.position.x==width/5*2 && x==-width*2 && pressDone5===false) {
            WMachine.onMouseOver = function() {this.changeAnimation("WMOpened");}    //*
            Jack.changeAnimation("clothes");
            clearInterval(timeWMGlow);  //<< TIME
            speedUP=false;
            Jack.velocity.x = 0;   
        }     
        // don't move > mop
        else if (Jack.position.x==width/5*4 && x==-width*2 && pressDone6===false) {
            Mop.onMouseOver = function() {this.changeAnimation("MopInUse");}    //*
            Jack.changeAnimation("mop");
            clearInterval(timeMopGlow);  //<< TIME
            speedUP=false;
            Jack.velocity.x = 0;   
        }
        // swimming > bottom to up
        else if(swimming==true && moving==false && Jack.position.y > height/2.2 && Waste>=1) {
            Jack.changeAnimation("swimming");
            Jack.mirrorX(1);
            Jack.velocity.y = - 5 // REMOVE -5
        }
        else if(swimming==true && moving==false && Jack.position.y > 5*height/8 && Waste<1) {
            Jack.changeAnimation("swimming");
            Jack.mirrorX(1);
            Jack.velocity.y = - 5 // REMOVE -5
        }
        // swimming > stay floating > results
        else if(swimming==false && moving==false && Jack.position.y==height/2.2 && Waste>=1 && Waste<22) {
            Jack.changeAnimation("float");
            Jack.velocity.y = 0
        }
           // swimming > stay floating > results
        else if(swimming==false && moving==false && Jack.position.y==5*height/8 && Waste<1) {
            Jack.changeAnimation("bravo");
            Jack.velocity.y = 0
        }
        else if(swimming==false && moving==false && Jack.position.y==height/2.2 && Waste>=22) {
            restartButton.show();
            shareButton.show();
            Jack.changeAnimation("bad");
            Jack.velocity.y = 0
        }
        // don't move > stand
        else {
            Jack.changeAnimation("stand");
            Jack.velocity.y = 0;
            Jack.velocity.x = 0;
        }    
        // Jack speed up
        if (speedUP==true) {
            Jack.mirrorX(1);
            Jack.velocity.x = 10;
            Jack.changeAnimation("moving");
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
    if(Jack.position.x!=width/4.5){
        image(table,kx,py,wx,hy);}
    // - Laundry
    if (percent<100){
        var lx=x+width*2.5;
        image(iron,lx,py,wx,hy);
    }
    pop();
        
/////////////////////////////////////////// INFO
    if(pressInfo===true){
        push();
        noStroke();
        fill(255);
        rect(200, 75, width-400, height-150, 30);
        pop();
        
        image(Jack_info,width/4.3,height/4.2,width/6.5,width/3.5);
        
        push();
        textSize(height/100*2.5);
        fill("#58595b");
        textFont("Lato");
        textStyle(BOLD);
        text("WHAT?",width/2.1,height/3.8);
        pop();
        
        push();
        textSize(height/100*2.5);
        fill("#58595b");
        textFont("Lato");
        text("This is a university project built in p5.js during the\ncourse Creative Coding at the Politecnico di Milano.\n\nJack will drive you in 3 different rooms where you\nhave to answer questions about your habits.\nAt the end you'll find out how much water you waste\nin average in a week.", width/2.1,height/3.3);
        pop();
        
        push();
        textSize(height/100*2.5);
        fill("#58595b");
        textFont("Lato");
        textStyle(BOLD);
        text("WHO?",width/2.1,height/1.78);
        pop();
        
        push();
        textSize(height/100*2.5);
        fill("#58595b");
        textFont("Lato");
        text("The project is developed by:\n•  Mara Cominardi\n•  Chiara Riente\n•  Sara Pizzatti", width/2.1,height/1.65);
        pop();
        
        seeCode.show();
        
        Jack.visible=false;
        buttonStart.hide();
        buttonShower.hide();
        buttonTub.hide();
        buttonDishwasher.hide();
        buttonHands.hide();
        buttonYes.hide();
        buttonNo.hide();
        buttonDone1.hide();
        buttonDone2.hide();
        buttonDone3.hide();
        buttonDone4.hide();
        buttonDone5.hide();
        buttonDone6.hide();
        showerSlider.hide();
        selTub.hide();
        teethSlider.hide();
        handsSlider.hide();
        selDishwasher.hide();
        selGarden.hide();
        gardenSlider.hide();
        selWMachine.hide();
        WMachineSlider.hide();
        mopSlider.hide();
        buttonBathroom.hide();
        buttonKitchen.hide();
        document.getElementById("inputName").style.visibility = "hidden";
        document.getElementById("numBaths").style.visibility = "hidden";
        document.getElementById("numShower").style.visibility = "hidden";
        document.getElementById("numDishwasher").style.visibility = "hidden";
        document.getElementById("mqGarden").style.visibility = "hidden";
        document.getElementById("numWMachine").style.visibility = "hidden";
        document.getElementById("numMop").style.visibility = "hidden";
    } else {
        Jack.visible = true;
        seeCode.hide();
    }
    
// draw() ends here
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
        
        timeSinkGlow = setInterval(sinkGlow,timeGlow); ///<<TIME
        timeSinkOverGlow = setInterval(sinkOverGlow,250); ///<<TIME OVER        
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
        
        timeGardenGlow = setInterval(gardenGlow,timeGlow); ///<<TIME
        Garden.onMouseOver = function() {this.changeAnimation("GardenGlow");}
    }
}

function yesOptions() {
    if(pressYes===false && pressNo===false){
        pressYes=true;
    } else if(pressYes===false && pressNo===true) {
        pressNo=false;
        pressYes=true;
    }
}

function noOptions() {
    if(pressNo===false && pressYes===false){
        pressNo=true;
        buttonYes.hide();
        buttonNo.hide();
    } else if(pressNo===false && pressYes===true) {
        pressYes=false;
        document.getElementById("mqGarden").style.visibility = "hidden";
        selGarden.hide();
        gardenSlider.hide();
        pressNo=true;
        buttonYes.hide();
        buttonNo.hide();
        buttonDone4.hide();
    }
    
        timeWMGlow = setInterval(wmGlow,timeGlow*2.5); ///<<TIME
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
    
        timeWMGlow = setInterval(wmGlow,timeGlow*2.5); ///<<TIME
}

//------------------------------------------------•°o.O Laundry O.o°•

function Q5results() {
    if(pressDone5===false){
        pressDone5=true;
        selWMachine.hide();
        WMachineSlider.hide();
        document.getElementById("numWMachine").style.visibility = "hidden";
        buttonDone5.hide();
        
        timeMopGlow = setInterval(mopGlow,timeGlow); ///<<TIME
        Mop.onMouseOver = function() {this.changeAnimation("MopGlow");}
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

// button RESTART - SHARE - SOUND - INFO
function github() {
     window.open("https://github.com/JackDoesntWaste/water","_blank");
}

function restart() {
    location.reload();
}

function shareOptions() {
    if(pressShare===false){
        pressShare=true;
        document.getElementById("share").className = "selected";
        fbButton.show();
        twButton.show();
        pinButton.show();
    } else {
        pressShare=false;
        document.getElementById("share").className = "button";
        fbButton.hide();
        twButton.hide();
        pinButton.hide();
    }
}

function shareFb() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fbit.ly%2F2lz8bGq%2F&picture=https%3A%2F%2Fgithub.com%2Fphoenis%2FWaste-water-1%2Fblob%2Fmaster%2Fimages%2Fcard.png%3Fraw%3Dtrue&title=How+much+water+do+you+use%3F&caption=https%3A%2F%2Fbit.ly%2F2F2lz8bGq%2F&quote=&description=Let%27s+find+it+out+with+Jack+%3A%29",'_blank');
}

function shareTw() {
    window.open("https://twitter.com/share?url=https://phoenis.github.io/Waste-water-1/&amp;text=How%20much%20water%20do%20you%20use?%20Let's%20find%20it%20out%20with%20Jack%20on&amp;hashtags=JackDoesntWaste",'_blank');
}

function sharePin() {
    window.open("http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fphoenis.github.io%2FWaste-water-1%2F&media=https://github.com/phoenis/Waste-water-1/blob/master/images/card.png?raw=true&description=Let's%15find%15it%15out%15with%15Jack%15%3A)",'_blank');
}

function infoBox() {
    if(pressInfo===false){
        pressInfo=true;
        document.getElementById("info").className = "infoSelected";
        buttonStart.hide();
    } else {
        pressInfo=false;
        document.getElementById("info").className = "info"; 
    }
}

function playSound() {
    if (mySound.isPlaying()===true) {
        document.getElementById("sound").className = "noSound";
        mySound.pause();
    } else {
        document.getElementById("sound").className = "sound";
        mySound.loop();
    }
}

// Final wasteTubs

function wasteTubs(z){
    
 if(z==1){
    
    myImage.scale=width/4000; 
    myImage.position.x=15*width/24;
    myImage.position.y=9*height/16;
    drawSprites(); 
    
}else if(z==2){
    for(var a=11*width/24; a<width; a+=(1/3)*width){

    myImage.scale=width/4000; 
    myImage.position.x=a;
    myImage.position.y=9*height/16;
    drawSprites(); 
    }
    
}else if(z==3){
    for(var a=10*width/24; a<width; a+=(5/24)*width){

    myImage.scale=width/6000; 
    myImage.position.x=a;
    myImage.position.y=9*height/16;
    drawSprites();   
    }
    
}else if(z>=4 && z<9){

    u=z%4;    
    j=Math.floor(z/4);  
    for(var a=19*width/48; a<=22*width/24; a+=(7*width/48)){
        for(var b=21*height/48;b<=((21*j)*height/48); b+=13*height/48){
    myImage.scale=width/7500; 
    myImage.position.x=a;
    myImage.position.y=b;
    drawSprites(); 
    }
    }
    
    for(var c=19*width/48; c<(2+u)*width/6; c+=7*width/48){
    myImage.scale=width/7500; 
    myImage.position.x=c;
    myImage.position.y=34*height/48;
    drawSprites();
    }
    
}else if(z>=9 && z<=21){
    j=Math.floor(z/7);
    u=z%7;    
         
    for(var a=(9*(width/24)); a<22*width/24; a+=(width/12)){
        for(var b=10*height/24;b<(10/24+j/6)*height; b+=height/6){
    myImage.scale=width/12000; 
    myImage.position.x=a;
    myImage.position.y=b;
    drawSprites();   
    }
    }
    
    for(var c=(9*(width/24)); c<(4+u)*(width/12); c+=(width/12)){
    myImage.scale=width/12000; 
    myImage.position.x=c;
    myImage.position.y=(10/24+(j/6))*height;
    drawSprites();
    }
    
}else if(z>21){
    
    myImage.scale=width/4000; 
    myImage.position.x=12*width/24;
    myImage.position.y=9*height/16;
    drawSprites(); 
    
    fill(255);
        textFont("Dosis");
        textAlign(LEFT);
        textSize(height/4);
        textStyle(BOLD);     
        text("⨯"+z, 16*width/24,11*height/16);       
}else if(z==0){
    myImage.visible=false;
}   
    
}

//------------------------------------------------•°o.O Window resize O.o°•
function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

//------------------------------------------------•°o.O TIME Glow O.o°•
function sinkGlow(){
    Sink.changeAnimation("SinkGlow");
}

function sinkOverGlow(){
    Sink.onMouseOver = function() {this.changeAnimation("SinkGlow");}
    Sink.onMousePressed = function() {activeSpeed();}
}

function gardenGlow(){
    Garden.changeAnimation("GardenGlow");
}

function wmGlow(){
    WMachine.changeAnimation("WMGlow");
}

function mopGlow(){
    Mop.changeAnimation("MopGlow");
}

function activeSpeed() {
    speedUP=true;
    moving=false;
}
