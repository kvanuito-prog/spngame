const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// База данных
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('Ошибка базы данных:', err.message);
    else console.log('Подключено к базе данных SQLite.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id TEXT UNIQUE,
    username TEXT,
    balance INTEGER DEFAULT 1000
)`);

// Авторизация через Telegram
app.post('/api/telegram-auth', (req, res) => {
    const tgData = req.body;
    const checkHash = tgData.hash;
    delete tgData.hash;

    // Проверка подлинности данных от Telegram
    const dataCheckArr = Object.keys(tgData)
        .sort()
        .map(key => `${key}=${tgData[key]}`);
    
    const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckArr.join('\n')).digest('hex');

    if (hmac !== checkHash) {
        return res.status(400).json({ error: 'Ошибка безопасности: данные не подтверждены Telegram' });
    }

    const telegramId = String(tgData.id);
    const username = tgData.username || tgData.first_name || 'Игрок';

    // Ищем или создаем пользователя в БД
    db.get(`SELECT * FROM users WHERE telegram_id = ?`, [telegramId], (err, user) => {
        if (user) {
            res.json({ success: true, userId: user.id, username: user.username, balance: user.balance });
        } else {
            db.run(`INSERT INTO users (telegram_id, username, balance) VALUES (?, ?, 1000)`, [telegramId, username], function(err) {
                if (err) return res.status(500).json({ error: 'Ошибка создания аккаунта' });
                res.json({ success: true, userId: this.lastID, username, balance: 1000 });
            });
        }
    });
});

// Открытие кейса
app.post('/api/open-case', (req, res) => {
    const { userId } = req.body;
    const casePrice = 100;

    db.get(`SELECT balance FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'Пользователь не найден' });
        if (user.balance < casePrice) return res.status(400).json({ error: 'Недостаточно монет' });

        const items = [
            { name: "АК-47 | Обычный", price: 50 },
            { name: "АК-47 | Редкий", price: 150 },
            { name: "АК-47 | Закаленный", price: 300 },
            { name: "АК-47 | Азимов", price: 1000 }
        ];
        const wonItem = items[Math.floor(Math.random() * items.length)];
        const newBalance = user.balance - casePrice + wonItem.price;

        db.run(`UPDATE users SET balance = ? WHERE id = ?`, [newBalance, userId], () => {
            res.json({ item: wonItem.name, newBalance });
        });
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
