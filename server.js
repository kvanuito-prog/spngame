const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Подключение базы данных
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('Ошибка БД:', err.message);
    else console.log('База данных подключена.');
});

// Создаем таблицу пользователей с полями: id, псевдоним, пароль, почта
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT
)`);

// Регистрация с мгновенным входом
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Заполните все поля' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [username, hashedPassword, email], function(err) {
            if (err) {
                return res.status(400).json({ error: 'Такой псевдоним или почта уже заняты' });
            }
            // Сразу возвращаем успех и данные пользователя для автоматического входа
            res.json({ 
                success: true, 
                userId: this.lastID, 
                username: username, 
                email: email 
            });
        });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
