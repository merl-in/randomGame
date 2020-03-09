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
var mobHealth = document.getElementById('mobHealth');
var mobHealth2 = document.getElementById('mobHealth2');
var stringText = document.getElementById('stringText');
var indicator = document.getElementById('indicator');
//  ---------------------------------------------- ARRAYS for 'encounter' string ----------------------------------------
var enemy = ["giant", "troll", "witch", "orc warrior", "goblin spearman", "bandit", "skeleton archer"];
var foundYou = [" watching as you emerge from the undergrowth!", " rustling in the bushes!", " laughing at you from the shadows!", " running from behind!", " approaching!", " lumbering towards you slowly!"];
var adjective = [" disgusting ", "n evil ", " wicked ", "n ugly ", " menacing ", " loud ", "n obnoxious ", " foul "];

//  ---------------------------------------------- CHARACTER objects -----------------------------------------------------
var hero = {
    str: 5,
    sta: 5,
    wis: 8,
    agi: 5
};
var giant = {
    str: 10,
    sta: 10,
    wis: 2,
    agi: 2,
    reward: 75,
    maxhealth: 200
};
var troll = {
    str: 6,
    sta: 7,
    wis: 4,
    agi: 5,
    reward: 55,
    maxhealth: 140
};
var witch = {
    str: 3,
    sta: 3,
    wis: 6,
    agi: 4,
    reward: 35,
    maxhealth: 60
};
var orc = {
    str: 6,
    sta: 6,
    wis: 3,
    agi: 7,
    reward: 45,
    maxhealth: 120
};
var goblin = {
    str: 2,
    sta: 2,
    wis: 4,
    agi: 9,
    reward: 25,
    maxhealth: 40
};
var bandit = {
    str: 5,
    sta: 4,
    wis: 3,
    agi: 6,
    reward: 30,
    maxhealth: 80

};
var archer = {
    str: 2,
    sta: 3,
    wis: 6,
    agi: 8,
    reward: 35,
    maxhealth: 60
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
    if (hero.points >= 2) {
        heroPoints.innerText = hero.points + " hero points to spend!";
    } else {
        heroPoints.innerText = hero.points + " hero point to spend!";
    }
    if (hero.points == 0) {
        plusBtnDisable();
        youHave.innerText = "";
        heroPoints.innerText = "";
        toSpend.innerText = "";
    }
    console.log(hero.str);
}

function addStamina() {
    hero.sta += 1;
    stamina.innerText = hero.sta;
    hero.points -= 1;
    if (hero.points >= 2) {
        heroPoints.innerText = hero.points + " hero points to spend!";
    } else {
        heroPoints.innerText = hero.points + " hero point to spend!";
    }
    if (hero.points == 0) {
        plusBtnDisable();
        youHave.innerText = "";
        heroPoints.innerText = "";
        toSpend.innerText = "";
    }
    console.log(hero.sta);
}

function addWisdom() {
    hero.wis += 1;
    wisdom.innerText = hero.wis;
    hero.points -= 1;
    if (hero.points >= 2) {
        heroPoints.innerText = hero.points + " hero points to spend!";
    } else {
        heroPoints.innerText = hero.points + " hero point to spend!";
    }
    if (hero.points == 0) {
        plusBtnDisable();
        youHave.innerText = "";
        heroPoints.innerText = "";
        toSpend.innerText = "";
    }
    console.log(hero.wis);
}

