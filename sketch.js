
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score , survialTime
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(600, 200);
   monkey = createSprite(50,140,60,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
   ground = createSprite(400,180,1000,10);
   ground.x = ground.width /2;
  ground.scale =1.5;
console.log(ground.x);
 bananaGroup = createGroup();
  obstacleGroup = createGroup();
   //score
  score = 0;
  survialTime = 0;
  ground.visible = false;
  
  monkey.setCollider("circle",50,140,5);
  monkey.debug = false;
  
  
}


function draw() {
  background ('white');
 // if(gameState==="play"){
 
   if(gameState === PLAY){
  
  if(keyDown("space") && monkey.y > 140) {
        monkey.velocityY = -13;
  
  }
  monkey.velocityY = monkey.velocityY + 0.8
   monkey.collide(ground);
  //console.log(monkey.y);
  
  ground.velocityX = -4;
    
spwanBanana();
  spawnObstacles();  
    
    if(monkey.isTouching(bananaGroup)){
    score = score+1;
  // monkey.scale=0.12;
      bananaGroup.destroyEach();
    }
  
  
     
     
  if (ground.x < 0) {
  ground.x = ground.width / 2;
  }
     
     if(monkey.isTouching(obstacleGroup)){
  gameState = END;
       text('GAME OVER', 200,200);
 }
   }
  drawSprites();
   stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 300, 20);
  
  //displaying score
  stroke("black");
    fill("black");
      textSize(20);
  survialTime = Math.ceil(frameCount/frameRate());
  text("Score:"+  score, 200, 20)
  
  
  if(gameState === END){
   
   
     
   
   monkey.velocityY=0;
   ground.velocityX = 0;
        
   
   survialTime = 0;
    score = 0;
   
    obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);   
   
    obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
 }
  
  


  
  
  
  
  

  
}



function spwanBanana(){
 
  if (frameCount % 100 === 0) {
     banana = createSprite(600,150,40,10);
    banana.y = Math.round(random(10,60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
     banana.lifetime = 200;
    bananaGroup.add(banana);
  }
  
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -6;
    obstacle.addImage( obstaceImage);
   obstacle.scale = 0.1;
  obstacleGroup.add(obstacle);
  }
}







