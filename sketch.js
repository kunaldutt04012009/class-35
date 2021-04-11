var ball,database,position;

function setup(){
    //to the database(firebase console)
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //.ref() is use to refer the location of database value
    ballposition= database.ref('ball/position')
    //.on() creates a listener(gets the from position using function read position)
    ballposition.on("value",readposition,showerror);
}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
   
    drawSprites();
}

function changePosition(x,y){
    //when ever the position of ball changes after presing arrow keys
    //we need to update a database using ref and setfunction
   database.ref('ball/position').set({
       x:position.x+x,
       y:position.y+y
   })
}
function readposition(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
}
function showerror(){
    console.log("the database connected")
}