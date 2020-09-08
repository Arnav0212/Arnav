var trex,trex_running,trex_collided;
var ground,ground2;
var play=1,over=0,gamestate=play;
var cloud1;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score=0;      
var cloudsgrp,obstaclesgrp;
var restartI,restart;
var gameoverI,gameover;
var checkpoint
var die
var jump



function preload() {
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png"); 
  ground2=loadImage("ground2.png");
  cloud1=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trex_collided=loadAnimation("trex_collided.png");
  gameoverI=loadImage("gameOver.png");
  restartI=loadImage("restart.png");
  checkpoint=loadSound("checkPoint.mp3")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")

}

function setup() {
  createCanvas(400,400);
  trex = createSprite (100,300,20,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.45;
 
  trex.debug=true; 
  
  ground = createSprite (200,322,400,5);
  ground.addImage (ground2);
  
  cloudsgrp=new Group();
  obstaclesgrp=new Group();
  
   restart=createSprite(200,150,5,5);
   restart.addImage(restartI);
  
  restart.scale=0.65;
  restart.visible = false;
  gameover=createSprite(200,200,5,5);
  gameover.addImage(gameoverI);
  gameover.scale=0.75; 
  gameover.visible = false;
  
  
}

function draw() {
  background(180);
           
  if (gamestate===play){

    ground.velocityX=-6;                         
  
    if (ground.x<0)    
    ground.x=200  
  
    if ( keyDown("space")&& trex.y>264){
    trex.velocityY=-6;   
    jump.play()  
    }
    trex.velocityY=trex.velocityY+0.5;
         
      
    
   text (score,100,50)
    
    if (frameCount % 2===0) { 
    score=score+1;              
      
    }
    
  if (obstaclesgrp.isTouching(trex))
    gamestate=over
      
 
    
     
    
    
    
  spawnobstacles() ;   
spawnclouds ();      
  }  
  
 if (gamestate===over) { 
   ground.velocityX=0; 
   trex.velocityY=0;
    restart.visible = true;
   gameover.visible = true;
   die.play();
   obstaclesgrp.setVelocityXEach(0); 
   cloudsgrp.setVelocityXEach(0); 
   cloudsgrp.setLifetimeEach(-1);
   obstaclesgrp.setLifetimeEach(-1);
   trex.changeAnimation("collided",trex_collided);
 
   if (mousePressedOver(restart)){
     reset();
     
   }
     
     
  }     
    
           
  trex.collide(ground); 
  drawSprites ();
}        

function spawnclouds () {
if (frameCount % 60===0){
 var cloud = createSprite(400,150,20,20)
 cloud.addImage(cloud1)
 cloud.scale=0.75
 cloud.velocityX=-5;
 cloud.lifetime=80
  cloudsgrp.add(cloud);
}            
}

function spawnobstacles(){

if (frameCount % 80===0){
 var cactus = createSprite(400,300,20,20);
 var r = Math.round(random(1,6));
 cactus.velocityX=-5  
  cactus.lifetime=80;
  obstaclesgrp.add(cactus); 
  
  switch (r)
  { 
  case 1 :cactus.addImage(obstacle1)
   cactus.scale=0.5;   
   break ;
      
  case 2 :cactus.addImage(obstacle2)
       cactus.scale=0.5; 
    break ;
      
  case 3 :cactus.addImage(obstacle3)
       cactus.scale=0.5; 
      break ;
      
  case 4 :cactus.addImage(obstacle4)
       cactus.scale=0.5; 
    break ;
        
  case 5 :cactus.addImage(obstacle5) 
       cactus.scale=0.5; 
   break ;
         
  case 6 :cactus.addImage(obstacle6)
       cactus.scale=0.5;  
   break ;
         
  default : break;
  
  
  } 
  
  
}


}

function reset (){

gamestate=play; 
obstaclesgrp.destroyEach();
cloudsgrp.destroyEach();
gameover.visible=false;
restart.visible=false 
score=0;   
trex.changeAnimation("running",trex_running);





}