function addAgility() {
    hero.agi += 1;
    agility.innerText = hero.agi;
    hero.points -= 1;
    if (hero.points >= 2) {
        heroPoints.innerText = hero.points + " hero points to spend!";
    } else {
        heroPoints.innerText = hero.points + " hero point to spend!";
    }
    if (hero.points == 0) {
        plusBtnDisable();
        youHave.innerText = "";
        heroPoints.innerText = "";
        toSpend.innerText = "";
    }

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



var activeHealth;


var _i=0;
var timer=5;

function reset_i(){
    _i = 0
}

function healUp(){
    var healIncreasePercent = (((hero.wis * 2.5) / (hero.sta * 20)) * 100);
    if (activeHealth <= ((hero.sta * 20) - hero.wis * 2.5)) {
        activeHealth += healIncreasePercent;
        console.log("active health =>> "+activeHealth);
        if (activeHealth >= 100) {
            activeHealth = 100;
            console.log(activeHealth)
        }
        activeHealth = (hero.health / (hero.sta * 20)) * 100;
        healthBar.innerText = Math.round(activeHealth) + "%";
        healthBar.style.width = Math.round(activeHealth) + "%";
        console.log("healed for " + hero.wis * 2.5);

        hero.health += hero.wis * 2.5;
        if (hero.health >= hero.sta * 20) {
            hero.health = hero.sta * 20;
        }
        
        
        
    }
    _i++;
    console.log('counter',_i);
    console.log("heal % => "+healIncreasePercent);
    if(_i <timer){
        setTimeout(healUp,500);
    } else {
        clearTimeout(healUp);
        reset_i();

    }
}









function mobAttackLoop() {
    if (hero.health > 0) { //mob will attack as long as hero is alive
        setTimeout(mobAttack, 10000 / eval(currentBeast).agi);

    }
    if (eval(currentBeast).health <= 0) {
        console.log(currentBeast + " died..");
        return;
    }
}

function mobAttack() {
    if (eval(currentBeast).health <= 0) return;
    stringText.innerText += ('\nThe ' + currentBeast + ' swings at you..');
    var result = 25 + ((hero.agi * 5) - (eval(currentBeast).agi * 5)); //mob needs to roll above this result to hit hero the higher the harder
    if (result <= 0) result = 0;
    if (getRandom(0, 100) > result) {




        stringText.innerText += ('\nThe ' + currentBeast + ' hit you for ' + eval(currentBeast).str * 5 + " damage!");
        heroGotHit();

    } else {
        stringText.innerText += ("\nYou dodged the " + currentBeast + "\'s attack");

    }
    if (eval(currentBeast).health > 0) {
        mobAttackLoop()
    }



}



function heroGotHit() {

    hero.health -= eval(currentBeast).str * 5;
    activeHealth = (hero.health / (hero.sta * 20)) * 100;
    heal.disabled = false;

    if (activeHealth <= 0) activeHealth = 0; //keep it over 0%
    if (hero.health <= 0) {
        hero.health = 0;
        heroDead();
    }
    healthBar.innerText = Math.round(activeHealth) + "%";
    healthBar.style.width = Math.round(activeHealth) + "%";


    console.log('hero\'s health is ' + hero.health);
}

function heroDead() {
    encounter.innerText = "The " + currentBeast + " killed you...";
    monsterPic.src = "https://66.media.tumblr.com/6909f2f4211105db7ffa8b725f5b74d6/tumblr_o1z100MQBP1tm0tuwo1_500.gif";
    attack.disabled = true;
    heal.disabled = true;
    defend.disabled = true;
    run.disabled = true;
    plusBtnDisable();
    stringText.style.fontWeight = "bold";
    stringText.innerText = "GAME OVER\nYour score was " + hero.exp + "\nThanks for playing!";
    indicator.innerHTML = "";
    advance.disabled = true;

}


var baseHitChance = 25; //25 and above hit chance (75%)
var baseCrit = 95; // base crit 95 and above (5%)
var dodgeChance = baseHitChance;
var critChance = baseCrit;

function hitChance() { //changes the base values of hit and crit depending on the current enemy
    var extraCrit = (hero.agi - eval(currentBeast).agi); // gives 1% crit increase for each agi point higher than mob 
    var result1 = extraCrit * 5; //for every point above the enemy's agi gives 5 percent more chance to hit on a base of 75% and 1% extra crit

    if (result1 <= 0) {
        result1 = 0;
    }
    var result2 = (eval(currentBeast).agi - hero.agi) * 5;
    if (result2 <= 0) {
        result2 = 0;
    }

    critChance = baseCrit - extraCrit // increases the boundaries of crit chance 
    if (critChance >= 100) {
        critChance = 100;
    }
    dodgeChance = baseHitChance - (result1 - result2); // changes the boundaries of hit chance depending on hero and enemy agility
    if (dodgeChance >= 100) {
        dodgeChance = 100;
    }
}


function onButtonPress() {
    attack.disabled = true; //attack button disabled after press immediately
    setTimeout(function () {
        attack.disabled = false;
    }, delay); //attack button enabled after a timeout based off hero.agi

}



function swing() {

    hitChance();
    unique();

    if (getRandom(0, 100) >= critChance) {
        stringText.style.color = "blue";
        stringText.innerText += ("\nYou critically strike, the " + currentBeast + " for " + (hero.str * 5) * 2.5 + " damage!!");
        console.log((hero.str * 5) * 2.5 + " damage!")
        eval(currentBeast).health -= critHit; // <-------------------------------------- CRITICAL damage to current mob's health

        if (eval(currentBeast).health <= 0) { // <------------------------------------- if mob is killed by CRITICAL damage, then---v
            eval(currentBeast).health = 0; // does not display minus numbers for health
            encounter.innerText = "You have slain the " + currentBeast + "!";
            stringText.style.color = "red";
            stringText.innerText += "\nThe " + currentBeast + " fell to the ground.";
            onMobDeath(eval(currentBeast));
            monsterPic.src = "https://easydrawingguides.com/wp-content/uploads/2018/11/Tombstone-10.png"; // displays a gravestone in place of the mob
            attack.disabled = true; // disables 'Attack' button AFTER mob dies
            defend.disabled = true; // disables 'Defend' button AFTER mob dies

            run.disabled = true; // disables 'Run' button AFTER mob dies
        }

        mobHealth.innerText = eval(currentBeast).health; //updates the mob's health in html document

        if (eval(currentBeast).health <= 0) {

        }
    } else if (getRandom(0, 100) <= dodgeChance) {
        stringText.innerText += ("\nYou swung and missed..");


    } else {
        eval(currentBeast).health -= hero.str * 5; // <-------------------------------------NORMAL damage to current mob's health
        stringText.style.color = "green";
        stringText.innerText += ("\nYou hit the " + currentBeast + " for " + hero.str * 5 + " damage!");
        if (eval(currentBeast).health <= 0) { // <------------------------------------- if mob is killed by NORMAL damage, then---v
            eval(currentBeast).health = 0; //makes sure no minus figures for health



            encounter.innerText = "You have slain the " + currentBeast + "!";
            stringText.style.color = "red";
            stringText.innerText += "\nThe " + currentBeast + " fell to the ground.";
            onMobDeath(eval(currentBeast));
            monsterPic.src = "https://easydrawingguides.com/wp-content/uploads/2018/11/Tombstone-10.png"; // displays a gravestone in place of the mob
            eval(currentBeast).health = 0
            attack.disabled = true; // disables 'Attack' button AFTER mob dies
            defend.disabled = true; // disables 'Defend' button AFTER mob dies

            run.disabled = true; // disables 'Run' button AFTER mob dies
        }
        mobHealth.innerText = eval(currentBeast).health; // updates mob health in html doc


    }
    attack.disabled = true; //disables 'Attack' button on tap
    if (eval(currentBeast).health !== 0) {
        setTimeout(function () {
            attack.disabled = false;
        }, delay(hero)); //delays 'Attack' button's reuse
    }
}





function delay(hero) {
    return 10000 / hero.agi
}


let currentBeast = "test";



var oldBeast = 0;

function encounterFunc() {
    stringText.innerText = "";

    attack.disabled = false; // ENABLES ACTION buttons when button is clicked EXCEPT RESTORE/HEAL until (added later) hero is damaged
    defend.disabled = false;


    run.disabled = false;


    encounter.innerText = "A" + adjective[getRandom(0, 6)] + enemy[getRandom(0, 6)] + " is" + foundYou[getRandom(0, 5)];
    if (encounter.innerText.includes("giant")) {
        monsterPic.src = 'https://i.pinimg.com/originals/3d/61/50/3d6150af11ad32eac0b274ef3a16ace8.jpg';
        currentBeast = "giant";
        giant.health = giant.sta * 20;
        //do{setInterval(mobAttack(), 10000 / eval(currentBeast))}while(eval(currentBeast).health > 0);

        beforeMobHealth.innerText = "<";
        mobHealth.innerText = eval(currentBeast).health;
        mobHealth2.innerText = "/" + eval(currentBeast).maxhealth + ">";

        if (oldBeast == "giant") encounterFunc();
    } else if (encounter.innerText.includes("troll")) {
        monsterPic.src = 'https://i.pinimg.com/736x/fd/49/86/fd4986961fb833a7b3610517cfb104f5.jpg';
        currentBeast = "troll";
        troll.health = troll.sta * 20;

        beforeMobHealth.innerText = "<";
        mobHealth.innerText = eval(currentBeast).health;
        mobHealth2.innerText = "/" + eval(currentBeast).maxhealth + ">";

        if (oldBeast == "troll") encounterFunc();
    } else if (encounter.innerText.includes("witch")) {
        monsterPic.src = 'https://historymaniacmegan.files.wordpress.com/2014/09/eve_nip-gwyllion_150986.jpg';
        currentBeast = "witch";
        witch.health = witch.sta * 20;

        beforeMobHealth.innerText = "<";
        mobHealth.innerText = eval(currentBeast).health;
        mobHealth2.innerText = "/" + eval(currentBeast).maxhealth + ">";

        if (oldBeast == "witch") encounterFunc();
    } else if (encounter.innerText.includes("orc warrior")) {
        monsterPic.src = 'https://fantasyinmotion.files.wordpress.com/2013/09/492_max.jpg';
        currentBeast = "orc";
        orc.health = orc.sta * 20;

        beforeMobHealth.innerText = "<";
        mobHealth.innerText = eval(currentBeast).health;
        mobHealth2.innerText = "/" + eval(currentBeast).maxhealth + ">";

        if (oldBeast == "orc") encounterFunc();
    } else if (encounter.innerText.includes("goblin spearman")) {
        monsterPic.src = 'https://i.redd.it/8hkw7l00kcg21.jpg';
        currentBeast = "goblin";
        goblin.health = goblin.sta * 20;

        beforeMobHealth.innerText = "<";
        mobHealth.innerText = eval(currentBeast).health;
        mobHealth2.innerText = "/" + eval(currentBeast).maxhealth + ">";

        if (oldBeast == "goblin") encounterFunc();
    } else if (encounter.innerText.includes("bandit")) {
        monsterPic.src = 'https://i.pinimg.com/originals/c6/42/3c/c6423c37fb819522413e7aefdc58ee87.jpg';
        currentBeast = "bandit";
        bandit.health = bandit.sta * 20;

        beforeMobHealth.innerText = "<";
        mobHealth.innerText = eval(currentBeast).health;
        mobHealth2.innerText = "/" + eval(currentBeast).maxhealth + ">";

        if (oldBeast == "bandit") encounterFunc();
    } else {
        monsterPic.src = 'https://whfb.lexicanum.com/mediawiki/images/thumb/2/2c/Warhammer_Tomb_Kings_Skeletal_Archers.png/300px-Warhammer_Tomb_Kings_Skeletal_Archers.png';
        currentBeast = "archer";
        archer.health = archer.sta * 20;

        beforeMobHealth.innerText = "<";
        mobHealth.innerText = eval(currentBeast).health;
        mobHealth2.innerText = "/" + eval(currentBeast).maxhealth + ">";

        if (oldBeast == "archer") encounterFunc();
    }
    oldBeast = currentBeast;
    mobAttackLoop(); //mob attacks after delay although now it is instant and has no delay

}
//run.addEventListener("click", xpValue); // currently links run button to xp result for current mob
attack.addEventListener("click", swing); //currently links attack button to direct monster hit and damage

heal.addEventListener("click", healUp); // Heal button action on progressbar
advance.addEventListener("click", encounterFunc); //clicking advance generates random encounter
addSTR.addEventListener("click", addStrength); //click the "+" below STR to add a strength point to hero and update the corresponding badge
addSTA.addEventListener("click", addStamina);
addWIS.addEventListener("click", addWisdom);
addAGI.addEventListener("click", addAgility);

function getRandom(min, max) { // creates a random number betwen min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandom100() {
    return Math.floor(Math.random() * 100);
}
var getRandom1002 = Math.floor(Math.random() * 100) + 1;

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