// Копирование ссылки
function copyLink() {
    const link = 'https://svoykrug.ru/invite/12345';
    navigator.clipboard.writeText(link).then(() => {
        alert('✅ Ссылка скопирована!\n\nПоделитесь ей с друзьями и получайте бонусы!');
        
        // Добавляем кристаллы за приглашение (если еще не начислялись сегодня)
        addInviteReward('link');
    }).catch(() => {
        alert('❌ Не удалось скопировать ссылку');
    });
}

// Показать QR-код для приглашения
function showQrModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Добавляем кристаллы за просмотр QR-кода (если еще не начислялись сегодня)
    addInviteReward('qr');
}

// Закрыть QR-код
function closeQrModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Добавление кристаллов за приглашение друзей
function addInviteReward(type) {
    // Проверяем, получал ли пользователь награду за приглашение сегодня
    const today = new Date().toDateString();
    const lastInviteReward = localStorage.getItem('last_invite_reward_date');
    const inviteRewardClaimed = localStorage.getItem('invite_reward_claimed') === 'true';
    
    // Если награда уже была получена сегодня, не начисляем повторно
    if (lastInviteReward === today && inviteRewardClaimed) {
        console.log('ℹ️ Награда за приглашение уже получена сегодня');
        return;
    }
    
    // Начисляем 300 кристаллов
    let currentCrystals = parseInt(localStorage.getItem('violet_crystals') || '0');
    currentCrystals += 300;
    localStorage.setItem('violet_crystals', currentCrystals);
    
    // Сохраняем дату получения награды
    localStorage.setItem('last_invite_reward_date', today);
    localStorage.setItem('invite_reward_claimed', 'true');
    
    // Обновляем отображение в интерфейсе
    updateVioletCrystals();
    
    // Показываем уведомление о получении кристаллов
    showInviteRewardNotification();
    
    console.log(`✅ Начислено 300 кристаллов за приглашение (${type})`);
}

// Показать уведомление о получении кристаллов
function showInviteRewardNotification() {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'crystal-reward-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="material-symbols-outlined">diamond</i>
            <div class="notification-text">
                <strong>+300 кристаллов!</strong>
                <span>За приглашение друга</span>
            </div>
        </div>
    `;
    
    // Добавляем стили для уведомления
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #9C27B0, #673AB7);
        color: white;
        padding: 12px 20px;
        border-radius: 50px;
        z-index: 2000;
        animation: slideUpFade 3s ease-in-out forwards;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        font-family: 'Sofia Sans', sans-serif;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const icon = notification.querySelector('i');
    icon.style.cssText = `
        font-size: 24px;
        animation: pulse 0.5s ease-in-out;
    `;
    
    const textDiv = notification.querySelector('.notification-text');
    textDiv.style.cssText = `
        display: flex;
        flex-direction: column;
    `;
    
    const strong = notification.querySelector('strong');
    strong.style.cssText = `
        font-size: 16px;
        font-weight: bold;
    `;
    
    const span = notification.querySelector('span');
    span.style.cssText = `
        font-size: 12px;
        opacity: 0.9;
    `;
    
    document.body.appendChild(notification);
    
    // Добавляем CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUpFade {
            0% {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            10% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            90% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
                display: none;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
        }
    `;
    
    if (!document.querySelector('#invite-notification-styles')) {
        style.id = 'invite-notification-styles';
        document.head.appendChild(style);
    }
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Загрузка и отображение наград
function loadRewards() {
    const rewardsList = document.getElementById('rewardsList');
    if (!rewardsList) return;
    
    // Базовые награды (челленджи)
    const baseRewards = [
        {
            id: 1,
            title: "Скидка 15% на выставку 'Цой'",
            date: "До 25.03.2026",
            tag: "Челлендж",
            icon: "local_offer",
            used: false,
            isNew: false
        },
        {
            id: 2,
            title: "Бесплатный десерт в 'Море'",
            date: "До 15.03.2026",
            tag: "Челлендж",
            icon: "restaurant",
            used: false,
            isNew: false
        },
        {
            id: 3,
            title: "Билет в кино",
            date: "До 11.03.2026",
            tag: "Челлендж",
            icon: "movie",
            used: true,
            isNew: false
        }
    ];
    
    // Награды из лотереи
    const lotteryRewards = JSON.parse(localStorage.getItem('user_rewards') || '[]');
    
    // Объединяем все награды
    let allRewards = [...baseRewards, ...lotteryRewards];
    
    // Сортируем: новые награды сверху
    allRewards.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
    });
    
    if (allRewards.length === 0) {
        rewardsList.innerHTML = '<div class="empty-rewards">У вас пока нет наград</div>';
        return;
    }
    
    rewardsList.innerHTML = allRewards.map(reward => `
        <div class="reward-card ${reward.used ? 'used' : ''} ${reward.isNew ? 'new-reward' : ''}">
            <div class="reward-info">
                <div class="reward-icon">
                    <i class="material-symbols-outlined">${reward.icon}</i>
                </div>
                <div class="reward-details">
                    <div class="reward-title">
                        ${reward.title}
                        ${reward.isNew ? '<span class="new-badge">Новое</span>' : ''}
                    </div>
                    <div class="reward-date">${reward.date}</div>
                    ${reward.tag ? `<div class="reward-tag">${reward.tag}</div>` : ''}
                </div>
            </div>
            <button class="reward-action-btn" onclick="applyReward(${reward.id})" ${reward.used ? 'disabled' : ''}>
                ${reward.used ? 'Использована' : 'Применить'}
            </button>
        </div>
    `).join('');
    
    // После отображения снимаем флаг "новое" с наград
    const updatedRewards = allRewards.map(reward => {
        if (reward.isNew) {
            reward.isNew = false;
        }
        return reward;
    });
    
    // Сохраняем обновленные награды (убираем флаг "новое")
    const rewardsToSave = updatedRewards.filter(r => r.id > 3);
    localStorage.setItem('user_rewards', JSON.stringify(rewardsToSave));
}

