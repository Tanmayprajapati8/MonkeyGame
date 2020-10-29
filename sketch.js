
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  //adding image here
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  //making ground sprite
  ground=createSprite(280,260,1200,10);
  ground.velocityX=-8;
  
  //making monkey sprite
  monkey=createSprite(50,200,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  //creating new group
  foodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  //giving background color
  background(180);

  //scoreboard
  text("score:"+score,540,20);
  
//creating play state
if(gameState===PLAY){
    //adding gravity
  monkey.velocityY=monkey.velocityY+0.8;
  
  //setting collide for monkey
  monkey.collide(ground);
  
  if(keyDown("space")&&monkey.y>=224){
    monkey.velocityY=-12;
  }
  if(foodGroup.isTouching(monkey)){
    score=score+5;
    foodGroup.destroyEach();  
  }
  
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    
  }
  bananaspawn();
  obstaclesGroup();
  if(ground.x<=0){
    ground.x=ground.width/2;
  }
  
}

  //creating gamestate end
  if(gameState===END){
    
    //gameover text
    textSize(20);
    stroke(10);
    fill("red");
    text("Game Over",280,150);
   
    //giving ground velocity and monkey
    ground.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    
    //destroying food and obstacle group
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
        //adding gravity



    
  }


  drawSprites();
  
}

function bananaspawn(){
  if(frameCount%60===0){
    banana=createSprite(600,100,20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-8;
    banana.scale=0.1;
    banana.lifetime = 80;
    banana.y=Math.round(random(80,180));
    foodGroup.add(banana);
}
}

function obstaclesGroup(){
  if(frameCount%60===0){
      obstacle=createSprite(600,240,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-8;
      obstacle.scale=0.1;  
      obstacle.lifetime=80;
    obstacleGroup.add(obstacle);

  } 
}


