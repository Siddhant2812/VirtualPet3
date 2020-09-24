var dog,dogImg, happyDog, database,fedTime;
var food,foodS;
var lastFed = 0;
var fedT;
var datetime,response,responseJSON,hours;
var currenttime;
var bedroom,garden,lazy,livingRoom,washroom;
var gameState = 0;


function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedrooom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  lazy = loadImage("images/Lazy.png");
  livingRoom = loadImage("images/Living Room.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  lastFed = database.ref('FeedTime');
  lastFed.on("value",function (data){
    fedTime = data.val();
  });

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  dog = createSprite(400,400,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  feed.mouseReleased(resetDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() { 
  background(46,139,87);
  //console.log(datetime)
  foodObj.getFoodStock();
  foodObj.display();

  currenttime = hour();
  if(currenttime ==(lastFed+1)||currenttime===lastFed){
    update(1)
    foodObj.garden();
  }
  else if(currenttime==(lastFed+2)){
    update(2);
    foodObj.bedroom();
  }
  else if(currenttime>(lastFed+2)&&currenttime<=(lastFed+4)){
    update(3);
    foodObj.washroom();
  }

  else if(currenttime>lastFed+4){
    update(4);
  }

  if(gameState===1){
    foodObj.garden();
  }

  textSize(20);
  fill(255,255,255)

  if(fedTime!==undefined){
    if(fedTime>=12){
      text("lastFed:"+fedTime%12+"PM",100,100);
    }

    if(fedTime===0){
      text("lastFed:12AM",100,100);
    }

    if(fedTime<12){
      text("lastFed:"+fedTime+"AM",100,100);
    }
}

//console.log(gameState);

  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  fedT = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function resetDog(){
  dog.addImage(dogImg);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

async function hour(){
   response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
   responseJSON = await response.json();

   datetime = responseJSON.datetime;
   hours = datetime.slice(11,13);
   return hours;
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}