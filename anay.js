let playerHealth = 1000;
let opponentHealth = 1000;
let currentRank = "Wood";
let wins = 0;
let coins = 1000;
let diamonds = 500;
let dragonType = 'Air';
let dragonLevel = 1;
let foodPrices = {1: 1000, 2: 1800, 5: 4500, 10: 9000};
let dragonStats = {
    "Fire": {level: 1, damage: 100, health: 1000},
    "Lava": {level: 1, damage: 150, health: 1200},
    "Water": {level: 1, damage: 80, health: 1000},
    "Air": {level: 1, damage: 60, health: 800},
    "Laser": {level: 1, damage: 120, health: 1100},
    "Earth": {level: 1, damage: 130, health: 1300},
    "Electric": {level: 1, damage: 100, health: 900},
};

function openShop() {
    document.getElementById('lobby').style.display = 'none';
    document.getElementById('shop').style.display = 'block';
}

function closeShop() {
    document.getElementById('shop').style.display = 'none';
    document.getElementById('lobby').style.display = 'block';
}

function buyDragon(type, price) {
    if (diamonds >= price) {
        diamonds -= price;
        dragonType = type;
        dragonLevel = 1;
        updateCurrency();
        updateDragonStats();
        alert('you purchase new dragon')
    } else {
        alert("Not enough diamonds!");
    }
}

function updateDragonStats() {
    const stats = dragonStats[dragonType];
    document.getElementById('dragon-type').textContent = dragonType;
    document.getElementById('dragon-level').textContent = dragonLevel;
    document.getElementById('selected-dragon').src =`${dragonType}_.vscode/electricity_dragon_by_astralgate_dgk45ud-414w-2x.jpg"`; // Change image based on dragon type
}

function purchaseFood(level) {
    if (coins >= foodPrices[level]) {
        coins -= foodPrices[level];
        dragonLevel += level;
        updateDragonStats();
        updateCurrency();
        alert('yuor dragon level up')
    } else {
        alert("Not enough coins!");
    }
}

function levelUpDragon() {
    let foodLevel = 1;  // Example: Automatically feeding Level 1 food, you can add a selection later
    purchaseFood(foodLevel);
}

function startBattle() {
    document.getElementById('lobby').style.display = 'none';
    document.getElementById('battle').style.display = 'block';
    playerHealth = dragonStats[dragonType].health;
    opponentHealth = 1000;  // Default opponent stats
    updateHealth();
}

function useAbility(type) {
    const damage = calculateDamage(type);
    opponentHealth -= damage;
    updateHealth();

    if (opponentHealth <= 0) {
        alert("You win!");
        wins++;
        checkRankUp();
        backToLobby();
        return;
    }

    setTimeout(opponentTurn, 1000);
}

function opponentTurn() {
    const abilities = ['fire', 'water', 'air'];
    const randomAbility = abilities[Math.floor(Math.random() * abilities.length)];
    const damage = calculateDamage(randomAbility);
    playerHealth -= damage;
    updateHealth();

    if (playerHealth <= 0) {
        alert("You lost!");
        backToLobby();
    }
}

function calculateDamage(type) {
    const damageValues = {
        fire: 100,
        water: 80,
        air: 60,
        lava: 150,
        laser: 120,
        earth: 130,
        electric: 110,
    };
    return damageValues[type] || 50;
}


function checkRankUp() {
    if (wins >= 10 && wins < 20) {
        currentRank = "Stone";
    } else if (wins >= 20 && wins < 30) {
        currentRank = "Iron";
    } else if (wins >= 30 && wins < 40) {
        currentRank = "Gold";
    } else if (wins >= 40) {
        currentRank = "Diamond";
    }
    document.getElementById('rank').textContent = `Current Rank: ${currentRank}`;
}

function updateCurrency() {
    document.getElementById('coins').textContent = `💰 Coins: ${coins}`;
    document.getElementById('diamonds').textContent = `💎 Diamonds: ${diamonds}`;
}

function backToLobby() {
    document.getElementById('battle').style.display = 'none';
    document.getElementById('lobby').style.display = 'block';
    


 }
// Handle User Authentication
function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (!username || !password) {
        document.getElementById("auth-error").textContent = "Both fields are required!";
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(username)) {
        document.getElementById("auth-error").textContent = "User already exists!";
        return;
    }

    // Save user data in localStorage
    localStorage.setItem(username, JSON.stringify({ password, coins: 1000, diamonds: 500 }));
    document.getElementById("auth-error").textContent = "Sign-up successful! Please login.";
    clearAuthInputs();
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        document.getElementById("auth-error").textContent = "Both fields are required!";
        return;
    }

    // Retrieve user data
    const userData = JSON.parse(localStorage.getItem(username));
    if (!userData || userData.password !== password) {
        document.getElementById("auth-error").textContent = "Invalid username or password!";
        return;
    }

    // Successful login
    document.getElementById("auth").style.display = "none";
    document.getElementById("lobby").style.display = "block";

    // Load user data
    coins = userData.coins;
    diamonds = userData.diamonds;
    updateCurrency();
    alert("Welcome, " + username + "!");
}

