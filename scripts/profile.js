// Копирование ссылки
function copyLink() {
    const link = 'https://svoykrug.ru/invite/12345';
    navigator.clipboard.writeText(link).then(() => {
        alert('✅ Ссылка скопирована!\n\nПоделитесь ей с друзьями и получайте бонусы!');
    }).catch(() => {
        alert('❌ Не удалось скопировать ссылку');
    });
}

// Показать QR-код
function showQrModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Закрыть QR-код
function closeQrModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Применить награду
function applyReward(rewardId) {
    const rewards = {
        1: { title: 'Скидка 15% на выставку "Цой"', qrData: 'https://svoykrug.ru/reward/1' },
        2: { title: 'Бесплатный десерт в "Море"', qrData: 'https://svoykrug.ru/reward/2' }
    };
    
    const reward = rewards[rewardId];
    if (reward) {
        showRewardQrModal(reward.title, reward.qrData);
    }
}

// Показать QR-код награды
function showRewardQrModal(title, qrData) {
    const existingModal = document.getElementById('rewardQrModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'rewardQrModal';
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-content">
            <div class="qr-modal-close" onclick="closeRewardQrModal()">✕</div>
            <div class="qr-code-container">
                <h4 style="margin-bottom: 16px;">${title}</h4>
                <div class="qr-code">
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="white"/>
                        <rect x="20" y="20" width="40" height="40" fill="black"/>
                        <rect x="80" y="20" width="40" height="40" fill="black"/>
                        <rect x="140" y="20" width="40" height="40" fill="black"/>
                        <rect x="20" y="80" width="40" height="40" fill="black"/>
                        <rect x="140" y="80" width="40" height="40" fill="black"/>
                        <rect x="20" y="140" width="40" height="40" fill="black"/>
                        <rect x="80" y="140" width="40" height="40" fill="black"/>
                        <rect x="140" y="140" width="40" height="40" fill="black"/>
                        <rect x="80" y="80" width="40" height="40" fill="white"/>
                    </svg>
                </div>
                <p class="qr-text">Покажите этот QR-код в заведении</p>
                <p class="qr-link">${qrData}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно награды
function closeRewardQrModal() {
    const modal = document.getElementById('rewardQrModal');
    if (modal) {
        modal.classList.remove('show');
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Открыть все достижения
function showAllAchievements() {
    window.location.href = 'achievements.html';
}

// Открыть настройки
function openSettings() {
    alert('⚙️ Настройки профиля в разработке');
}

// Переход на страницу челленджей
function goToChallenges() {
    window.location.href = 'challenges.html';
}

// Переход на страницу колеса удачи
function goToWheel() {
    window.location.href = 'wheel.html';
}

// Закрытие модального окна при клике вне его
document.addEventListener('click', (e) => {
    const modal = document.getElementById('qrModal');
    if (modal && modal.classList.contains('show')) {
        if (e.target === modal) {
            closeQrModal();
        }
    }
    
    const rewardModal = document.getElementById('rewardQrModal');
    if (rewardModal && rewardModal.classList.contains('show')) {
        if (e.target === rewardModal) {
            closeRewardQrModal();
        }
    }
});