// to be added : rare mob spawns, boss mobs spawned from level 5 and 10, attack buttons invisible until monster spawn, "+" buttons enabled if hero acquires points, "+" buttons add points into hero object, classes to select varying in difficulty, forest path spawns sometimes instead of mob, implement special moves (combos) from riddle, button disabled after press for a time, red flashing when low on hp, flash when hit, timer on mob swing, chance of hit function, chance of dodge function, monster on death condition, backstory, change defend to block?, heal to bandage?, gameover condition, sounds, mobile structure, escape function, poison function from troll, witches heal, archers use stealth, giants use stomp, hints "its sometimes better to run from a powerful enemy..", score, wounds and bleeding with loops, items like a key, goblin can blind you, maybe a fixed xp for mobs?, mob cannot repeat,
//  ---------------------------------------------- ELEMENT ID's -----------------------------------------------------
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
var plusBtn = document.querySelectorAll('.plusBtn');
var addSTR = document.getElementById('addSTR');
var levelup = document.getElementById('levelup');
//  ---------------------------------------------- ARRAYS for 'encounter' string ----------------------------------------
var enemy = ["giant", "troll", "witch", "orc warrior", "goblin spearman", "bandit", "skeleton archer"];
var foundYou = [" watching as you emerge from the undergrowth!", " rustling in the bushes!", " laughing at you from the shadows!", " running from behind!", " approaching!", " lumbering towards you slowly!"];
var adjective = [" disgusting ", "n evil ", " wicked ", "n ugly ", " menacing ", " loud ", "n obnoxious ", " foul "];

//  ---------------------------------------------- CHARACTER objects -----------------------------------------------------
var hero = {
    str: 4,
    sta: 4,
    wis: 4,
    agi: 4
};
var giant = {
    str: 10,
    sta: 10,
    wis: 2,
    agi: 2,
    reward: 75
};
var troll = {
    str: 6,
    sta: 7,
    wis: 4,
    agi: 5,
    reward: 55
};
var witch = {
    str: 3,
    sta: 3,
    wis: 6,
    agi: 5,
    reward: 35
};
var orc = {
    str: 6,
    sta: 6,
    wis: 3,
    agi: 7,
    reward: 45
};
var goblin = {
    str: 3,
    sta: 2,
    wis: 4,
    agi: 9,
    reward: 25
};
var bandit = {
    str: 5,
    sta: 4,
    wis: 3,
    agi: 6,
    reward: 30
};
var archer = {
    str: 2,
    sta: 3,
    wis: 6,
    agi: 8,
    reward: 35
};

// ---------------------------------------------- Additional PROPERTIES --------------------------------------------------
hero["health"] = hero.sta * 20;
hero["level"] = 1;
hero["exp"] = 0;
hero["points"] = 0;
giant["health"] = giant.sta * 20;
troll["health"] = troll.sta * 20;
witch["health"] = witch.sta * 20;
orc["health"] = orc.sta * 20;
goblin["health"] = goblin.sta * 20;
bandit["health"] = bandit.sta * 20;
archer["health"] = archer.sta * 20;
// ---------------------------------------------- HTML references -------------------------------------------------------
heroLevel.innerText = " Lvl" + hero.level;
strength.innerText = hero.str;
stamina.innerText = hero.sta;
wisdom.innerText = hero.wis;
agility.innerText = hero.agi;

// ---------------------------------------------- VARIABLES -------------------------------------------------------------

var hpValue = 100; // percentage value of health 100% at start
var healPercent = ((hero.wis * 5) / hero.health) * 100; // for the healthBar to function needs a percentage not a value

var heroSkillTotal = hero.str + hero.sta + hero.wis + hero.agi;
var expThreshold = (heroSkillTotal * 4) + ((hero.level / 2) * heroSkillTotal);

var normalHit = hero.str * 5; // damage ratio for normal hit on mob
var critHit = normalHit * 2.5; // damage ratio for critical hit on mob

var currentXp = 0; //number for the XPbar parsing needs a "%" for the style.width MAX = 100

function plusBtnEnable() {

    for (i = 0; i < plusBtn.length; i++) {
        plusBtn[i].disabled = false;
    }
}

function addStrength() {
    hero.str += 1;
    strength.innerText = hero.str;
    hero.points -= 1;
    if (hero.points == 0)
        plusBtnDisable();
    youHave.innerText = "";
    heroPoints.innerText = "";
    toSpend.innerText = "";
    console.log(hero.str);
}

