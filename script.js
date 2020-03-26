//creating canvas & getting context
const canvas = document.getElementById("track");
const context = canvas.getContext("2d");
const user = {
    x : canvas.width/2,
    y : canvas.height-190,
    Vx : 0,
    Vy : 0,
    slow: 0.2,
}
const racer = {
    x : 100,
    y : 100,
    radius : 20,
    color : "White",
    angleOld : 0,
    speed : 0.5,
    i : 0,
}
//draw functions 
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
var colorI = 0;
var a = 0
function drawUser(x,y){
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    var user = document.getElementById("user");
    context.drawImage(user, 0, 0, 50, 90);
    context.restore();
}

function drawCircle(x, y, r){
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.lineWidth = 1.5;
    context.strokeStyle = "white";
    context.closePath();
    context.fill();
    context.stroke();
}
function drawText(text,x, y, color){
    context.fillStyle = color;
    context.font = "75px arial";
    context.fillText(text, x, y);
}
function update(){
    user.x += user.Vx
    user.y += user.Vy + user.slow
    if(user.x < 125){
        user.Vx = 0
        user.x = 126
    }
    else if(user.x > canvas.width-175){
        user.Vx = 0
        user.x = anvas.width-176
    }
    else if(user.y > canvas.height-115){
        user.slow = 0
        user.y = canvas.height-116
    }
    else if(user.y < 25){
        user.y = 26;
    }

}
function render(){
drawRect(0, 0, canvas.width, canvas.height, "#90EE90");
drawRect(100, 0, 400, canvas.height, "#666666");
drawUser(user.x, user.y)
}
function game(){
    render();
    update()
}
setInterval(game,)
document.addEventListener('keydown', keyPressed)
document.addEventListener('keyup', keyUp)
function keyPressed(e){
    key = e.key
    if (key == "a") {
        user.Vx = -0.5
    }
    else if(key == "d"){
        user.Vx = 0.5
    }
    else if (key == "w") {
        user.Vy = -0.5
        user.slow = 0.2
    }
    else if (key == "s") {
        user.Vy = 0
    }
    else if(key == " ") {
    e.preventDefault();
  }
}
function keyUp(){
}