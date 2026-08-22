let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const authContainer = document.getElementById('authContainer');
const profileContainer = document.getElementById('profileContainer');
const displayUsername = document.getElementById('displayUsername');
const displayEmail = document.getElementById('displayEmail');
const errorMsg = document.getElementById('errorMsg');

function updateInterface() {
    if (currentUser) {
        authContainer.style.display = 'none';
        profileContainer.style.display = 'block';
        displayUsername.innerText = currentUser.username;
        displayEmail.innerText = currentUser.email;
    } else {
        authContainer.style.display = 'block';
        profileContainer.style.display = 'none';
    }
}

updateInterface();

// Кнопка регистрации
document.getElementById('registerBtn').addEventListener('click', async () => {
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    errorMsg.innerText = '';

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        const data = await response.json();

        if (data.success) {
            currentUser = { username: data.username, email: data.email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateInterface();
        } else {
            errorMsg.innerText = data.error || 'Ошибка регистрации';
        }
    } catch (e) {
        errorMsg.innerText = 'Ошибка соединения с сервером';
    }
});

// Кнопка выхода из аккаунта
document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateInterface();
});