function addStamina() {
    hero.sta += 1;
    stamina.innerText = hero.sta;
    hero.points -= 1;
    if (hero.points == 0)
        plusBtnDisable();
    youHave.innerText = "";
    heroPoints.innerText = "";
    toSpend.innerText = "";
    console.log(hero.sta);
}

function addWisdom() {
    hero.wis += 1;
    wisdom.innerText = hero.wis;
    hero.points -= 1;
    if (hero.points == 0)
        plusBtnDisable();
    youHave.innerText = "";
    heroPoints.innerText = "";
    toSpend.innerText = "";
    console.log(hero.wis);
}

function addAgility() {
    hero.agi += 1;
    agility.innerText = hero.agi;
    hero.points -= 1;
    if (hero.points == 0)
        plusBtnDisable();
    youHave.innerText = "";
    heroPoints.innerText = "";
    toSpend.innerText = "";
    console.log(hero.agi);
}

function plusBtnDisable() {

    for (i = 0; i < plusBtn.length; i++) {
        plusBtn[i].disabled = true;
    }
}


function lvlBlink() {
    levelup.innerText = "LEVEL UP!";
    levelup.style.color = "red";
    setTimeout(function () {
        levelup.style.color = "orange"
    }, 500);
    setTimeout(function () {
        levelup.style.color = "white"
    }, 1000);
    setTimeout(function () {
        levelup.innerText = "Congratulations!"
    }, 1500);
    setTimeout(function () {
        levelup.innerText = "LEVEL UP!"
    }, 2500);
    setTimeout(function () {
        levelup.style.color = "red"
    }, 3000);
    setTimeout(function () {
        levelup.style.color = "orange"
    }, 3500);
    setTimeout(function () {
        levelup.style.color = "white"
    }, 4000);
    setTimeout(function () {
        levelup.innerText = "Spend points to improve your stats"
    }, 4500);
    setTimeout(function () {
        levelup.innerText = ""
    }, 6500);
}



function getReward(mob) {
    var mobXP = mob.reward + (mob.reward / hero.level);
    hero.exp += mobXP;
    currentXp += (mobXP / 120) * 100;
    xpBar.style.width = currentXp + "%";
    if (currentXp >= 100) {
        hero.level += 1;
        lvlBlink(); // level up text flash
        heroLevel.innerText = " Lvl" + hero.level;
        hero.points += 1;
        plusBtnEnable(); // "+" buttons are enabled on gaining a point
        if (hero.points >= 2) {
            heroPoints.innerText = hero.points + " hero points to spend!";
        } else {
            heroPoints.innerText = hero.points + " hero point to spend!";
        }
        currentXp = currentXp - 100; // percentage of remaining xp after reset
        xpBar.style.width = currentXp + "%";
    }

}

function onMobDeath(currentBeast) {
    switch (currentBeast) {
        case giant:
            getReward(giant);
            break;
        case troll:
            getReward(troll);
            break;
        case witch:
            getReward(witch);
            break;
        case orc:
            getReward(orc);
            break;
        case goblin:
            getReward(goblin);
            break;
        case bandit:
            getReward(bandit);
            break;
        case archer:
            getReward(archer);
            break;
    }
}

function firstAid() { //heal button function
    hpValue += healPercent;
    hero.health += (hero.wis * 5);
    
    if (hpValue >= 100) hpValue = 100;
    if (hero.health >= hero.sta * 20) {
        hero.health = hero.sta * 20;
        heal.disabled = true;
        
    }
    healthBar.innerText = Math.round(hpValue) + "%";
    healthBar.style.width = hpValue + "%";
    console.log(currentBeast);
    console.log(hero.health);
}


function power(enemy) {
    return enemy.str * 5
}

function heroGotHit() {
    var dmgPercent = ((eval(currentBeast).str * 5) / (hero.health)) * 100; //works now and is connected to defend button for the meantime
    hpValue -= dmgPercent;
    hero.health -= eval(currentBeast).str * 5;
    if (hpValue <= 0) hpValue = 0; //keep it over 0%
    if (hero.health <= 0) hero.health = 0;
    healthBar.innerText = Math.round(hpValue) + "%";
    healthBar.style.width = hpValue + "%";


    console.log(hero.health);
}