function clearAuthInputs() {
    document.getElementById("signup-username").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("login-username").value = "";
     document.getElementById("login-password").value = "";
 }


 document.getElementById("auth").style.display = "block";
 document.getElementById("lobby").style.display = "none";
 document.getElementById("shop").style.display = "none";
 document.getElementById("battle").style.display = "none";
// //gsdsdsgdghsssghdddddddddddddddddddddddddddddddddddddddddddddddddddddd
let currentUser = null; // To track the logged-in user

// Handle User Authentication
function signup() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!username || !password) {
        document.getElementById("auth-error").textContent = "Both fields are required!";
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(username)) {
        document.getElementById("auth-error").textContent = "User already exists!";
        return;
    }

    // Save new user data
    const userData = {
        password,
        coins: 5000,
        diamonds: 1000,
        rank: "Wood",
        wins: 0,
        dragonType: "Fire",
        dragonLevel: 1
    };
    localStorage.setItem(username, JSON.stringify(userData));
    document.getElementById("auth-error").textContent = "Sign-up successful! Please login.";
    clearAuthInputs();
}

function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        document.getElementById("auth-error").textContent = "Both fields are required!";
        return;
    }

    // Retrieve user data
    const userData = JSON.parse(localStorage.getItem(username));
    if (!userData || userData.password !== password) {
        document.getElementById("auth-error").textContent = "Invalid username or password!";
        return;
    }

    // Successful login
    currentUser = username;
    loadUserData(userData);
    document.getElementById("auth").style.display = "none";
    document.getElementById("lobby").style.display = "block";
    alert(`Welcome back, ${username}!`);
}

// Load user data into the game
function loadUserData(userData) {
    coins = userData.coins;
    diamonds = userData.diamonds;
    currentRank = userData.rank;
    wins = userData.wins;
    dragonType = userData.dragonType;
    dragonLevel = userData.dragonLevel;

    updateCurrency();
    updateDragonStats();
    document.getElementById("rank").textContent = `Current Rank: ${currentRank}`;
}

// Save user data back to local storage
function saveUserData() {
    if (!currentUser) return;

    const userData = {
        password: JSON.parse(localStorage.getItem(currentUser)).password, // Keep the same password
        coins,
        diamonds,
        rank: currentRank,
        wins,
        dragonType,
        dragonLevel
    };
    localStorage.setItem(currentUser, JSON.stringify(userData));
}

// Update currency display
function updateCurrency() {
    document.getElementById("coins").textContent = `💰 Coins: ${coins}`;
    document.getElementById("diamonds").textContent = `💎 Diamonds: ${diamonds}`;
}

// Automatically save progress when the user interacts with the game
function purchaseFood(level) {
    if (coins >= foodPrices[level]) {
        coins -= foodPrices[level];
        dragonLevel += level;
        updateDragonStats();
        updateCurrency();
        saveUserData(); // Save progress
        alert('Your dragon leveled up!');
    } else {
        alert("Not enough coins!");
    }
}

function buyDragon(type, price) {
    if (diamonds >= price) {
        diamonds -= price;
        dragonType = type;
        dragonLevel = 1;
        updateDragonStats();
        updateCurrency();
        saveUserData(); // Save progress
        alert('You purchased a new dragon!');
    } else {
        alert("Not enough diamonds!");
    }
}

function startBattle() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("battle").style.display = "block";
    playerHealth = dragonStats[dragonType].health;
    opponentHealth = 1000;
    updateHealth();
    saveUserData(); // Save progress before starting battle
}

function checkRankUp() {
    if (wins >= 10 && wins < 20) {
        currentRank = "Stone";
    } else if (wins >= 20 && wins < 30) {
        currentRank = "Iron";
    } else if (wins >= 30 && wins < 40) {
        currentRank = "Gold";
    } else if (wins >= 40) {
        currentRank = "Diamond";
    }
    document.getElementById("rank").textContent = `Current Rank: ${currentRank}`;
    saveUserData(); // Save progress after ranking up
}

function backToLobby() {
    document.getElementById("battle").style.display = "none";
    document.getElementById("lobby").style.display = "block";
    saveUserData(); // Save progress after battle
}

// Clear input fields after sign-up or login
function clearAuthInputs() {
    document.getElementById("signup-username").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
}

// Save user data when the user leaves or refreshes the page
window.addEventListener("beforeunload", saveUserData);




function updateHealth() {
    document.getElementById('player-health').textContent = `Health: ${playerHealth}`;
    document.getElementById('opponent-health').textContent = `Health: ${opponentHealth}`;
}

//shdssssssssssssssssssssssssssjkaabhaykkkk





