var gameData = {
    update: 0,
    lastTick: Date.now(),
    stuff: 0,
    stuffPerClick: 1,
    stuffUpgradeCost: 10,
    stuffUpgradeAmount: 0,
    stuffMachineCost: 50,
    stuffMachineAmount: 0,
    stuffMachineOutput: 1
}

function getStuff(amount) {
    if (amount == 0) {
        gameData.stuff += gameData.stuffPerClick
    }
    else {
        gameData.stuff += gameData.stuffMachineAmount * gameData.stuffMachineOutput
    }
    
    document.getElementById("stuffGot").innerHTML = gameData.stuff + " Stuff got"
}

function upgradeStuff() {
    if (gameData.stuff >= gameData.stuffUpgradeCost) {
        gameData.stuff -= gameData.stuffUpgradeCost
        document.getElementById("stuffGot").innerHTML = gameData.stuff + " Stuff got"
        gameData.stuffUpgradeAmount++
        gameData.stuffPerClick++
        gameData.stuffUpgradeCost *= 2
        document.getElementById("upgradeStuff").innerHTML = "Practice Stuff-Getting Technique (" + gameData.stuffUpgradeAmount + "). Cost: " + gameData.stuffUpgradeCost + " Stuff"
        localStorage.setItem("stuffClickerSave", JSON.stringify(gameData))
    }
    
}

function buyStuffMachine() {
    if (gameData.stuff >= gameData.stuffMachineCost) {
        gameData.stuff -= gameData.stuffMachineCost
        document.getElementById("stuffGot").innerHTML = gameData.stuff + " Stuff got"
        gameData.stuffMachineAmount++
        gameData.stuffMachineCost *= 2
        document.getElementById("getMachine").innerHTML = "Build a Stuff-Gathering Machine out of Stuff (" + gameData.stuffMachineAmount + "). Cost: " + gameData.stuffMachineCost + " Stuff"
        localStorage.setItem("stuffClickerSave", JSON.stringify(gameData))
    }
}

var mainGameLoop = window.setInterval(function () {
    getStuff(1)
    document.getElementById("upgradeStuff").innerHTML = "Practice Stuff-Getting Technique (" + gameData.stuffUpgradeAmount + "). Cost: " + gameData.stuffUpgradeCost + " stuff"
    document.getElementById("getMachine").innerHTML = "Build a Stuff-Gathering Machine out of Stuff (" + gameData.stuffMachineAmount + "). Cost: " + gameData.stuffMachineCost + " Stuff"
}, 1000)

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("stuffClickerSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("stuffClickerSave"))
if (savegame !== null) {
    if (gameData.update == 0) {
        gameData = savegame
    }
    
}