var baseHitChance = 25; //25 and above hit chance (75%)
var baseCrit = 95; // base crit 95 and above (5%)
var dodgeChance = baseHitChance;
var critChance = baseCrit;

function hitChance() { //changes the base values of hit and crit depending on the current enemy
    var extraCrit = (hero.agi - eval(currentBeast).agi) // gives 1% crit increase for each agi point higher than mob 
    var result1 = extraCrit * 5; //for every point above the enemy's agi gives 5 percent more chance to hit on a base of 75% and 1% extra crit

    if (result1 <= 0) {
        result1 = 0;
    }
    var result2 = (eval(currentBeast) - hero.agi) * 5;
    if (result2 <= 0) {
        result2 = 0;
    }

    critChance = baseCrit - extraCrit // increases the boundaries of crit chance 
    if (baseCrit >= 100) {
        baseCrit = 100;
    }
    dodgeChance = baseHitChance - (result1 - result2); // changes the boundaries of hit chance depending on hero and enemy agility
    if (baseHitChance >= 100) {
        baseHitChance = 100;
    }
}


function onButtonPress() {
    attack.disabled = true; //attack button disabled after press immediately
    setTimeout(function () {attack.disabled = false;}, delay); //attack button enabled after a timeout based off hero.agi
    
}

function swing() {
   
    hitChance();
    unique();

    if (getRandom100 >= critChance) {
        console.log("You got a critical strike, on the " + "beast" + "!!");
        console.log((hero.str * 5) * 2.5 + " damage!")
        eval(currentBeast).health -= critHit; // <-------------------------------------- CRITICAL damage to current mob's health
        console.log("Rolling... " + getRandom100);
        console.log('current crit chance % => ' + (100 - baseCrit));
        if (eval(currentBeast).health <= 0) { // <------------------------------------- if mob is killed by CRITICAL damage, then---v
            encounter.innerText = "You have slain the " + currentBeast + "!";
            onMobDeath(eval(currentBeast));
            monsterPic.src = "https://easydrawingguides.com/wp-content/uploads/2018/11/Tombstone-10.png"; // displays a gravestone in place of the mob
            attack.disabled = true; // disables 'Attack' button AFTER mob dies
            defend.disabled = true; // disables 'Defend' button AFTER mob dies
            heal.disabled = true; // disables 'Heal' button AFTER mob dies
            run.disabled = true; // disables 'Run' button AFTER mob dies
        }
    } else if (getRandom100 <= dodgeChance) {
        console.log("You swung and missed..");
        console.log("Rolling... " + getRandom100);

    } else {
        eval(currentBeast).health -= hero.str * 5; // <-------------------------------------NORMAL damage to current mob's health
        console.log("You hit the " + currentBeast);
        console.log(hero.str * 5 + " damage!"); //add normal hit function
        console.log("Rolling... " + getRandom100);

        if (eval(currentBeast).health <= 0) { // <------------------------------------- if mob is killed by NORMAL damage, then---v
            encounter.innerText = "You have slain the " + currentBeast + "!";
            onMobDeath(eval(currentBeast));
            monsterPic.src = "https://easydrawingguides.com/wp-content/uploads/2018/11/Tombstone-10.png"; // displays a gravestone in place of the mob
            attack.disabled = true; // disables 'Attack' button AFTER mob dies
            defend.disabled = true; // disables 'Defend' button AFTER mob dies

            run.disabled = true; // disables 'Run' button AFTER mob dies



        }
    }
    attack.disabled = true; //disables 'Attack' button on tap
    if (eval(currentBeast).health !== 0) {
        setTimeout(function () {
            attack.disabled = false;
        }, delay(hero)); //delays 'Attack' button's reuse
    } 
}

function mobAttack(){
    
}

/*
function swingConnect() {
    var xpGain = Math.floor((xpValue() / expThreshold) * 100); //(69 / 90)*100 = 76.66666 floor gives 76
    hero.exp += Math.floor(((5 / expThreshold) * 100));
    // supposed to check if leveled up and level hero up
    currentXp += Math.floor(((5 / expThreshold) * 100)); // (5/90)*100 = (5.555) floor to 5 to match
    xpBar.style.width = currentXp + "%";
    eval(currentBeast).health -= (hero.str * 5);
    if (eval(currentBeast).health <= 0) {
        eval(currentBeast).health = 0;
        currentXp += xpGain;
        xpBar.style.width = currentXp + "%"; //xpgain is 76
        encounter.innerText = "You have slain the " + currentBeast + "!";
        attack.disabled = true;
        setTimeout(() => {
            attack.disabled = false;
            encounterFunc()
        }, 3000)

        /*if(eval(currentBeast).health <= 0){
            
            encounterFunc()
            attack.disabled = false;
        }
    //}
    
}
*/




