var trex,trexRunning,trexCollided;
var ground,groundImg,invisGround;
var cloudImg,cloudsGroup;
var ob1,ob2,ob3,ob4,ob5,ob6,obstaclesGroup;
var gameState,PLAY,END,count;
var gameOver,restart,gameOverImg,restartImg;
var die,jump,check;

function preload() {
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");  
  trexCollided = loadImage("trex_collided.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  check = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600,200);
  trex = createSprite(50,180,40,10);
  trex.addAnimation("trex1",trexRunning);
  trex.scale=0.4;
  
  trex.addAnimation("trex2",trexCollided);
  
  gameOver = createSprite(300,80,30,30);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.8;
  gameOver.visible = false;
  
  restart = createSprite(300,120,30,30);
  restart.addImage(restartImg);
  restart.scale=0.8;
  restart.visible = false;
  
  count = 0;
  
  ground = createSprite(300,180,600,20);
  ground.addImage(groundImg);
  ground.x = ground.width/2;
  
  invisGround = createSprite(300,185,600,5);
  invisGround.visible = false;
  
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();
  
  PLAY = 1;
  END = 0;
  gameState = PLAY; 
}

function draw() {
  background(255);
  if(gameState === PLAY) {
     
  count = count+Math.round(getFrameRate()/60);
    
  if(keyDown("space") && trex.y > 164) {
    trex.velocityY = -12;
    jump.play();
  }
  
  if(count%100===0&&count>0) {
    check.play();
  }
    
  if(ground.x < 0) {
     ground.x = ground.width/2; 
  }
  ground.velocityX = -5;
  
  trex.velocityY = trex.velocityY+0.8;
  
  spawnClouds();
  spawnObstacles();
    
  if(obstaclesGroup.isTouching(trex)) {
     gameState = END;
     die.play();
     }
  }
  else if(gameState === END) {
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
   trex.changeAnimation("trex2");
   ground.velocityX = 0;
   gameOver.visible = true;
   restart.visible = true;
   cloudsGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0);
  }
  if(mousePressedOver(restart)) {
   reset(); 
  }
  textSize(16);
  text("Score:   "+count,420,50);
  trex.collide(invisGround);
  drawSprites();
}
function reset() {
  gameState = PLAY
  count = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("trex1");
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,100));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 210;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
      break;
      case 3: obstacle.addImage(ob3);
      break;
      case 4: obstacle.addImage(ob4);
      break;
      case 5: obstacle.addImage(ob5);
      break;
      case 6: obstacle.addImage(ob6);
      break; 
      default: break;
  } 
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 210;
    obstaclesGroup.add(obstacle);
  }
}