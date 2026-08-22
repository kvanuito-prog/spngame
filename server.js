const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Маршрут для открытия кейса
app.get('/open-case', (req, res) => {
    const items = [
        "АК-47 | Обычный",
        "АК-47 | Редкий",
        "АК-47 | Закаленный",
        "АК-47 | Военный",
        "АК-47 | Азимов"
    ];
    
    // Выбираем случайный предмет
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    res.json({ item: randomItem });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
