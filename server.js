const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Инициализация базы данных SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('Ошибка базы данных:', err.message);
    else console.log('Подключено к базе данных SQLite.');
});

// Создание таблиц пользователей
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    balance INTEGER DEFAULT 1000
)`);

// Регистрация
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Заполните все поля' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) return res.status(400).json({ error: 'Имя пользователя уже занято' });
            res.json({ success: true, userId: this.lastID, username, balance: 1000 });
        });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Вход
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'Неверный логин или пароль' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ error: 'Неверный логин или пароль' });

        res.json({ success: true, userId: user.id, username: user.username, balance: user.balance });
    });
});

// Открытие кейса (списание 100 монет и выдача приза)
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
