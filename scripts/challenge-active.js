// Данные о заданиях
const tasksData = [
    { id: 1, name: 'Ресторан "Мечта"', address: 'Морская набережная, дом 1' },
    { id: 2, name: 'Ресторан "Италия"', address: 'Морская набережная, дом 15' },
    { id: 3, name: 'Ресторан "Delicious"', address: 'Суворовский проспект, дом 20' },
    { id: 4, name: 'Ресторан "EatInOut"', address: 'улица Печатников, дом 14' },
    { id: 5, name: 'Ресторан "Зеркало Вкуса"', address: 'улица Восстания, дом 30' }
];

// Данные челленджа
const challengeData = {
    id: 3,
    title: "Гастрономический тур",
    totalTasks: 5,
    completedTasks: 0
};

// Таймер на 20 дней 6 часов 15 минут
let timeRemaining = {
    days: 20,
    hours: 6,
    minutes: 15
};

// Обновление таймера
function updateCountdown() {
    if (timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0) {
        document.getElementById('countdown').textContent = "Челлендж завершён";
        return;
    }
    
    let countdownText = '';
    if (timeRemaining.days > 0) countdownText += `${timeRemaining.days} дн. `;
    if (timeRemaining.hours > 0 || timeRemaining.days > 0) countdownText += `${timeRemaining.hours} ч. `;
    countdownText += `${timeRemaining.minutes} мин.`;
    
    document.getElementById('countdown').textContent = countdownText;
    
    // Уменьшаем время
    if (timeRemaining.minutes > 0) {
        timeRemaining.minutes--;
    } else {
        timeRemaining.minutes = 59;
        if (timeRemaining.hours > 0) {
            timeRemaining.hours--;
        } else {
            timeRemaining.hours = 23;
            if (timeRemaining.days > 0) {
                timeRemaining.days--;
            }
        }
    }
}

// Получение статуса выполнения заданий
function getCompletedTasks() {
    let completed = [];
    for (let i = 1; i <= 5; i++) {
        if (localStorage.getItem(`task_${i}_completed`) === 'true') {
            completed.push(i);
        }
    }
    return completed;
}

// Обновление прогресса
function updateProgress() {
    const completedTasks = getCompletedTasks();
    challengeData.completedTasks = completedTasks.length;
    
    const progressPercent = (challengeData.completedTasks / challengeData.totalTasks) * 100;
    
    const progressTasks = document.getElementById('progressTasks');
    const progressPercentEl = document.getElementById('progressPercent');
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressTasks) progressTasks.textContent = `${challengeData.completedTasks}/${challengeData.totalTasks}`;
    if (progressPercentEl) progressPercentEl.textContent = `${Math.round(progressPercent)}%`;
    if (progressFill) progressFill.style.width = `${progressPercent}%`;
    
    // Сохраняем прогресс для отображения в "Моих челленджах"
    const challengeProgress = {
        completedTasks: challengeData.completedTasks,
        totalTasks: challengeData.totalTasks
    };
    localStorage.setItem('gastro_challenge_progress', JSON.stringify(challengeProgress));
    localStorage.setItem('challenge_3_progress', JSON.stringify(challengeProgress));
    
    // Если все задания выполнены - отмечаем челлендж завершенным
    if (challengeData.completedTasks === challengeData.totalTasks) {
        localStorage.setItem('gastro_challenge_completed', 'true');
    }
}

// Отображение списка заданий
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const completedTasks = getCompletedTasks();
    
    if (!tasksList) return;
    
    tasksList.innerHTML = tasksData.map(task => {
        const isCompleted = completedTasks.includes(task.id);
        const completedClass = isCompleted ? 'completed' : '';
        const completedBadge = isCompleted ? '<span class="completed-badge">✓ Выполнено</span>' : '';
        
        return `
            <div class="task-item ${completedClass}" onclick="showTaskDetail(${task.id})">
                <div class="task-info-full">
                    <div class="task-name">
                        ${task.name}
                        ${completedBadge}
                    </div>
                    <div class="task-address">Адрес: ${task.address}</div>
                </div>
                <div class="task-download-btn">
                    <i class="material-symbols-outlined">chevron_right</i>
                </div>
            </div>
        `;
    }).join('');
}

// Показ деталей задания
function showTaskDetail(taskId) {
    window.location.href = `task-scan.html?id=${taskId}`;
}

// Загрузка сохраненного прогресса
function loadProgress() {
    // Сначала проверяем сохраненный прогресс Гастрономического тура
    const savedGastro = localStorage.getItem('gastro_challenge_progress');
    if (savedGastro) {
        const progressData = JSON.parse(savedGastro);
        challengeData.completedTasks = progressData.completedTasks;
        
        // Синхронизируем с task_* ключами
        for (let i = 1; i <= 5; i++) {
            if (i <= challengeData.completedTasks) {
                if (localStorage.getItem(`task_${i}_completed`) !== 'true') {
                    localStorage.setItem(`task_${i}_completed`, 'true');
                }
            }
        }
    } else {
        // Проверяем отдельные задания
        const saved = localStorage.getItem(`challenge_${challengeData.id}_progress`);
        if (saved) {
            const progressData = JSON.parse(saved);
            challengeData.completedTasks = progressData.completedTasks;
        }
    }
    
    updateProgress();
    renderTasks();
}


function checkParticipation() {
    const hasJoined = localStorage.getItem('gastro_challenge_joined') === 'true';
    const hasProgress = localStorage.getItem('gastro_challenge_progress') !== null;
    const hasCompletedTasks = localStorage.getItem('task_1_completed') === 'true' || 
                              localStorage.getItem('task_2_completed') === 'true' || 
                              localStorage.getItem('task_3_completed') === 'true' || 
                              localStorage.getItem('task_4_completed') === 'true' || 
                              localStorage.getItem('task_5_completed') === 'true';
    
    
    if (!hasJoined && !hasProgress && !hasCompletedTasks) {
        window.location.href = 'challenge-detail.html';
        return false;
    }
    
    
    if ((hasProgress || hasCompletedTasks) && !hasJoined) {
        localStorage.setItem('gastro_challenge_joined', 'true');
    }
    
    return true;
}

// Обновление при возврате на страницу
function handlePageShow() {
    loadProgress();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const isParticipating = checkParticipation();
    if (isParticipating) {
        updateCountdown();
        loadProgress();
        setInterval(updateCountdown, 60000);
    }
    
    // Обновляем список заданий при возврате на страницу
    window.addEventListener('pageshow', handlePageShow);
});

// Слушаем изменения в localStorage (для обновления при возврате со страницы сканирования)
window.addEventListener('storage', (e) => {
    if (e.key && (e.key.includes('task_') || e.key === 'gastro_challenge_progress')) {
        loadProgress();
    }
});