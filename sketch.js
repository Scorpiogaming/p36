//Create variables here
var dog,dogImg,dogImg1,database,foodStock,x;
var foodS,fedTime,lastFed,feed,addFood,foodObj;
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000, 800);
  foodObj=new Food();
  dog=createSprite(400,350,50,50);
  dog.addImage(dogImg);
  dog.scale=0.5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background("lightgreen");
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill(255,255,254);
  textSize(14);
  if(lastFed>=12){
    text("last Feed="+lastFed%12+"PM",350,30);
  }else if(lastfed==0){
    text("last Feed=12AM",350,30)
  }else {
    text("last Feed="+lastFed+"AM",350,30)
  }
 
  drawSprites();
  //add styles here
    fill("red");
    textSize(15);
     text("food remaining="+foodS,170,200);
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


