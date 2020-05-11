let word = 'roses';

let solution = '';
for(let i = 0; i<word.length;i++){
    solution+= '_ ';
}
// Display words length
document.getElementById('solution').innerHTML = solution;

// Function for changing letters and adding them on screen
function addLetter(car){
    let arr = solution.split(/\s/g);
    
    indexes = [];
    
    let idx = word.indexOf(car);
        while (idx != -1) {
        indexes.push(idx);
        idx = word.indexOf(car, idx + 1);
        }
    for(let i of indexes){
        arr[i] = car;
    }
    solution = arr.join(' ')
    document.getElementById('solution').innerHTML = solution;
}

function checkWin(){
    if(word == solution.replace(/\s/g, '')){
        alert('You win')
        location.reload()
    }
}

function checkLose(){
    if(index == lives){
        bodyParts[index]();
        alert('You lost');
        location.reload()
    }
    else{
        bodyParts[index]();
        index++
        console.log(index, lives)
    }
}

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

const X = canvas.width;
const Y = canvas.height;

// Creating hangman base

ctx.beginPath();
ctx.moveTo(0,0);

ctx.beginPath();
ctx.moveTo(X/6,Y);
ctx.lineTo(X/6,Y/3);

ctx.lineTo(X/2, Y/3);

ctx.lineTo(X/2, Y/2)
ctx.stroke();



// Functions for drawing parts
function drawHead(){
    ctx.beginPath();
    ctx.arc(X/2, Y/2, 30, 0, 2 * Math.PI);
    ctx.fill();
}

function drawNeck(){
    ctx.beginPath(); 
    ctx.moveTo(X/2, Y/2)
    ctx.lineTo(X/2,Y - Y/3);
    ctx.stroke();
}

function drawLeftArm(){
    ctx.beginPath();
    ctx.moveTo(X/2, Y-Y/3);
    ctx.lineTo(X/3, Y/2);
    ctx.stroke();
}

function drawRightArm(){
    ctx.beginPath();
    ctx.moveTo(X/2, Y-Y/3);
    ctx.lineTo(X/2 + X/3, Y/2);
    ctx.stroke();   
}

function drawBody(){
    ctx.beginPath();
    ctx.moveTo(X/2, Y - Y/3);
    ctx.lineTo(X/2, Y/2 + Y/4);
    ctx.stroke();
}
function drawLeftLeg(){
    ctx.beginPath();
    ctx.moveTo(X/2, 3*Y/4);
    ctx.lineTo(X/3, 5*Y/6);
    ctx.stroke();
}
function drawRightLeg(){
    ctx.beginPath();
    ctx.moveTo(X/2, 3*Y/4);
    ctx.lineTo(X/2 + X/6, 5*Y/6);
    ctx.stroke();
}

let bodyParts = [drawHead, drawNeck, drawLeftArm, drawRightArm, drawBody, drawLeftLeg, drawRightLeg];
let lives = bodyParts.length - 1;

// Event lisener for keyboard input
let index = 0;
function draw(event){
    let letter = event.key
    
    if(word.indexOf(letter) == -1){
        checkLose()
        }
    
    else{
        addLetter(letter)
        checkWin()
    }
}