// Загрузка достижений с тэгом "Новое" (УЛУЧШЕННАЯ ВЕРСИЯ)
function loadAchievements() {
    // Проверяем флаг для достижения "Исследователь"
    const isNewResearcher = localStorage.getItem('new_achievement_researcher') === 'true';
    
    console.log('🔍 Проверка достижений:', {
        isNewResearcher: isNewResearcher,
        researcherFlag: localStorage.getItem('new_achievement_researcher')
    });
    
    if (!isNewResearcher) {
        console.log('❌ Флаг new_achievement_researcher не найден или false');
        return;
    }
    
    // Находим карточку достижения "Исследователь" по тексту
    let researcherCard = null;
    const allAchievementCards = document.querySelectorAll('.achievement-card, .achievement-item, [class*="achievement"]');
    
    console.log(`📋 Найдено элементов достижений: ${allAchievementCards.length}`);
    
    // Способ 1: Поиск по заголовку
    for (let card of allAchievementCards) {
        const titleElement = card.querySelector('.achievement-title, .title, h3, h4');
        if (titleElement && titleElement.textContent.includes('Исследователь')) {
            researcherCard = card;
            console.log('✅ Найдена карточка достижения "Исследователь" по заголовку');
            break;
        }
        // Проверяем текст самого элемента
        if (card.textContent.includes('Исследователь') && card !== document.body) {
            researcherCard = card;
            console.log('✅ Найдена карточка достижения "Исследователь" по тексту');
            break;
        }
    }
    
    // Способ 2: Если не нашли, ищем по позиции (3-я карточка)
    if (!researcherCard) {
        researcherCard = document.querySelector('.achievement-card:nth-child(3), .achievement-item:nth-child(3)');
        if (researcherCard) {
            console.log('⚠️ Найдена карточка по позиции (3-я)');
        }
    }
    
    if (researcherCard) {
        // Удаляем старый бейдж, если есть
        const oldBadge = researcherCard.querySelector('.achievement-new-badge');
        if (oldBadge) oldBadge.remove();
        
        // Убедимся, что карточка имеет relative позиционирование
        if (getComputedStyle(researcherCard).position === 'static') {
            researcherCard.style.position = 'relative';
        }
        
        // Создаем и добавляем новый бейдж
        const newBadge = document.createElement('span');
        newBadge.className = 'achievement-new-badge';
        newBadge.textContent = 'Новое';
        researcherCard.appendChild(newBadge);
        
        console.log('✨ Бейдж "Новое" добавлен к достижению "Исследователь"');
        
        // Удаляем флаг и бейдж после показа (через 5 секунд)
        setTimeout(() => {
            const badge = researcherCard.querySelector('.achievement-new-badge');
            if (badge) badge.remove();
            localStorage.removeItem('new_achievement_researcher');
            console.log('🗑️ Бейдж удален, флаг очищен');
        }, 5000);
    } else {
        console.log('❌ Карточка достижения "Исследователь" не найдена');
        
        // Выводим все заголовки достижений для отладки
        const titles = [];
        for (let card of allAchievementCards) {
            const titleElement = card.querySelector('.achievement-title, .title, h3, h4');
            if (titleElement) {
                titles.push(titleElement.textContent);
            } else if (card.textContent && card.textContent.length < 100) {
                titles.push(card.textContent.substring(0, 50));
            }
        }
        console.log('📝 Доступные достижения:', titles);
        
        // Пробуем еще раз через 1 секунду (если DOM еще не полностью загружен)
        setTimeout(() => {
            const retryCard = document.querySelector('.achievement-card:nth-child(3), .achievement-item:nth-child(3)');
            if (retryCard && !retryCard.querySelector('.achievement-new-badge')) {
                console.log('🔄 Повторная попытка добавления бейджа');
                if (getComputedStyle(retryCard).position === 'static') {
                    retryCard.style.position = 'relative';
                }
                const badge = document.createElement('span');
                badge.className = 'achievement-new-badge';
                badge.textContent = 'Новое';
                retryCard.appendChild(badge);
                
                setTimeout(() => {
                    const b = retryCard.querySelector('.achievement-new-badge');
                    if (b) b.remove();
                    localStorage.removeItem('new_achievement_researcher');
                }, 5000);
            }
        }, 1000);
    }
}

