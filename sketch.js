var monkey;
var monkey_img;
var ground;
var ground_img;
var banana;
var banana_img;
var jungle;
var jungle_img;
var stone;
var stone_img;
var gameOver;
var go_img;
var restart;
var re_img;
var iGround; 
var foodGroup;
var obstaclesGroup; 
var score;
var PLAY=1;
var END=0;
var gameState= PLAY;

function preload()
{
 monkey_img=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  //GImage = loadImage("ground2.png");
  banana_img= loadImage ("banana.png");
  jungle_img = loadImage("jungle.jpg");
  stone_img =loadImage ("stone.png");
  go_img = loadImage("gameOver.png");
  re_img = loadImage ("restart.png");
}
function setup()
{
  createCanvas(600,300);
  
  jungle = createSprite(300,150,20,20);
  jungle.addImage("jungle",jungle_img);
  jungle.scale=2;
  jungle.x=jungle.width/2;
    
  monkey = createSprite(200,280,20,20);
 monkey.addAnimation("walking",monkey_img);
 monkey.scale=0.1;
  
  gameOver = createSprite(300,160,20,20);
  gameOver.addImage("game over",go_img);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart = createSprite(300,200,20,20);
  restart.addImage("restart",re_img);
  restart.scale=0.5;
  restart.visible=false;
  
  iGround=createSprite(300,290,600,20);
  iGround.visible=false;
  
  foodGroup=createGroup();
  ObstaclesGroup=createGroup();
  
  score=0;
}

function draw(){
 background("white"); 
  //console.log(monkey.y);
  monkey.collide(iGround);
  if(gameState===1)
  {
    jungle.velocityX=-4;
  
    if(jungle.x<0)
    {
      jungle.x=jungle.width/2;
    }

      if(keyDown("space")&&monkey.y>=249)
    {
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.5;

    Stone();
    Banana();
    
    if(foodGroup.isTouching(monkey))
    {
      score=score+2;
      foodGroup.destroyEach();
    }

    switch(score){
      case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: monkey.scale=0.18;
      break;
      default: break;
    }
    
    if(ObstaclesGroup.isTouching(monkey))
    {
     monkey.scale=0.1;
      gameState=0;
    }

}
  else if(gameState===0)
  {
    jungle.velocityX=0;
    monkey.velocityY=0;
    ObstaclesGroup.setVelocityEach(0,0);
    foodGroup.setVelocityEach(0,0);
    ObstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
  }
  if(mousePressedOver(restart))
  {
      reset();
  }
  drawSprites();
  fill("white")
  text("Survival Rate: "+score, 400,100);
}

function reset()
{
    gameState=1;
    ObstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    monkey.scale=0.1;
    gameOver.visible=false;
    restart.visible=false;
    score=0;
}
function Banana()
{
  if(frameCount%60===0)
  {
    banana = createSprite(600,random(120,140),20,20);
    banana.addImage("banana",banana_img);
    banana.scale=0.07;
    banana.velocityX=-6;
    banana.lifetime=100;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    foodGroup.add(banana);
  }
}
function Stone()
{
  if(frameCount%100===0)
  {
  
    stone = createSprite(600,260,20,20);
    stone.addImage("stone",stone_img);
    stone.scale=0.1;
    stone.velocityX=-6;
    stone.lifetime=100;
    ObstaclesGroup.add(stone);
  }
}
