// to be added : rare mob spawns, boss mobs spawned from level 5 and 10, attack buttons invisible until monster spawn, "+" buttons enabled if hero acquires points, "+" buttons add points into hero object, classes to select varying in difficulty, forest path spawns sometimes instead of mob, implement special moves (combos) from riddle, button disabled after press for a time, red flashing when low on hp, flash when hit, timer on mob swing, chance of hit function, chance of dodge function, monster on death condition, backstory, change defend to block?, heal to bandage?, gameover condition, sounds, mobile structure, escape function, poison function from troll, witches heal, archers use stealth, giants use stomp, hints "its sometimes better to run from a powerful enemy..", score, wounds and bleeding with loops, items like a key, goblin can blind you, maybe a fixed xp for mobs?, mob cannot repeat,
var encounter = document.getElementById('encounter');
// var attackString = document.getElementById('attackString');
var advance = document.getElementById('advance');
var monsterPic = document.getElementById('monsterPic');
var healthBar = document.getElementById('healthBar');
var heal = document.getElementById('heal');
var defend = document.getElementById('defend');
var attack = document.getElementById('attack');
var strength = document.getElementById('strength');
var stamina = document.getElementById('stamina');
var wisdom = document.getElementById('wisdom');
var agility = document.getElementById('agility');
var run = document.getElementById('run');
var xpBar = document.getElementById('xpBar');
var heroLevel = document.getElementById('heroLevel');
var heroPoints = document.getElementById('heroPoints');
var youHave = document.getElementById('youHave');
var toSpend = document.getElementById('toSpend');

var enemy = ["giant", "troll", "witch", "orc warrior", "goblin spearman", "bandit", "skeleton archer"];
var foundYou = [" watching as you emerge from the undergrowth!", " rustling in the bushes!", " laughing at you from the shadows!", " running from behind!", " approaching!", " lumbering towards you slowly!"];
var adjective = [" disgusting ", "n evil ", " wicked ", "n ugly ", " menacing ", " loud ", "n obnoxious ", " foul "];

var hero = {str: 4, sta: 4, wis: 4, agi: 4};
var giant = {str: 9, sta: 9, wis: 2, agi: 4 }; 
var troll = {str: 6, sta: 7, wis: 4, agi: 5};  
var witch = {str: 3, sta: 3, wis: 6, agi: 5}; 
var orc = {str: 6, sta: 6, wis: 3, agi: 7};
var goblin = {str: 3, sta: 2, wis: 4, agi: 9};
var bandit = {str: 5, sta: 4, wis: 3, agi: 6};
var archer = {str: 2, sta: 3, wis: 6, agi: 8};


hero["health"]=hero.sta*20;
hero["level"]=1;
hero["exp"]=0;
hero["points"]=0;
giant["health"]=giant.sta*20;
troll["health"]=troll.sta*20;
witch["health"]=witch.sta*20;
orc["health"]=orc.sta*20;
goblin["health"]=goblin.sta*20;
bandit["health"]=bandit.sta*20;
archer["health"]=archer.sta*20;

heroLevel.innerText = " Lvl"+hero.level;
strength.innerText = hero.str;
stamina.innerText = hero.sta;
wisdom.innerText = hero.wis;
agility.innerText = hero.agi;


var hpValue = 100;                                                  // percentage value of health 100% at start
var healPercent = ((hero.wis*5)/hero.health)*100;                   // for the healthBar to function needs a percentage not a value

var heroSkillTotal = hero.str+hero.sta+hero.wis+hero.agi;
var expThreshold = (heroSkillTotal*4)+((hero.level/2)*heroSkillTotal);

var xpMax = (hero.str + hero.sta + hero.wis + hero.agi)*4;

function onMobDeath(){

}

function xpValue(){
    var mobSum = 0;
    var heroSum = 0;
    var mob = eval(currentBeast);
    mobSum += mob.str+mob.sta+mob.wis+mob.agi;
    heroSum += hero.str+hero.sta+hero.wis+hero.agi;
    var bonus = (mobSum - heroSum);
    if (bonus <= 1) bonus = 1;
    return mobSum*bonus;
}


    


function levelUp (){                                               //checks to see if xp exceeds threshold and gives a level if necessary
    var levelCheck = expThreshold - currentXp;                       //90 - current xp
    if (levelCheck<=0) {
        hero.level+=1;
        hero.points +=1;
        heroLevel.innerText = " Lvl"+hero.level;
        if(hero.points>=2){
            heroPoints.innerText = hero.points+" hero points to spend!";
        } else {
            heroPoints.innerText = hero.points+" hero point to spend!";
        }
    }
    if (currentXp >= expThreshold) {
        var difference = currentXp - expThreshold;
        currentXp = 0 + difference;
        xpBar.style.width = currentXp+"%";
    }
}
/*

*/


