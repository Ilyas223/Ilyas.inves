import random
import time
from threading import Thread

class Game:
    def __init__(self):
        self.money = 500000  # Uang awal pemain dalam game
        self.items = {
            "Alkha Mulet": {"rarity": "biasa", "chance": 60},
            "Fadli Salto": {"rarity": "rare", "chance": 25},
            "Si Jomok": {"rarity": "epick", "chance": 1},
            "Padlikin": {"rarity": "legendaris", "chance": 0.001}
        }
        self.bbitcoin_price = 100000  # Harga awal BBITCOIN
        self.investments = []  # Daftar investasi pemain dalam BBITCOIN
        self.price_fluctuation()

    def gacha(self):
        if self.money < 50000:
            print("Uang tidak cukup untuk gacha.")
            return
        self.money -= 50000
        chance = random.randint(1, 100)
        cumulative_chance = 0
        for item, info in self.items.items():
            cumulative_chance += info["chance"]
            if chance <= cumulative_chance:
                print(f"Kamu mendapatkan: {item}")
                return item
        print("Tidak ada item yang diperoleh.")
        return None

    def invest_in_bbitcoin(self, amount):
        if self.money < amount:
            print("Uang tidak cukup untuk investasi.")
            return
        coins_bought = amount / self.bbitcoin_price
        self.money -= amount
        self.investments.append({"coins": coins_bought, "buy_price": self.bbitcoin_price})
        print(f"Investasi BBITCOIN berhasil, jumlah koin: {coins_bought:.2f}")

    def check_investments(self):
        for investment in self.investments:
            profit = (self.bbitcoin_price - investment["buy_price"]) * investment["coins"]
            print(f"Investasi awal: {investment['buy_price']} | Harga saat ini: {self.bbitcoin_price} | Profit: {profit:.2f}")

    def sell_investment(self):
        if not self.investments:
            print("Tidak ada investasi untuk dijual.")
            return
        total_profit = 0
        for investment in self.investments:
            profit = (self.bbitcoin_price - investment["buy_price"]) * investment["coins"]
            total_profit += profit
        self.money += total_profit
        self.investments = []  # Reset setelah penjualan semua koin
        print(f"Investasi terjual dengan profit: {total_profit:.2f}. Uang saat ini: {self.money}")

    def price_fluctuation(self):
        def fluctuate():
            while True:
                if random.random() < 0.8:
                    # Naik 0.1% setiap 5 detik
                    self.bbitcoin_price *= 1.001
                elif random.random() < 0.1:
                    # Jika sudah naik 5%, turunkan acak antara 0-3%
                    if self.bbitcoin_price >= 105000:
                        self.bbitcoin_price *= 0.97
                elif self.bbitcoin_price >= 120000:
                    # Jika sudah naik 20%, turunkan 10%
                    self.bbitcoin_price *= 0.9
                time.sleep(5)

        fluctuation_thread = Thread(target=fluctuate, daemon=True)
        fluctuation_thread.start()

# Pemakaian game
game = Game()

# Menjalankan Gacha
for _ in range(5):  # Coba 5 kali gacha
    game.gacha()

# Melakukan Investasi BBITCOIN
game.invest_in_bbitcoin(100000)  # Invest 100 ribu ke BBITCOIN
time.sleep(10)  # Tunggu beberapa detik untuk melihat perubahan harga
game.check_investments()

# Menjual Investasi
game.sell_investment()
