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

// Временный вход по кнопке для теста на планшете
document.getElementById('telegramLoginBtn').addEventListener('click', (e) => {
    e.preventDefault();
    // Создаем тестового игрока прямо на планшете, чтобы сразу открыть кейс
    currentUser = {
        id: 1,
        username: "Xiaomi Player",
        balance: 1000
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    checkAuth();
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

    // Имитируем открытие кейса локально или через сервер
    setTimeout(() => {
        const wonItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];
        currentUser.balance -= 100;
        if (wonItem.includes('Редкий')) currentUser.balance += 150;
        else if (wonItem.includes('Закаленный')) currentUser.balance += 300;
        else if (wonItem.includes('Азимов')) currentUser.balance += 1000;
        else currentUser.balance += 50;

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        userBalance.innerText = currentUser.balance;

        createStrip(wonItem);

        setTimeout(() => {
            openBtn.disabled = false;
        }, 4100);
    }, 100);
});
