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

var stringBox = document.getElementById("stringBox");
//stringBox.scrollTop = stringBox.scrollHeight; to keep scroll bar at the bottom you have to add this code after every addition of stringText
//  ---------------------------------------------- ARRAYS for 'encounter' string ----------------------------------------
var enemy = ["giant", "troll", "witch", "orc warrior", "goblin spearman", "bandit", "skeleton archer"];
var foundYou = [" watching as you emerge from the undergrowth!", " rustling in the bushes!", " laughing at you from the shadows!", " running from behind!", " approaching!", " lumbering towards you slowly!"];
var adjective = [" disgusting ", "n evil ", " wicked ", "n ugly ", " menacing ", " loud ", "n obnoxious ", " foul "];

//  ---------------------------------------------- CHARACTER objects -----------------------------------------------------
var hero = {
    str: 5,
    sta: 5,
    wis: 8,
    agi: 5,
    shield: false,
    shieldGOT: false
};
var shldHP = hero.sta * 8;

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
    if (hero.points > 1) {
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
    shldHP = hero.sta * 8;
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
    console.log('shield strength is ' + shldHP);
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
        hero.points += 2;
        plusBtnEnable(); // "+" buttons are enabled on gaining a point
        if (hero.points > 1) {
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


var _i = 0;
var timer = 5;

function reset_i() {
    _i = 0
}

function healUp() {
    var healIncreasePercent = (((hero.wis * 2.5) / (hero.sta * 20)) * 100);
    if (activeHealth <= ((hero.sta * 20) - hero.wis * 2.5)) {
        activeHealth += healIncreasePercent;
        console.log("active health =>> " + activeHealth);
        if (activeHealth >= 100) {
            activeHealth = 100;

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
    console.log('counter', _i);
    console.log("heal % => " + healIncreasePercent);
    if (_i < timer) {
        setTimeout(healUp, 500);
    } else {
        clearTimeout(healUp);
        reset_i();

    }
}

function shieldBlock() {
    if (defend.innerText == "Rescue") {
        stringText.innerHTML += "You break the lock on the cage and the door swings open.</br> The prisoner climbs free!<br />";
        if (hero.shieldGOT === false) {
            setTimeout(function () {
                stringText.innerHTML = "<b>Thank you for saving me!</b><br />Here,take this <b>special shield</b>, it will help you on your journey. <br /> Don\'t worry about me, I\'m going to get my strength back before heading to my village, I have to warn them!";
                stringText.style.color = "orange";
                defend.innerText = "Block";
                hero.shieldGOT = true; // special shield added
            }, 2000);
        } else if (hero.swordGOT === false) {
            setTimeout(function () {
                    stringText.innerHTML = "<b>Thank you for saving me!</b><br />Here,take this <b>special sword</b>, it will help you on your journey. <br /> Don\'t worry about me, I\'m going to get my strength back before heading to my village, I have to warn them!";
                    stringText.style.color = "orange";
                    defend.innerText = "Block";
                    hero.swordGOT = true;   // special sword added
                },2000);
            } else {
                setTimeout(function(){
                    stringText.innerHTML = "<b>Thank you for saving me!</b><br />I must go warn my village!<br />";
                    stringText.style.color = "orange";
                    defend.innerText = "Block";
                    setTimeout(function(){
                        if (stringText.innerHTML.contains("strong")){
                            stringText.innerHTML += "<b>Your strength increased!</b><br />";
                            hero.str += 2;   
                        } else if (stringText.innerHTML.contains("tough")){
                            stringText.innerHTML += "<b>Your stamina increased!</b><br />";
                            hero.sta += 2;
                        } else if (stringText.innerHTML.contains("old")){
                            stringText.innerHTML += "<b>Your wisdom increased!</b><br />";
                            hero.wis += 2;
                        } else if (stringText.innerHTML.contains("skinny")){
                            stringText.innerHTML += "<b>Your agility increased!</b><br />";
                            hero.agi += 2;
                        }
                        stringText.innerHTML += "You recieved 2 hero points!<br />";
                        hero.points += 2;
                    }, 1000);
                },2000);
            }
        }
    if (hero.shield === true) {
        stringText.innerHTML += "<b>You lower your shield and take an aggressive stance<b><br />";
        stringBox.scrollTop = stringBox.scrollHeight;

        hero.shield = false;
    } else {
        stringText.innerHTML += "<b>You raise your shield in a defensive position<b><br />";
        stringBox.scrollTop = stringBox.scrollHeight;

        //add function for shield block hero.health -= (mobattackDamage)/4 and hero attack halved ((hero.str*5)/2)
        hero.shield = true; // should it be toggle or duration?
    }
    attack.innerText = "Attack";
defend.innerText = "Block";
run.innerText = "Escape";
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
    stringText.innerHTML += ('<small>The ' + currentBeast + ' swings at you..</small>');
    stringBox.scrollTop = stringBox.scrollHeight;

    var result = 25 + ((hero.agi * 5) - (eval(currentBeast).agi * 5)); //mob needs to roll above this result to hit hero the higher the harder
    if (result <= 0) result = 0;
    if (getRandom(0, 100) > result) {



        if (hero.shield === true) {
            stringText.innerHTML += ('&nbsp;&nbsp;you were <b>hit</b> for <b>' + eval(currentBeast).str * 1.25 + "</b> damage!<br />");
            heroGotHit();
            stringBox.scrollTop = stringBox.scrollHeight;
        } else {
            stringText.innerHTML += ('&nbsp;&nbsp;you were <b>hit</b> for <b>' + eval(currentBeast).str * 5 + "</b> damage!<br />");
            heroGotHit();
            stringBox.scrollTop = stringBox.scrollHeight;
        }
    } else {
        stringText.innerHTML += ("&nbsp;&nbsp;You <b>dodged</b> the " + currentBeast + "\'s attack<br />");
        stringBox.scrollTop = stringBox.scrollHeight;

    }
    if (eval(currentBeast).health > 0) {
        mobAttackLoop()
    }



}



function heroGotHit() {
    if (hero.shield === true) {
        hero.health -= eval(currentBeast).str * 1.25;
        activeHealth = (hero.health / (hero.sta * 20)) * 100;
        heal.disabled = false;
    } else {
        hero.health -= eval(currentBeast).str * 5;
        activeHealth = (hero.health / (hero.sta * 20)) * 100;
        heal.disabled = false;
    }
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

function escape(){
    if (run.innerText == "Leave") {
        stringText.innerHTML += "You leave the prisoner to his fate..";
        setTimeout(encounterFunc,2000);
    } else {
    run.disabled = true;
    setTimeout(function(){
        run.disabled = false;
    },1000);
    stringText.innerhtml += "<b>You frantically try to flee..&nbsp;&nbsp;</b>";
    setTimeout(function(){
        var escapeChance = 30;
        var chanceRoll = getRandom(0,100);
        if(hero.agi >= eval(currentBeast).agi){
             escapeChance -= (hero.agi - eval(currentBeast).agi)*10;
             if (escapeChance <=0){escapeChance = 0;}
        }
        if (hero.agi< eval(currentBeast).agi){
            escapeChance += (eval(currentBeast).agi - hero.agi)*10;
            if (escapeChance >=100) {escapeChance = 100;}
        }
        if (chanceRoll>= escapeChance){
            stringText.innerHTML += "<b>You escaped safely!</b><br />";
            currentBeast = "none";
            // add safe area for hero to escape to
            console.log("Roll above "+escapeChance+" to escape!\nYou scored a "+getRandom(0,100));
        } else {
            stringText.innerHTML += "<b> but the "+currentBeast+" caught up with you!</b><br />";
            console.log("Roll above "+escapeChance+" to escape!\nYou scored a "+getRandom(0,100))
        }

    },500);
    console.log("RUN was pressed");
}
attack.innerText = "Attack";
defend.innerText = "Block";
run.innerText = "Escape";
}


function swing() {
    if (attack.innerText == "Kill") {
        stringText.innerHTML += "You <b>killed</b> the prisoner.<br /> There was nothing of value.<br />";
        
    }
    if (attack.innerText == "Attack"){
    hitChance();
    unique();



    if (getRandom(0, 100) >= critChance) {
        if (hero.shield === true) {

            stringText.style.color = "blue";
            stringText.innerHTML += ("You <b>critically strike</b>, the " + currentBeast + " for <b>" + (hero.str * 2.5) * 2.5 + "</b> damage!!<br />");
            eval(currentBeast).health -= (hero.str * 2.5) * 2.5;
            stringBox.scrollTop = stringBox.scrollHeight;

        } else {

            stringText.style.color = "blue";
            stringText.innerHTML += ("You <b>critically strike</b>, the " + currentBeast + " for <b>" + (hero.str * 5) * 2.5 + "</b> damage!!<br />");
            eval(currentBeast).health -= critHit; // <-------------------------------------- CRITICAL damage to current mob's health
            stringBox.scrollTop = stringBox.scrollHeight;

        }
        if (eval(currentBeast).health <= 0) { // <------------------------------------- if mob is killed by CRITICAL damage, then---v
            eval(currentBeast).health = 0; // does not display minus numbers for health
            encounter.innerText = "You have slain the " + currentBeast + "!";
            stringText.style.color = "red";
            stringText.innerHTML += "The " + currentBeast + " <b>fell to the ground</b>.<br />";
            onMobDeath(eval(currentBeast));
            monsterPic.src = "https://easydrawingguides.com/wp-content/uploads/2018/11/Tombstone-10.png"; // displays a gravestone in place of the mob
            attack.disabled = true; // disables 'Attack' button AFTER mob dies
            defend.disabled = true; // disables 'Defend' button AFTER mob dies
            stringBox.scrollTop = stringBox.scrollHeight;

            run.disabled = true; // disables 'Run' button AFTER mob dies
        }

        mobHealth.innerText = eval(currentBeast).health; //updates the mob's health in html document

        
    } else if (getRandom(0, 100) <= dodgeChance) {
        stringText.innerHTML += ("<small>You swung and missed..</small><br />");
        stringBox.scrollTop = stringBox.scrollHeight;


    } else {
        if (hero.shield === true) {
            eval(currentBeast).health -= hero.str * 2.5;
            stringText.style.color = "green";
            stringText.innerHTML += ("You <b>hit</b> the " + currentBeast + " for <b>" + hero.str * 2.5 + "</b> damage!<br />");
            stringBox.scrollTop = stringBox.scrollHeight;

        } else {

            eval(currentBeast).health -= hero.str * 5; // <-------------------------------------NORMAL damage to current mob's health
            stringText.style.color = "green";
            stringText.innerHTML += ("You <b>hit</b> the " + currentBeast + " for <b>" + hero.str * 5 + "</b> damage!<br />");
            stringBox.scrollTop = stringBox.scrollHeight;

        }
        if (eval(currentBeast).health <= 0) { // <------------------------------------- if mob is killed by NORMAL damage, then---v
            eval(currentBeast).health = 0; //makes sure no minus figures for health



            encounter.innerText = "You have slain the " + currentBeast + "!";
            stringText.style.color = "red";
            stringText.innerHTML += "The " + currentBeast + " <b>fell to the ground</b>.<br />";
            stringBox.scrollTop = stringBox.scrollHeight;

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
attack.innerText = "Attack";
defend.innerText = "Block";
run.innerText = "Escape";
}





function delay(hero) {
    return 10000 / hero.agi
}

var characterLocation = [" small hut", "n abandoned campfire", " cave set into the rock", " hole in the ground"]
var characterType = [" strong", " tough", " old", " skinny"]

function characterEncounter() {
    encounter.innerText = "You approach a" + characterLocation[getRandom(0, 3)];
    if (encounter.innerText.includes("hut")) {
        monsterPic.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ddae9fd2-cf9f-4752-ac31-f2c6aef12b7a/d52cs03-38876440-9e62-4aec-8b9b-086ee7423774.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9kZGFlOWZkMi1jZjlmLTQ3NTItYWMzMS1mMmM2YWVmMTJiN2EvZDUyY3MwMy0zODg3NjQ0MC05ZTYyLTRhZWMtOGI5Yi0wODZlZTc0MjM3NzQuanBnIn1dXX0.nr5XVvk0_3-0FATP50jdHrShAtQUvjTfT9VB9o-bF7U";

        stringText.innerHTML = "You follow the sound of <b>someone\'s voice</b>, and around the back of the hut you find...<br />"
        setTimeout(function () {
            monsterPic.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64448f8b-c9f5-4cf8-8b28-187ad23f85be/d63nvhj-e0334fc0-2c94-4175-b355-58df78c4237b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0NDQ4ZjhiLWM5ZjUtNGNmOC04YjI4LTE4N2FkMjNmODViZVwvZDYzbnZoai1lMDMzNGZjMC0yYzk0LTQxNzUtYjM1NS01OGRmNzhjNDIzN2IuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E12Mvz2-QaeUtjCcwjaJfEStYpIvxs36vabG11fBvbU";
            stringText.innerHTML += "a <b>" + characterType[getRandom(0, 3)] + " looking prisoner</b> trapped inside a cage.<br />";
            defend.innerText = "Rescue";
            attack.innerText = "Kill";
            run.innerText = "Leave";
            attack.disabled = false;
            defend.disabled = false;
            run.disabled = false;
        }, 2500);

        
            attack.disabled = true;
            defend.disabled = true;
            run.disabled = true;
        } else if (encounter.innerText.includes("campfire")) {
            monsterPic.src = "http://serenesforest.net/wp-content/uploads/2014/05/fe10-nighttime-campfire.png";

            attack.disabled = true;
            defend.disabled = true;
            run.disabled = true;
        } else if (encounter.innerText.includes("cave")) {
            monsterPic.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/db9fb4ac-af7b-4d2c-ba47-ac499eefd219/d359pnq-4b39be93-28df-447b-ae59-030a1c1a2ff1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9kYjlmYjRhYy1hZjdiLTRkMmMtYmE0Ny1hYzQ5OWVlZmQyMTkvZDM1OXBucS00YjM5YmU5My0yOGRmLTQ0N2ItYWU1OS0wMzBhMWMxYTJmZjEuanBnIn1dXX0.6Kwf6UO6QnREkrIEQ0sr0RVQN4P2f1NcI3FuQwhI5tY";

            attack.disabled = true;
            defend.disabled = true;
            run.disabled = true;
        } else if (encounter.innerText.includes("hole")) {
            monsterPic.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1794d805-bdb4-4b63-bc0d-57f10c2f885b/dayjk31-0baf37e2-7586-46ac-9a2b-d1c1c91ccc2d.jpg/v1/fill/w_1014,h_788,q_70,strp/pit_trap_by_alcoholichamster_dayjk31-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Nzk2IiwicGF0aCI6IlwvZlwvMTc5NGQ4MDUtYmRiNC00YjYzLWJjMGQtNTdmMTBjMmY4ODViXC9kYXlqazMxLTBiYWYzN2UyLTc1ODYtNDZhYy05YTJiLWQxYzFjOTFjY2MyZC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.dbgFwRa4tdmUVGEkMA_vRPlgnrx7yuiE8TYqghrIth0";

            attack.disabled = true;
            defend.disabled = true;
            run.disabled = true;
        }
    }


    let currentBeast = "test";
    var oldBeast = 0;

    function encounterFunc() {
        stringText.innerText = ""; // resets stringText

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
    defend.addEventListener("click", shieldBlock); // links block to shieldBlock function
    heal.addEventListener("click", healUp); // Heal button action on progressbar
    run.addEventListener("click", escape); // links run to escape()
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