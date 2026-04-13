// Данные о достижениях
const achievementsData = [
    {
        id: 1,
        title: "Первый шаг",
        description: "Завершение регистрации",
        isCompleted: true,
        icon: "stars"
    },
    {
        id: 2,
        title: "Социальная бабочка",
        description: "Приглашение 5 друзей в приложение",
        isCompleted: true,
        icon: "group"
    },
    {
        id: 3,
        title: "Исследователь",
        description: "Завершение челленджа \"Искатели красоты\"",
        isCompleted: true,
        icon: "emoji_events"
    },
    {
        id: 4,
        title: "Гурман",
        description: "Завершение челленджа \"Гастрономический тур\"",
        isCompleted: true,
        icon: "restaurant"
    },
    {
        id: 5,
        title: "Самый быстрый",
        description: "Завершение челленджа самым первым",
        isCompleted: false,
        icon: "bolt"
    },
    {
        id: 6,
        title: "Скрытый алмаз",
        description: "Выиграйте скидку в \"Колесе удачи\"",
        isCompleted: false,
        icon: "diamond"
    }
];

// Получение количества выполненных достижений
function getCompletedCount() {
    return achievementsData.filter(a => a.isCompleted).length;
}

// Обновление прогресса
function updateProgress() {
    const completedCount = getCompletedCount();
    const totalCount = achievementsData.length;
    const progressPercent = (completedCount / totalCount) * 100;
    
    document.getElementById('progressValue').textContent = `${completedCount}/${totalCount}`;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
}

// Загрузка сохраненных достижений
function loadAchievements() {
    const saved = localStorage.getItem('user_achievements');
    if (saved) {
        const savedAchievements = JSON.parse(saved);
        savedAchievements.forEach(saved => {
            const achievement = achievementsData.find(a => a.id === saved.id);
            if (achievement) {
                achievement.isCompleted = saved.isCompleted;
            }
        });
    }
    updateProgress();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadAchievements();
});