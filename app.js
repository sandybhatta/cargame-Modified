const score=document.querySelector('.score');
const startScreen=document.querySelector(".startScreen")
const gameArea=document.querySelector('.gameArea')


// key identification (keydown , keyup)
// whichever key is pressed we can get from
// eventDetails.key  <---will store which key was pressed
// we care about 4 keys [ArrowUp,ArrowDown,Right,Left]


// lets define the keys
const keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}
document.addEventListener('keydown',keyPress)
document.addEventListener('keyup',keyReleased)
function keyPress(eventDetails){
    let pressedKey=eventDetails.key;
    // The in operator checks if a specified property exists in an object 
    if(pressedKey in keys){
        // otherwise ney keys are added in the
        // object 
    keys[pressedKey]=true;
    }
} 
function keyReleased(eventDetails){
    let releasedKey=eventDetails.key;
    if(releasedKey in keys){
    keys[eventDetails.key]=false;
    
    }
}

let player={
   speed:4,
}


function movingLine(){
    let allZebraLines=document.querySelectorAll(".divider")
    for(let zebraLine of allZebraLines){

        if(zebraLine.y>=window.innerHeight){
            zebraLine.y=0
        }
        zebraLine.y=zebraLine.y+player.speed
        zebraLine.style.top=zebraLine.y+"px";
    }
}
function movingEnemy(car){
    let enemyCar=document.querySelectorAll(".enemy")
    for(let enemy of enemyCar){

        if(enemy.y>=window.innerHeight){
            enemy.y=0
            enemy.style.left=Math.floor(Math.random()*250)+"px"
        }
        enemy.y=enemy.y+player.speed
        enemy.style.top=enemy.y+"px";
    }
    if(isCollided(car,enemyCar)){
        player.start=false;
    }
}
function isCollided(myCar,enemies){
    let myCarRect=myCar.getBoundingClientRect();
    for(let enemy of enemies){
        let enemiesRect=enemy.getBoundingClientRect();
        if(myCarRect.y==enemiesRect.bottom || myCarRect.bottom==enemiesRect.y || myCarRect.left==enemiesRect.right || myCarRect.right==enemiesRect.left){
          return true;
        }
        return false;
    }
       
    
   
}
















function gamePlay(){
    // all the logics of movement will be applied here
    movingLine()
    
 let car=document.querySelector(".car");
 movingEnemy(car)
 let road=gameArea.getBoundingClientRect();
if(player.start){
    if(keys.ArrowUp && player.y>road.top){
        player.y=player.y-player.speed;
    }
    if(keys.ArrowDown && player.y+120<road.bottom){
        player.y=player.y+player.speed;
    }
    if(keys.ArrowLeft && player.x>25){
        player.x=player.x-player.speed;
    }
    if(keys.ArrowRight  && player.x<300-25){
        player.x=player.x+player.speed;
    }
    car.style.top=player.y+"px"
    car.style.left=player.x+"px"
    

    
    // car.offsetLeft+=player.x;
    // car.offsetTop+=player.y;
    //These properties are read-only. They return the current position of the element relative to its offset parent. Attempting to modify these properties directly doesn't have any effect on the element's position.
   
   





 
    requestAnimationFrame(gamePlay)
}
}

startScreen.addEventListener("click", start)
function start(){
        startScreen.classList.add("hide");
        gameArea.classList.remove("hide");
        player.start=true;
        requestAnimationFrame(gamePlay);
        let car=document.createElement('div');
        car.innerText="CCar";
        car.className="car"
        gameArea.append(car)
    // how to know x and y cordinate of an elemnt
    // element.offsetTop, offsetLeft
    player.x=car.offsetLeft;
    player.y=car.offsetTop;



    for(let x=0;x<5;x++){
    let zebraLine=document.createElement('div');
    zebraLine.className="divider"
    zebraLine.y=x*150;
    zebraLine.style.top=x*150+"px"

    gameArea.append(zebraLine)
   
    }
    

    // generating enemy cars

     for(let x=0;x<3;x++){
        let enemy=document.createElement("div");
        enemy.className="enemy"
    
        enemy.y=(x+1)*300*(-1);
        enemy.style.top=enemy.y+"px";
        enemy.style.left=Math.floor(Math.random()*250)+"px"
        gameArea.append(enemy)
     }
}