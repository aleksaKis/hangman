let game = true

let words = ['abruptly','absurd','affix','askew','avenue','awkward','axiom','azure','bandwagon','banjo','beekeeper','bikini','blitz','blizzard',
'boggle','bookworm','boxcar','buckaroo','buffoon','buxom','buzzard','buzzing','buzzwords','caliph','cobweb','croquet','crypt',
'curacao','cycle','daiquiri','dirndl','disavow','dizzying','duplex','dwarves','embezzle','equip','espionage','euouae','exodus','faking','fishhook','fixable',
'fjord','flapjack','flopping','fluffiness','flyby','foxglove','frazzled','funny','gabby','galaxy','galvanize','gazebo','giaour','gizmo',
'glowworm','gnarly','gossip','grogginess','haiku','haphazard','hyphen','icebox','injury','ivy','jackpot','jaundice',
'jawbreaker','jaywalk','jazziest','jelly','jigsaw','jinx','jiujitsu','jockey','jogging','joking','jovial','joyful','juicy','jukebox','jumbo',
'kayak','kazoo','keyhole','kilobyte','kiosk','kitsch','kiwifruit','klutz','knapsack','lengths','lucky','luxury','marquis','matrix','quiz','waltz','zipper','queue',
'qartz','rhythm','yummy','puppy','microwave','staff','wizard','voodo','puzzling','transcript','unworthy']

let word = words[Math.floor(Math.random() * words.length)].toUpperCase();

let solution = '';
for(let i = 0; i<word.length;i++){
    solution+= '_ ';
}
// Display words length
document.getElementById('solution').innerHTML = solution;

let wrongLetters = [];

// Function for changing letters and adding them on screen
function addRight(car){
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
    checkWin();
}

function addWrong(car){
    if(wrongLetters.indexOf(car) == -1 && /[A-Z]/g.test(car) && car.length == 1){
        wrongLetters.push(car);
        document.getElementById('wrong').innerHTML += `${car} `;
        checkLose();
    }
        
}

// Draw 'You Won' on the canvas if the word is equal to solution
function checkWin(){
    if(word == solution.replace(/\s/g, '')){

        ctx.fillStyle = 'rgb(0, 200, 0)';
        ctx.fillText('YOU WON!', X/2, Y/2 - Y/3);
        game = false;
    }
}

// Draw 'You lost on canvas or add body part
function checkLose(){
    if(index == lives){
        bodyParts[index]();
        
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillText('YOU LOST', X/2, Y/2 - Y/3);
        //ctx.fillText(word, X/2, Y - Y/32);
        document.getElementById('solution').innerHTML = word.split('').join(' ');
        game = false
    }
    else{
        bodyParts[index]();
        index++
    }
}

let canvas = document.getElementById("myCanvas");
let ctx;
if (canvas.getContext) {
  ctx = canvas.getContext('2d');
} else {
  alert('Canvas is not supported');
}


const X = canvas.width;
const Y = canvas.height;

// Creating hangman base

ctx.beginPath();
// Setting sytle
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.font = '48px Walter Turncoat'
ctx.textAlign = 'center';

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
    ctx.lineTo(X/2 - X/6, Y/2);
    ctx.stroke();
}

function drawRightArm(){
    ctx.beginPath();
    ctx.moveTo(X/2, Y-Y/3);
    ctx.lineTo(X/2 + X/6, Y/2);
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
    console.log(event);
    let letter = event.key !== undefined ? event.key : event;
    letter = letter.toUpperCase();
    console.log(letter)
    if(game){
        if(word.indexOf(letter) == -1){
            addWrong(letter);
            }
        
        else{
            addRight(letter);
        }
    }
    else{
        letter == ' ' || letter == 'ENTER' ?
            location.reload() : {}
    }
}
