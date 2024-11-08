let money = 500000;
let bbitcoinPrice = 100000;
let investments = [];
const items = {
    "Alkha Mulet": { rarity: "biasa", chance: 60 },
    "Fadli Salto": { rarity: "rare", chance: 25 },
    "Si Jomok": { rarity: "epick", chance: 1 },
    "Padlikin": { rarity: "legendaris", chance: 0.001 }
};

// Update displayed information
function updateGameInfo() {
    document.getElementById("money").innerText = `Uang: ${money}`;
    document.getElementById("bbt-price").innerText = `Harga BBITCOIN: ${bbitcoinPrice.toFixed(2)}`;
}

// Gacha function
function gacha() {
    if (money < 50000) {
        alert("Uang tidak cukup untuk gacha.");
        return;
    }
    money -= 50000;
    let chance = Math.random() * 100;
    let cumulativeChance = 0;
    for (let item in items) {
        cumulativeChance += items[item].chance;
        if (chance <= cumulativeChance) {
            document.getElementById("result").innerText = `Kamu mendapatkan: ${item}`;
            updateGameInfo();
            return;
        }
    }
    document.getElementById("result").innerText = "Tidak ada item yang diperoleh.";
    updateGameInfo();
}

// Invest in BBITCOIN
function investInBBITCOIN() {
    let amount = 100000; // Contoh nilai investasi 100 ribu
    if (money < amount) {
        alert("Uang tidak cukup untuk investasi.");
        return;
    }
    let coinsBought = amount / bbitcoinPrice;
    money -= amount;
    investments.push({ coins: coinsBought, buyPrice: bbitcoinPrice });
    document.getElementById("result").innerText = `Investasi BBITCOIN berhasil, jumlah koin: ${coinsBought.toFixed(2)}`;
    updateGameInfo();
}

// Sell Investment
function sellInvestment() {
    if (investments.length === 0) {
        alert("Tidak ada investasi untuk dijual.");
        return;
    }
    let totalProfit = 0;
    investments.forEach(investment => {
        let profit = (bbitcoinPrice - investment.buyPrice) * investment.coins;
        totalProfit += profit;
    });
    money += totalProfit;
    investments = [];
    document.getElementById("result").innerText = `Investasi terjual dengan profit: ${totalProfit.toFixed(2)}`;
    updateGameInfo();
}

// BBITCOIN Price Fluctuation
function priceFluctuation() {
    setInterval(() => {
        if (Math.random() < 0.8) {
            bbitcoinPrice *= 1.001; // Increase by 0.1%
        } else if (Math.random() < 0.1 && bbitcoinPrice >= 105000) {
            bbitcoinPrice *= 0.97; // Random decrease when above 105000
        } else if (bbitcoinPrice >= 120000) {
            bbitcoinPrice *= 0.9; // Decrease 10% if above 120000
        }
        updateGameInfo();
    }, 5000);
}

// Start price fluctuation
priceFluctuation();
updateGameInfo();
