//creating canvas & getting context
$("#loss").hide();
$(".scores").hide();
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
status = {
    user: false,
}
const user = {
    x : canvas.width/2,
    y : canvas.height-190,
    Vx : 0,
    Vy : 0,
    slow: 0.2,
    score : 0,
    passedYellow : false,
    passedGreen : false,
    lost : true,
}
const racerYellow = {
    x : 200,
    y : -90,
    Vy : 0.9,
    Vx : 0.7,
    ready : false,
}
const racerGreen = {
    x : 300,
    y : -90,
    Vy : 0.9,
    Vx : -0.7,
   ready : true,
}
const net = {
    x : 75 ,
    y : 0,
    width : 450,
    height : 50,
}
//draw functions 
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
var colorI = 0;
var a = 0
function drawUser(x,y,lost){
    if(lost === false){
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    var user = document.getElementById("user");
    context.drawImage(user, 0, 0, 50, 90);
    context.restore();
    }
}
function drawRacerGreen(lost){
    if(lost === false){
    if(racerYellow.y < canvas.height/2 && racerGreen.ready === false){

    }
    if(racerYellow.y < canvas.height/2 && racerYellow.y > racerGreen.y){
        
    }
    else{
        racerGreen.ready = true
    var context = canvas.getContext("2d");
    context.save()
    context.translate(racerGreen.x,racerGreen.y)
    var green = document.getElementById(`green`);
    context.drawImage(green, 0, 0, 50, 90);
    context.restore();
    racerGreen.x += racerGreen.Vx
    racerGreen.y += racerGreen.Vy - user.Vy
    }
}
}
function drawRacerYellow(lost){
    if(lost === false){
    if(racerGreen.y < canvas.height/2 && racerYellow.ready === false){

    }
    if(racerGreen.y < canvas.height/2 && racerGreen.y > racerYellow.y){

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
}
var y = 0
function drawText(text,x, y, color){
    context.fillStyle = color;
    context.font = "75px Arial";
    context.fillText(text, x, y);
}
function drawNet(){
    for(let i = -100; i <= canvas.height; i+=100){
        drawRect(net.x, net.y + i , net.width, net.height, "#E9E9E9");
    }
    
    for(let i =  -100; i <= canvas.height; i+=100){
        drawRect(net.x, net.y + i + 50, net.width, net.height, "#BB0000");
    }
    if(user.lost === false){
    net.y += 2 - user.Vy
    if(net.y >= 100){
        net.y = 0;
    }
}
}
function checkCollision(xa,ya,xb,yb,user,type){
    if(racerYellow.ready === false && racerGreen.ready === false){
        racerGreen.ready = true
    }
    if(xa < xb + 50 && xa + 50 > xb && ya < yb +90 && ya + 90 > yb){
        if(user === true){
                status.user = false;
                 newCounterScore = Number($("#spanCollision").text())-1
                 if(newCounterScore >= 0){
                $("#spanCollision").text(newCounterScore)
                 }
            if(type === "yellow"){
                racerYellow.y = -90
                racerYellow.ready = false
            }
            else if(type === "green"){
                racerGreen.y = -90
                racerGreen.ready = false
            }
            else if(type === "both"){
                racerGreen.Vx = -racerGreen.Vx
                racerYellow.Vx = -racerYellow.Vx
            }
        }
    else{
        status.user = true
    }
}
} 
function update(lost){
    if(lost === false){
    user.x += user.Vx
    user.y += user.Vy + user.slow
    if(Number($("#spanCollision").text()) === 0){
        $("#loss").show();
        user.lost = true
    }
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
    else if(racerGreen.y > canvas.height+3 && racerGreen.Vy > 0){
        racerGreen.y =  -90;
        racerGreen.Vy = 0.9;
        racerGreen.x = (Math.random()*298)+126
        racerGreen.Vx = (Math.random() > 0.5) ? -0.4 : 0.4
        user.passedGreen = false;
    }
    else if(racerGreen.y < -90 && racerGreen.Vy < 0){
        racerGreen.y =  -90;
        racerGreen.Vy =  0.9;
        racerGreen.x = (Math.random()*298)+126
        racerGreen.Vx = (Math.random() > 0.5) ? -0.4 : 0.4
        user.passedGreen = false;
    }
    if(racerYellow.x < 125 || racerYellow.x > canvas.width-175){
        racerYellow.Vx = -racerYellow.Vx
    }
    else if(racerYellow.y > canvas.height+3 && racerYellow.Vy > 0){
        racerYellow.y =  -90;
        racerYellow.Vy =  0.9;
        racerYellow.x = (Math.random()*298)+126
        racerYellow.Vx = (Math.random() > 0.5) ? -0.4 : 0.4
        user.passedYellow = false;
    }
    else if(racerYellow.y < 0 && racerYellow.Vy < 0){
        racerYellow.y =  -90;
        racerYellow.Vy =  0.9;
        racerYellow.x = (Math.random()*298)+126
        racerYellow.Vx = (Math.random() > 0.5) ? -0.4 : 0.4
        user.passedYellow = false;
    }
}
}
function scoreUpdate(){
    if(racerGreen.y > user.y && user.passedGreen === false && racerGreen.Vy > 0){
        user.passedGreen = true;
        newScore = Number($("#span").text())+1
        $("#span").text(newScore)
    }
    else if(racerGreen.y < user.y && user.passedGreen === false && racerGreen.Vy < 0){
        user.passedGreen = true;
        newScore = Number($("#span").text())+1
        $("#span").text(newScore)
    }
    if(racerYellow.y > user.y && user.passedYellow === false && racerYellow.Vy > 0){
        user.passedYellow = true;
        newScore = Number($("#span").text())+1
        $("#span").text(newScore)
    }
    else if(racerYellow.y < user.y && user.passedYellow === false && racerYellow.Vy < 0){
        user.passedYellow = true;
        newScore = Number($("#span").text())+1
        $("#span").text(newScore)
    }
}
function render(){
drawNet()
drawRect(0, 0, 75, canvas.height, "#33CC33");
drawRect(canvas.width-75, 0, canvas.width, canvas.height, "#33CC33");
drawRect(100, 0, 400, canvas.height, "#666666");
drawUser(user.x, user.y,user.lost)
drawRacerGreen(user.lost)
drawRacerYellow(user.lost)
checkCollision(user.x,user.y,racerGreen.x,racerGreen.y,true,"green")
checkCollision(user.x,user.y,racerYellow.x,racerYellow.y,true,"yellow")
scoreUpdate();
}
function game(){
    render();
    update(user.lost)
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
    if(user.lost === true){
    user.lost = false
    $(".ids").hide();
    $(".scores").show();
    reset()
    }
  }
}
function keyUp(){
}
function reset(){
    $("#spanCollision").text("3");
    $("#loss").hide()
    racerGreen.y = -90;
    racerYellow.y = -90;
    racerYellow.ready = false
    racerGreen.ready = true;
    user.x = canvas.width/2
    user.y = canvas.height-190,
    $("#span").text("0");
    user.Vx = 0;
    user.Vy = 0;
}