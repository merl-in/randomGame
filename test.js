
var hero = {str: 5, sta: 5, wis: 5, agi: 5, health:heroHP };
var giant = {str: 9, sta: 9, wis: 2, agi: 4 }; 
var troll = {str: 6, sta: 7, wis: 5, agi: 5};  
var witch = {str: 3, sta: 3, wis: 6, agi: 6}; 
var orc = {str: 5, sta: 6, wis: 4, agi: 7};
var goblin = {str: 3, sta: 2, wis: 4, agi: 9};
var bandit = {str: 5, sta: 4, wis: 3, agi: 6};
var archer = {str: 2, sta: 4, wis: 6, agi: 8};
var boss = {str: 16, sta: 18, wis: 15, agi: 14};

var heroHP = hero.health = hero.sta  * 20;
giant["health"]=giant.sta*20;
troll["health"]=troll.sta*20;
witch["health"]=witch.sta*20;
orc["health"]=orc.sta*20;
goblin["health"]=goblin.sta*20;
bandit["health"]=bandit.sta*20;
archer["health"]=archer.sta*20;
hero["level"]=1;
hero["exp"]=0;


var heroSkillTotal = hero.str+hero.sta+hero.wis+hero.agi;
var expTheshold = (heroSkillTotal*4)+((hero.level/2)*heroSkillTotal);

function levelUp (){                                            // not functioning
    var levelCheck = expTheshold - hero.exp;
    if (levelCheck<=expTheshold) hero.level+=1;
    if (hero.exp >= expTheshold) {
        var difference = hero.exp - expTheshold;
        hero.exp = 0 + difference;
    }
}




function xp(mob){                                       // returns xp bundle for kill
    var mobSum = 0;
    var heroSum = 0;
    mobSum += mob.str+mob.sta+mob.wis+mob.agi;
    heroSum += hero.str+hero.sta+hero.wis+hero.agi;
    var bonus = (mobSum - heroSum);
    if (bonus <= 1) bonus = 1;
    return mobSum*bonus;
}

/*console.log("witch => "+xp(witch));
console.log("orc => "+xp(orc));
console.log("bandit => "+xp(bandit));
console.log("archer => "+xp(archer));
console.log("giant => "+xp(giant));
console.log("troll => "+xp(troll));
*/  

var currentBeast = "troll"; //do not copy over
console.log("troll "+xp(eval(currentBeast))); //works
console.log(xpValue());

function xpValue(){                                             //function works
    var mobSum = 0;
    var heroSum = 0;
    var mob = eval(currentBeast);
    mobSum += mob.str+mob.sta+mob.wis+mob.agi;
    heroSum += hero.str+hero.sta+hero.wis+hero.agi;
    var bonus = (mobSum - heroSum);
    if (bonus <= 1) bonus = 1;
    return mobSum*bonus;
}

var heroSkillTotal = hero.str+hero.sta+hero.wis+hero.agi;
var expThreshold = (heroSkillTotal*4)+((hero.level/2)*heroSkillTotal); //expthreshold (max) is 90 exp

var currentXp = 0;
function swingConnect(){                                                 //xp bar goes up but no leveling
    var xpGain = Math.floor((xpValue()/expThreshold)*100);               //(69 / 90)*100 = 76.66666 floor gives 76
    hero.exp += 5;
    levelUp();                                                          // supposed to check if leveled up and level hero up
    currentXp += Math.floor(((5/expThreshold)*100));                                // (5/90)*100 = (5.555) floor to 5 to match
    xpBar.style.width = currentXp;
    eval(currentBeast).health -= (hero.str*5);
    if(eval(currentBeast).health <= 0){
        eval(currentBeast).health = 0;
        currentXp += xpGain;
        xpBar.style.width = currentXp;                                //xpgain is 76
    }
    
}

function getRandom(min, max) { // creates a random number betwen min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var characterLocation = [" small hut", "n abandoned campfire", " cave set into the rock", " hole in the ground"]

function characterEncounter(){
console.log( "You approach a"+characterLocation[getRandom(0, 3)]);
}
characterEncounter();