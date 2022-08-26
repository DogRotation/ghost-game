var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300,450);
  ghost.addImage("ghostimg", ghostImg);
  ghost.scale = 0.3;

}

function draw() {
if(ghost.y > 600 || ghost.isTouching(invisibleBlockGroup)){
    gameState = "end"

  } 
  if(gameState == "end"){
    background("black");
    fill ("yellow");
    textSize(50)
    text("Game Over", 175,300);
    
  }

  if(gameState == "play"){
    background(200);
  drawSprites();
  
  if(tower.y > 400){
      tower.y = 300
    }

  spawnDoors()

  if(keyDown("w")){
    ghost.velocityY = -6;
  }
  ghost.velocityY = ghost.velocityY + 0.5;
  if(keyDown("d")){
    ghost.x = ghost.x + 6;
  }
  if(keyDown("a")){
    ghost.x = ghost.x - 6;
  }
  ghost.collide(climbersGroup);

   
  }
}

function spawnDoors() {

  if(frameCount%200 == 0){
  door = createSprite(Math.round(random(200,400)),-60);
  door.addImage("doorimg",doorImg);
  door.velocityY = 1;
  doorsGroup.add(door);
  door.lifetime = 720;
  ghost.depth = door.depth + 1;

  climber = createSprite(door.x,5);
  climber.addImage("climberimg",climberImg);
  climber.velocityY = 1;
  climbersGroup.add(climber);
  climber.lifetime = 720;

  invisibleBlock = createSprite(climber.x,climber.y + 5,climber.width, climber.height);
  invisibleBlock.velocityY = 1;
  invisibleBlock.visible = false;
  invisibleBlockGroup.add(invisibleBlock);

  }
  


}




