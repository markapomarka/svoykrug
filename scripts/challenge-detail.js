// Данные челленджа
const challengeData = {
    id: 3,
    title: "Гастрономический тур",
    description: "Погрузись в гастрономическое путешествие по лучшим заведениям креативных кластеров города! Насладитесь уникальной атмосферой и вкуснейшими блюдами 5 необычных ресторанов и кафе. Открой новые вкусы и почувствуй себя настоящим гурманом!",
    endDate: new Date(2026, 4, 31, 23, 59, 59),
    totalTasks: 5,
    completedTasks: 0
};

// Обновление таймера
function updateCountdown() {
    const now = new Date();
    const diff = challengeData.endDate - now;
    
    if (diff <= 0) {
        document.getElementById('countdown').textContent = "Челлендж завершён";
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    let countdownText = '';
    if (days > 0) countdownText += `${days} дн. `;
    if (hours > 0 || days > 0) countdownText += `${hours} ч. `;
    countdownText += `${minutes} мин.`;
    
    document.getElementById('countdown').textContent = countdownText;
}

// Обновление прогресса
function updateProgress() {
    const progressPercent = (challengeData.completedTasks / challengeData.totalTasks) * 100;
    
    document.getElementById('progressTasks').textContent = `${challengeData.completedTasks}/${challengeData.totalTasks}`;
    document.getElementById('progressPercent').textContent = `${Math.round(progressPercent)}%`;
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
    }
}

// Загрузка сохраненного прогресса
function loadProgress() {
    const saved = localStorage.getItem(`challenge_${challengeData.id}_progress`);
    if (saved) {
        const progressData = JSON.parse(saved);
        challengeData.completedTasks = progressData.completedTasks;
        updateProgress();
    }
}

// Сохранение прогресса
function saveProgress() {
    const progressData = {
        completedTasks: challengeData.completedTasks
    };
    localStorage.setItem(`challenge_${challengeData.id}_progress`, JSON.stringify(progressData));
}

// Участие в челлендже
function participateInChallenge() {
    const hasParticipated = localStorage.getItem(`challenge_${challengeData.id}_participated`);
    
    if (hasParticipated) {
        alert(`✅ Вы уже участвуете в "${challengeData.title}"!\n\nПродолжайте выполнять задания и получайте награды!`);
    } else {
        localStorage.setItem(`challenge_${challengeData.id}_participated`, 'true');
        alert(`🎉 Вы успешно присоединились к "${challengeData.title}"!\n\nВыполняйте задания, сканируйте QR-коды и получайте награды!`);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    loadProgress();
    setInterval(updateCountdown, 60000);
});