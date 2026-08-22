const openBtn = document.getElementById('openCaseBtn');
const strip = document.getElementById('rouletteStrip');

// Список возможных предметов для генерации ленты визуально
const itemsPool = [
    "АК-47 | Обычный",
    "АК-47 | Редкий",
    "АК-47 | Закаленный",
    "АК-47 | Военный",
    "АК-47 | Азимов"
];

// Функция заполнения ленты случайными элементами
function createStrip(winningItem) {
    strip.innerHTML = '';
    // Создаем длинную ленту из 60 предметов, где ближе к концу будет выигрышный элемент
    const totalItems = 60;
    const winningIndex = 52; // Индекс, на котором остановится рулетка

    for (let i = 0; i < totalItems; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'roulette-item';
        
        // На нужную позицию ставим то, что реально выиграл игрок с сервера
        let itemName = (i === winningIndex) ? winningItem : itemsPool[Math.floor(Math.random() * itemsPool.length)];
        itemDiv.innerText = itemName;
        
        strip.appendChild(itemDiv);
    }

    // Сбрасываем позицию ленты без анимации на старт
    strip.style.transition = 'none';
    strip.style.transform = 'translateX(0px)';

    // Небольшая задержка перед запуском красивой анимации прокрутки
    setTimeout(() => {
        const itemWidth = 120; // ширина карточки (110px + отступы по 5px с каждой стороны)
        // Смещаем ленту так, чтобы победный элемент встал ровно по центру красной линии
        const containerWidth = document.querySelector('.roulette-container').offsetWidth;
        const targetOffset = (winningIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
        
        // Добавляем случайное смещение внутри карточки для реалистичности
        const randomShift = (Math.random() * 60) - 30; 
        const finalPosition = -(targetOffset + randomShift);

        strip.style.transition = 'transform 4s cubic-bezier(0.08, 0.82, 0.12, 1)';
        strip.style.transform = `translateX(${finalPosition}px)`;
    }, 50);
}

openBtn.addEventListener('click', async () => {
    openBtn.disabled = true;

    try {
        // Запрос к серверу за результатом
        const response = await fetch('/open-case');
        const data = await response.json();

        // Запускаем красивую прокрутку рулетки
        createStrip(data.item);

        // Разблокируем кнопку после окончания анимации (через 4 секунды)
        setTimeout(() => {
            openBtn.disabled = false;
        }, 4100);

    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось открыть кейс');
        openBtn.disabled = false;
    }
});
