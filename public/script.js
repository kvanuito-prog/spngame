let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const authModal = document.getElementById('authModal');
const gameContainer = document.getElementById('gameContainer');
const userNameDisplay = document.getElementById('userNameDisplay');
const userBalance = document.getElementById('userBalance');

const openBtn = document.getElementById('openCaseBtn');
const strip = document.getElementById('rouletteStrip');

function checkAuth() {
    if (currentUser) {
        authModal.style.display = 'none';
        gameContainer.style.display = 'block';
        userNameDisplay.innerText = currentUser.username;
        userBalance.innerText = currentUser.balance;
    } else {
        authModal.style.display = 'flex';
        gameContainer.style.display = 'none';
    }
}
checkAuth();

// Функция, которую вызовет Telegram после успешного входа
window.onTelegramAuth = async function(user) {
    const res = await fetch('/api/telegram-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    const data = await res.json();

    if (data.success) {
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        checkAuth();
    } else {
        document.getElementById('authError').innerText = data.error;
    }
};

// Динамически внедряем официальную кнопку Telegram
// ВНИМАНИЕ: Замените data-telegram-login на имя вашего бота (без слова bot, точнее полный username вашего бота от BotFather)
window.addEventListener('DOMContentLoaded', () => {
    if (!currentUser) {
        const container = document.getElementById('telegramLoginContainer');
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute('data-telegram-login', 'ЗДЕСЬ_УКАЖИТЕ_USERNAME_ВАШЕГО_БОТА'); // Например: spngame_auth_bot
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        container.appendChild(script);
    }
});

// Анимация рулетки и открытие кейса
const itemsPool = ["АК-47 | Обычный", "АК-47 | Редкий", "АК-47 | Закаленный", "АК-47 | Азимов"];

function createStrip(winningItem) {
    strip.innerHTML = '';
    const totalItems = 60;
    const winningIndex = 52;

    for (let i = 0; i < totalItems; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'roulette-item';
        let itemName = (i === winningIndex) ? winningItem : itemsPool[Math.floor(Math.random() * itemsPool.length)];
        itemDiv.innerText = itemName;
        strip.appendChild(itemDiv);
    }

    strip.style.transition = 'none';
    strip.style.transform = 'translateX(0px)';

    setTimeout(() => {
        const itemWidth = 120;
        const containerWidth = document.querySelector('.roulette-container').offsetWidth;
        const targetOffset = (winningIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
        const randomShift = (Math.random() * 60) - 30; 
        const finalPosition = -(targetOffset + randomShift);

        strip.style.transition = 'transform 4s cubic-bezier(0.08, 0.82, 0.12, 1)';
        strip.style.transform = `translateX(${finalPosition}px)`;
    }, 50);
}

openBtn.addEventListener('click', async () => {
    if (currentUser.balance < 100) {
        alert('Недостаточно монет!');
        return;
    }

    openBtn.disabled = true;

    try {
        const response = await fetch('/api/open-case', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser.id })
        });
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            openBtn.disabled = false;
            return;
        }

        currentUser.balance = data.newBalance;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        userBalance.innerText = currentUser.balance;

        createStrip(data.item);

        setTimeout(() => {
            openBtn.disabled = false;
        }, 4100);

    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось открыть кейс');
        openBtn.disabled = false;
    }
});
