const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Список предметов в кейсе (АК-47 разных видов)
const caseItems = [
    { id: 1, name: "АК-47 | Обычный", rarity: "common", chance: 60, color: "#b0c3d9" },
    { id: 2, name: "АК-47 | Военный камуфляж", rarity: "uncommon", chance: 25, color: "#5e98d9" },
    { id: 3, name: "АК-47 | Неоновый кибер", rarity: "rare", chance: 10, color: "#d32ce6" },
    { id: 4, name: "АК-47 | Золотой дракон", rarity: "legendary", chance: 5, color: "#eb4b4b" }
];

// Эндпоинт для открытия кейса
app.post('/api/open-case', (req, res) => {
    const totalChance = caseItems.reduce((sum, item) => sum + item.chance, 0);
    let randomNum = Math.random() * totalChance;

    let selectedItem = caseItems[0];
    for (const item of caseItems) {
        if (randomNum < item.chance) {
            selectedItem = item;
            break;
        }
        randomNum -= item.chance;
    }

    res.json({ success: true, item: selectedItem });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
