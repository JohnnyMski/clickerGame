var gameData = {
    update: 0,
    lastTick: Date.now(),
    stuff: 0,
    stuffPerClick: 1,
    stuffUpgradeCost: 10,
    stuffUpgradeAmount: 0,
    stuffMachineCost: 50,
    stuffMachineAmount: 0,
    stuffMachineOutput: 1,
    idleStuff: 0
}

function getStuff(amount) {
    gameData.stuff += gameData.stuffPerClick;
    
    document.getElementById("stuffGot").innerHTML = gameData.stuff + " Stuff got";
    document.getElementById("upgradeStuff").innerHTML = "Practice Stuff-Getting Technique (" + gameData.stuffUpgradeAmount + "). Cost: " + gameData.stuffUpgradeCost + " stuff";
    document.getElementById("getMachine").innerHTML = "Build a Stuff-Gathering Machine out of Stuff (" + gameData.stuffMachineAmount + "). Cost: " + gameData.stuffMachineCost + " Stuff";
}

function upgradeStuff() {
    if (gameData.stuff >= gameData.stuffUpgradeCost) {
        gameData.stuff -= gameData.stuffUpgradeCost;
        document.getElementById("stuffGot").innerHTML = gameData.stuff + " Stuff got";
        gameData.stuffUpgradeAmount++;
        gameData.stuffPerClick++;
        gameData.stuffUpgradeCost *= 2;
        document.getElementById("upgradeStuff").innerHTML = "Practice Stuff-Getting Technique (" + gameData.stuffUpgradeAmount + "). Cost: " + gameData.stuffUpgradeCost + " Stuff";
        localStorage.setItem("stuffClickerSave", JSON.stringify(gameData));
    }
    
}

function buyStuffMachine() {
    if (gameData.stuff >= gameData.stuffMachineCost) {
        gameData.stuff -= gameData.stuffMachineCost;
        document.getElementById("stuffGot").innerHTML = gameData.stuff + " Stuff got";
        gameData.stuffMachineAmount++;
        gameData.stuffMachineCost *= 2;
        gameData.idleStuff += gameData.stuffMachineOutput * gameData.stuffMachineAmount;
        document.getElementById("getMachine").innerHTML = "Build a Stuff-Gathering Machine out of Stuff (" + gameData.stuffMachineAmount + "). Cost: " + gameData.stuffMachineCost + " Stuff";
        localStorage.setItem("stuffClickerSave", JSON.stringify(gameData));
    }
}

var mainGameLoop = window.setInterval(function () {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now();
    gameData.stuff += gameData.idleStuff * (diff / 1000);
}, 1000)

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("stuffClickerSave", JSON.stringify(gameData));
}, 15000)

var savegame = JSON.parse(localStorage.getItem("stuffClickerSave"));
if (savegame !== null) {
    if (gameData.update == 0) {
        gameData = savegame;
    }
    
}
