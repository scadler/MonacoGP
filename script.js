//creating canvas & getting context
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const user = {
    x : canvas.width/2,
    y : canvas.height-190,
    Vx : 0,
    Vy : 0,
    slow: 0.2,
}
const racerYellow = {
    x : 200,
    y : 0,
    Vy : 0.4,
    Vx : 0.4,
    ready : false,
}
const racerGreen = {
    x : 300,
    y : 0,
    Vy : 0.4,
    Vx : -0.4,
}
const net = {
    x : 75 ,
    y : 0,
    width : 450,
    height : 50,
    color : "red",
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
function drawRacerGreen(){
    var context = canvas.getContext("2d");
    context.save()
    context.translate(racerGreen.x,racerGreen.y)
    var green = document.getElementById(`green`);
    context.drawImage(green, 0, 0, 50, 90);
    context.restore();
    racerGreen.x += racerGreen.Vx
    racerGreen.y += racerGreen.Vy - user.Vy
}
function drawRacerYellow(){
    if(racerGreen.y < canvas.height/2 && racerYellow.ready === false){

    }
    else{
    racerYellow.ready = true
    var context = canvas.getContext("2d");
    context.save()
    context.translate(racerYellow.x,racerYellow.y)
    var Yellow = document.getElementById(`yellow`);
    context.drawImage(Yellow, 0, 0, 50, 90);
    context.restore();
    racerYellow.x += racerYellow.Vx 
    racerYellow.y += racerYellow.Vy - user.Vy
    }
}
var y = 0
function drawText(text,x, y, color){
    context.fillStyle = color;
    context.font = "75px arial";
    context.fillText(text, x, y);
}
function drawNet(){
    for(let i = -100; i <= canvas.height; i+=100){
        drawRect(net.x, net.y + i , net.width, net.height, net.color);
    }
    
    for(let i =  -100; i <= canvas.height; i+=100){
        drawRect(net.x, net.y + i + 50, net.width, net.height, "white");
    }
    net.y += 2 - user.Vy
    if(net.y >= 100){
        net.y = 0;
    }
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
        user.x = canvas.width-176
    }
    else if(user.y > canvas.height-115){
        user.slow = 0
        user.y = canvas.height-116
    }
    else if(user.y < 25){
        user.y = 26;
    }
    if(racerGreen.x < 125 || racerGreen.x > canvas.width-175){
        racerGreen.Vx = -racerGreen.Vx
    }
    else if(racerGreen.y > canvas.height+3){
        racerGreen.y = -90
        racerGreen.x = (Math.random()*298)+126
        racerGreen.Vx = (Math.random() > 0.5) ? -0.4 : 0.4
    }
    if(racerYellow.x < 125 || racerYellow.x > canvas.width-175){
        racerYellow.Vx = -racerYellow.Vx
    }
    else if(racerYellow.y > canvas.height+3){
        racerYellow.y = -90
        racerYellow.x = (Math.random()*298)+126
        racerYellow.Vx = (Math.random() > 0.5) ? -0.4 : 0.4
    }
}
function render(){
drawNet()
drawRect(0, 0, 75, canvas.height, "#33CC33");
drawRect(canvas.width-75, 0, canvas.width, canvas.height, "#33CC33");
drawRect(100, 0, 400, canvas.height, "#666666");
drawUser(user.x, user.y)
drawRacerGreen()
drawRacerYellow()
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