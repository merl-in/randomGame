var encounter = document.getElementById('encounter');
// var attackString = document.getElementById('attackString');
var advance = document.getElementById('advance');
var monsterPic = document.getElementById('monsterPic');

var enemy = ["giant", "troll", "witch", "orc warrior", "goblin spearman", "enemy guard", "warlock"];
var foundYou = [" watching as you emerge from the undergrowth!", " rustling in the bushes!", " laughing at you from the shadows!", " running from behind!", " approaching!", " lumbering towards you slowly!"];
var adjective = [" disgusting ", "n evil ", " wicked ", "n ugly ", " menacing ", " loud ", "n obnoxious ", " foul "];



function encounterFunc(){
    encounter.innerText = "A"+adjective[getRandom(0,6)]+enemy[getRandom(0,6)]+" is"+foundYou[getRandom(0,5)];
    if (encounter.innerText.includes("giant") ){
        monsterPic.src = 'https://i.pinimg.com/originals/3d/61/50/3d6150af11ad32eac0b274ef3a16ace8.jpg';
        
    } else if (encounter.innerText.includes("troll")){
        monsterPic.src = 'https://reliablyuncomfortable.files.wordpress.com/2017/02/bridge-troll.png?w=584';
        
    } else if (encounter.innerText.includes("witch")){
        monsterPic.src = 'https://gregcartmell.com/wp-content/uploads/2017/10/the-lost-witch.jpg';
        
    } else if (encounter.innerText.includes("orc warrior")){
        monsterPic.src = 'https://fantasyinmotion.files.wordpress.com/2013/09/492_max.jpg';
        
    } else if (encounter.innerText.includes("goblin spearman")){
        monsterPic.src = 'https://i.redd.it/8hkw7l00kcg21.jpg';
        
    } else if (encounter.innerText.includes("enemy guard")){
        monsterPic.src = 'https://i.pinimg.com/originals/c6/42/3c/c6423c37fb819522413e7aefdc58ee87.jpg';
        
    } else {
        monsterPic.src = 'https://i.pinimg.com/originals/60/78/2c/60782c6d7351ad3d7775789b61971d4b.jpg';
    
    }
    
} 


advance.addEventListener("click", encounterFunc);       //clicking advance generates random encounter

function getRandom (min, max){      // creates a random number betwen min and max
    return Math.floor(Math.random() * (max-min +1) + min);
}
function getRandom100 (){
    return Math.floor(Math.random()*100);
}
