let button = document.getElementById('geradorbotao');
let output = document.getElementById('entrada');
let output2 = document.getElementById('turbo');
let output3 = document.getElementById('validade');
const whatsAppBanner = document.getElementById("whatsapp");

// geting canvas by Boujjou Achraf
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1;

//drawing the characters
function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#f4427d";//green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 35);


function getRandomNumber(min, max) {
    let step2 = (Math.random() * (max - min + 1) + min);
    let result = Math.floor(step2);
    return result;

}

button.addEventListener('click', (e) => {
    e.preventDefault();
    button.disabled = true;
    output.innerText = getRandomNumber(5, 10); // Normal
    output2.innerText = getRandomNumber(5, 10); // Turbo
    output3.innerText = updateTime(); // Validade
    countdown(60);
    let audio = document.getElementById("meuAudio");
    audio.currentTime = 0;  // Reinicia o áudio para o início
    audio.play();  // Inicia a reprodução
})

function getRandomNumber(min, max) {
    let step3 = (Math.random() * (max - min + 1) + min);
    let result = (Math.floor(step3) + 'X');
    return result;
}

function countdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
        button.innerHTML = 'AGUARDE (' + counter + 's...)';
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            button.disabled = false;
            button.innerHTML = 'GERAR NOVO SINAL';
        }
    }, 1000);
}

function updateTime() {
    let time = dayjs();
    let newTime = time.add(2, 'm');
    return (newTime.format("HH:mm"));
}