// Применить награду
function applyReward(rewardId) {
    // Сначала проверяем награды из лотереи
    const lotteryRewards = JSON.parse(localStorage.getItem('user_rewards') || '[]');
    const lotteryReward = lotteryRewards.find(r => r.id === rewardId);
    
    if (lotteryReward) {
        showRewardQrModal(lotteryReward.title, `https://svoykrug.ru/reward/${rewardId}`);
        return;
    }
    
    // Базовые награды
    const rewards = {
        1: { title: 'Скидка 15% на выставку "Цой"', qrData: 'https://svoykrug.ru/reward/1' },
        2: { title: 'Бесплатный десерт в "Море"', qrData: 'https://svoykrug.ru/reward/2' },
        3: { title: 'Билет в кино', qrData: 'https://svoykrug.ru/reward/3' }
    };
    
    const reward = rewards[rewardId];
    if (reward) {
        showRewardQrModal(reward.title, reward.qrData);
        
        // Отмечаем награду как использованную
        if (rewardId <= 3) {
            // Для базовых наград обновляем статус
            const baseRewards = JSON.parse(localStorage.getItem('base_rewards_used') || '[]');
            if (!baseRewards.includes(rewardId)) {
                baseRewards.push(rewardId);
                localStorage.setItem('base_rewards_used', JSON.stringify(baseRewards));
            }
        } else {
            // Для наград из лотереи
            const updatedRewards = lotteryRewards.map(r => {
                if (r.id === rewardId) {
                    r.used = true;
                }
                return r;
            });
            localStorage.setItem('user_rewards', JSON.stringify(updatedRewards));
        }
        
        // Обновляем отображение
        loadRewards();
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

// Обновление отображения фиолетовых кристаллов (прогресс уровня)
function updateVioletCrystals() {
    const violetBalance = parseInt(localStorage.getItem('violet_crystals') || '0');
    const progressElement = document.querySelector('.level-progress-header span:last-child');
    if (progressElement) {
        const currentTotal = 1200;
        const currentProgress = violetBalance + 500;
        progressElement.innerHTML = `${currentProgress} / ${currentTotal} <span class="crystal-small-img"></span>`;
        
        // Обновляем ширину прогресс-бара
        const percent = (currentProgress / currentTotal) * 100;
        const progressFill = document.querySelector('.level-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${Math.min(percent, 100)}%`;
        }
    }
    
    // Обновляем отображение количества кристаллов в других местах (если есть)
    const crystalBalances = document.querySelectorAll('.crystal-balance, .violet-crystals-count');
    crystalBalances.forEach(el => {
        el.textContent = violetBalance;
    });
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

// Обновление баланса фиолетовых кристаллов (вызывается из wheel.js)
window.updateVioletBalance = function(amount) {
    let current = parseInt(localStorage.getItem('violet_crystals') || '0');
    current += amount;
    localStorage.setItem('violet_crystals', current);
    updateVioletCrystals();
};

// Сброс награды за приглашение (для тестирования - можно удалить в продакшене)
window.resetInviteReward = function() {
    localStorage.removeItem('last_invite_reward_date');
    localStorage.removeItem('invite_reward_claimed');
    console.log('🔄 Награда за приглашение сброшена');
    alert('Награда за приглашение сброшена. При следующем копировании ссылки вы получите +300 кристаллов');
};

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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadRewards();
    updateVioletCrystals();
    loadAchievements();
});