//Create variables here

var dog, happyDog, dogImg, happyDogImg;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
dogImg = loadImage("images/dogImg.png");
happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas( 500, 500);
  
  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite( 250, 350, 50, 50);
  dog.addImage("normal",dogImg);

  //happyDog = createSprite( 250, 250, 50, 50);
 //happyDog.addImage("fed",happyDogImg);
}


function draw() {  
  background( 46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    foodS = foodS - 1;
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here

  textSize(25);
  text("Note:Press UP_ARROW to Feed the Dog",250,50);

  textSize(20);
  text("Food Left: " + foodS, 250, 200);
 
}

function readStock(data){
  foodS=data.val();
}


function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}