function healing(enemy) {
    return enemy.wis * 5
}

function delay(hero) {
    return 10000 / hero.agi
}


let currentBeast = "test";



var oldBeast = 0;

function encounterFunc() {
    
    attack.disabled = false; // ENABLES ACTION buttons when button is clicked EXCEPT RESTORE/HEAL until (added later) hero is damaged
    defend.disabled = false;
    

    run.disabled = false;

    console.log(hero.str);

    encounter.innerText = "A" + adjective[getRandom(0, 6)] + enemy[getRandom(0, 6)] + " is" + foundYou[getRandom(0, 5)];
    if (encounter.innerText.includes("giant")) {
        monsterPic.src = 'https://i.pinimg.com/originals/3d/61/50/3d6150af11ad32eac0b274ef3a16ace8.jpg';
        currentBeast = "giant";
        if (oldBeast == "giant") encounterFunc();
    } else if (encounter.innerText.includes("troll")) {
        monsterPic.src = 'https://reliablyuncomfortable.files.wordpress.com/2017/02/bridge-troll.png?w=584';
        currentBeast = "troll";
        if (oldBeast == "troll") encounterFunc();
    } else if (encounter.innerText.includes("witch")) {
        monsterPic.src = 'https://gregcartmell.com/wp-content/uploads/2017/10/the-lost-witch.jpg';
        currentBeast = "witch";
        if (oldBeast == "witch") encounterFunc();
    } else if (encounter.innerText.includes("orc warrior")) {
        monsterPic.src = 'https://fantasyinmotion.files.wordpress.com/2013/09/492_max.jpg';
        currentBeast = "orc";
        if (oldBeast == "orc") encounterFunc();
    } else if (encounter.innerText.includes("goblin spearman")) {
        monsterPic.src = 'https://i.redd.it/8hkw7l00kcg21.jpg';
        currentBeast = "goblin";
        if (oldBeast == "goblin") encounterFunc();
    } else if (encounter.innerText.includes("bandit")) {
        monsterPic.src = 'https://i.pinimg.com/originals/c6/42/3c/c6423c37fb819522413e7aefdc58ee87.jpg';
        currentBeast = "bandit";
        if (oldBeast == "bandit") encounterFunc();
    } else {
        monsterPic.src = 'https://whfb.lexicanum.com/mediawiki/images/thumb/2/2c/Warhammer_Tomb_Kings_Skeletal_Archers.png/300px-Warhammer_Tomb_Kings_Skeletal_Archers.png';
        currentBeast = "archer";
        if (oldBeast == "archer") encounterFunc();
    }
    oldBeast = currentBeast;

}
//run.addEventListener("click", xpValue); // currently links run button to xp result for current mob
attack.addEventListener("click", swing); //currently links attack button to direct monster hit and damage
defend.addEventListener("click", heroGotHit); // damages hero's health and healthbar
heal.addEventListener("click", firstAid); // Heal button action on progressbar
advance.addEventListener("click", encounterFunc); //clicking advance generates random encounter
addSTR.addEventListener("click", addStrength); //click the "+" below STR to add a strength point to hero and update the corresponding badge
addSTA.addEventListener("click", addStamina);
addWIS.addEventListener("click", addWisdom);
addAGI.addEventListener("click", addAgility);

function getRandom(min, max) { // creates a random number betwen min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var getRandom100 = Math.floor(Math.random() * 100);

var unique = (function () { // wrap everything in an IIFE
    var arr = []; // the array that contains the possible values
    for (var i = 0; i < 100; i++) // fill it
        arr.push(i);

    return function () { // return the function that returns random unique numbers
        if (!arr.length) // if there is no more numbers in the array
            console.log("No more!"); // alert and return undefined

        var rand = Math.floor(Math.random() * arr.length); // otherwise choose a random index from the array
        getRandom100 = arr.splice(rand, 1)[0]; // cut out the number at that index and return it
    };
})();