function firstAid(){                                               //heal button function
    hpValue += healPercent;
    hero.health += (hero.wis*5);
    
    if (hpValue >=100) hpValue = 100;
    if (hero.health >= hero.sta*20) hero.health = hero.sta*20;
    healthBar.innerText =  Math.round(hpValue)+"%";
    healthBar.style.width = hpValue+"%";
    console.log(currentBeast);
    console.log(hero.health);
}


function power(enemy){
    return enemy.str * 5
}

function heroGotHit(){   
    var dmgPercent = ((eval(currentBeast).str*5)/(hero.health))*100;                                 //works now and is connected to defend button for the meantime
    hpValue -= dmgPercent;
    hero.health -= eval(currentBeast).str*5;                                     
    if(hpValue<=0) hpValue = 0;//keep it over 0%
    if (hero.health <= 0) hero.health = 0;
    healthBar.innerText =  Math.round(hpValue)+"%";
    healthBar.style.width = hpValue+"%";
    
    
    console.log(hero.health);
  } 

function swing(){

}
var currentXp = 0;

function swingConnect(){
    var xpGain = Math.floor((xpValue()/expThreshold)*100);               //(69 / 90)*100 = 76.66666 floor gives 76
    hero.exp += 5;
                                                           // supposed to check if leveled up and level hero up
    currentXp += Math.floor(((5/expThreshold)*100));                                // (5/90)*100 = (5.555) floor to 5 to match
    xpBar.style.width = currentXp+"%";
    eval(currentBeast).health -= (hero.str*5);
    if(eval(currentBeast).health <= 0){
        eval(currentBeast).health = 0;
        currentXp += xpGain;
        xpBar.style.width = currentXp+"%";                                //xpgain is 76
        
    }
    levelUp();  
    console.log('hero current level => ');
    console.log('beast current health => '+eval(currentBeast).health);
    console.log('hero current experience => '+currentXp);
    console.log("hero points? => "+hero.points);
}
  




function healing(enemy){
    return enemy.wis * 5  
}

function delay(enemy){
    return 10000/enemy.agi
}

function dodge(enemy, hero){
    return (enemy.agi  - (hero.agi - enemy.agi))*5
}

let currentBeast = "test";



function encounterFunc(){
    encounter.innerText = "A"+adjective[getRandom(0,6)]+enemy[getRandom(0,6)]+" is"+foundYou[getRandom(0,5)];
    if (encounter.innerText.includes("giant") ){
        monsterPic.src = 'https://i.pinimg.com/originals/3d/61/50/3d6150af11ad32eac0b274ef3a16ace8.jpg';
        currentBeast = "giant";
    } else if (encounter.innerText.includes("troll")){
        monsterPic.src = 'https://reliablyuncomfortable.files.wordpress.com/2017/02/bridge-troll.png?w=584';
        currentBeast = "troll";
    } else if (encounter.innerText.includes("witch")){
        monsterPic.src = 'https://gregcartmell.com/wp-content/uploads/2017/10/the-lost-witch.jpg';
        currentBeast = "witch";
    } else if (encounter.innerText.includes("orc warrior")){
        monsterPic.src = 'https://fantasyinmotion.files.wordpress.com/2013/09/492_max.jpg';
        currentBeast = "orc";
    } else if (encounter.innerText.includes("goblin spearman")){
        monsterPic.src = 'https://i.redd.it/8hkw7l00kcg21.jpg';
        currentBeast = "goblin";
    } else if (encounter.innerText.includes("bandit")){
        monsterPic.src = 'https://i.pinimg.com/originals/c6/42/3c/c6423c37fb819522413e7aefdc58ee87.jpg';
        currentBeast = "bandit";
    } else {
        monsterPic.src = 'https://whfb.lexicanum.com/mediawiki/images/thumb/2/2c/Warhammer_Tomb_Kings_Skeletal_Archers.png/300px-Warhammer_Tomb_Kings_Skeletal_Archers.png';
        currentBeast = "archer";
    }
    
} 
run.addEventListener("click", xpValue);                 // currently links run button to xp result for current mob
attack.addEventListener("click", swingConnect);         //currently links attack button to direct monster hit and damage
defend.addEventListener("click", heroGotHit);           // damages hero's health and healthbar
heal.addEventListener("click", firstAid);               // Heal button action on progressbar
advance.addEventListener("click", encounterFunc);       //clicking advance generates random encounter

function getRandom (min, max){      // creates a random number betwen min and max
    return Math.floor(Math.random() * (max-min +1) + min);
}
function getRandom100 (){
    return Math.floor(Math.random()*100);
}

