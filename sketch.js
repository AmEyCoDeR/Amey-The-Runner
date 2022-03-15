var ground,groundImg,Amey,AmeyAnimation,Ameyl,AmeylImg;
var Invisibleground;
var gamestate = "serve";
var play, playIMG;
var obstacle,obstacle1,obstacle2,obstacle3, obstaclesgroup;
var rand, gameover, gameoverImg, restart, restartImg;
var coin, coinImg, coinsGroup, coins = 0;
var score = 0


function preload(){
    groundImg = loadImage("BackGround.PNG");
    AmeyAnimation = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png");
    AmeylImg = loadImage("AmeyRunnerLogo.png");
   
    playIMG = loadImage("start.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");

    gameoverImg = loadImage("gameover.png");

    restartImg = loadImage("restart.png");

    coinImg = loadImage("coin.png");
    coinsGroup = new Group();
}

function setup() {
    createCanvas(600,200);
    ground = createSprite(690,55,50,50);
     ground.addImage("ground",groundImg);
      ground.scale = 1.2;

      score.visible = false;
      
      Amey = createSprite(30,140,25,25);
      Amey.addAnimation("bhag",AmeyAnimation);
      Amey.scale = 0.35;

      obstaclesgroup = new Group();


    play = createSprite(300,150,50,50);
    play.addImage("play",playIMG);
    play.scale = 0.3;

    Ameyl = createSprite(300,70,50,50);
    Ameyl.addImage("Ameyl",AmeylImg);
    Ameyl.scale = 0.25;

    Invisibleground = createSprite(300,185,ground.width,20);
    Invisibleground.visible = false;

    gameover = createSprite(300,100,50,50);
    gameover.addImage("gamehogaya",gameoverImg);
    gameover.scale = 0.1;
    gameover.visible = false;

    restart = createSprite(300,150,50,50);
    restart.addImage("restart",restartImg);
    restart.scale = 0.1;
    restart.visible = false;



}

function draw() {
    background("white");
  
    drawSprites();



    if(gamestate === "serve"){
        Amey.visible = false;
        play.visible = true;
        ground.visible = true;
        fill("yellow");
        textSize(18)
        text("Click Space Bar To Jump",200,190)

        if(mousePressedOver(play)){
            gamestate = "play"
        }

    }
    
    if(gamestate === "play"){
        play.visible = false;
        Amey.visible = true;
        Ameyl.visible = false;
        ground.visible = true;
        ground.velocityX = -5;
        Amey.collide(Invisibleground);
        Amey.velocityY = Amey.velocityY + 0.35
        //Amey.debug = true;
        Amey.setCollider("rectangle",0,0,90,200);
        if (ground.x < 0){
            ground.x = ground.width/2;
          }
          spawnObstacles();
          spawnCoin();



          score = score + Math.round(getFrameRate()/60);
          ground.velocityX = -(5 + 1.5*score/250);
          
          if(keyDown("space") && Amey.y > 100){
              Amey.velocityY = - 7;
          }

          if(coinsGroup.isTouching(Amey)){
            coins = coins + 1;
            coin.remove();
           }

          if(obstaclesgroup.isTouching(Amey)){
            gamestate = "end";
            
        }
        fill("black");
        textSize(18);
        text("Score: "+ score,400,25);
        fill("black");
        textSize(18);
        text("Coins: "+coins,400,50);
          
    }

   if(gamestate === "end"){
       Amey.visible = false;
       ground.velocityX = 0;
       
       obstacle.velocityX = 0;
       obstacle.lifetime = -1;
       gameover.visible = true;
       coinsGroup.lifetime = 0
       fill("black");
        textSize(18);
        text("Your Score: "+ score,250,25);
        fill("black");
        textSize(18);
        text("Your Coins: "+coins,250,50);
        restart.visible = true;
        if(mousePressedOver(restart)){
            reset();
        }
       

   }
    
    
    
   
  
   
    }

function spawnObstacles(){
    if(frameCount%200 === 0){
        obstacle = createSprite(650,160,50,50);
        obstacle.velocityX = -(5 + 1.5*score/250);
        rand = Math.round(random(1,3));
        obstaclesgroup.add(obstacle);
        obstacle.scale = 0.1;
        obstacle.lifetime = 180;
        /////////obstacle.debug = true;
        obstacle.setCollider("rectangle",0,0,600,300)

        switch(rand){
            case 1: obstacle.addImage(obstacle1);
              break;
            case 2: obstacle.addImage(obstacle2);
              break;
            case 3: obstacle.addImage(obstacle3);
              break;
              default:break;
        }
        
        
    }
}

function spawnCoin(){
    if(frameCount%350 === 0){
    coin = createSprite(650,100,50,50);
    coin.y = Math.round(random(30,80));
    coin.addImage("coin",coinImg);
    coin.velocityX = -(5 + 1.5*score/250);
    coin.scale = 0.1;
    coinsGroup.add(coin);
    coin.lifetime = 180;


    

    }
}

function reset(){
    gamestate = "play";
    score = 0;
    Amey.visible = true;
    Amey.x = 30;
    Amey.y = 140;
    coins = 0;
    coinsGroup.destroyEach();
    obstaclesgroup.destroyEach();
    restart.visible = false;
    gameover.visible = false;
}
