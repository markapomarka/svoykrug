// Данные о ресторанах
const restaurantsData = {
    1: {
        name: 'Ресторан "Мечта"',
        address: 'Морская набережная, дом 1',
        cuisine: 'Кухня: Русская',
        description: 'Мечта — это ресторан в креативном пространстве Севкабель Порт, где традиционные русские вкусы гармонично сочетаются с современным дизайном интерьера и атмосферой творческого вдохновения. Идеальное место для тех, кто ценит качественный отдых и желает окунуться в особую эстетику северной столицы.',
        completed: false
    },
    2: {
        name: 'Ресторан "Италия"',
        address: 'Морская набережная, дом 15',
        cuisine: 'Кухня: Итальянская',
        description: 'Италия — это аутентичный итальянский ресторан с домашней пастой, пиццей из дровяной печи и лучшими итальянскими винами. Уютная атмосфера и приветливый персонал создают ощущение настоящего итальянского гостеприимства.',
        completed: false
    },
    3: {
        name: 'Ресторан "Delicious"',
        address: 'Суворовский проспект, дом 20',
        cuisine: 'Кухня: Европейская',
        description: 'Delicious — это современный ресторан с авторской кухней от шеф-повара. Здесь вы найдете блюда из свежих локальных продуктов, уникальные сочетания вкусов и изысканную подачу.',
        completed: false
    },
    4: {
        name: 'Ресторан "EatInOut"',
        address: 'улица Печатников, дом 14',
        cuisine: 'Кухня: Фьюжн',
        description: 'EatInOut — это пространство, где встречаются кулинарные традиции разных стран. Уникальное меню, живая музыка и атмосфера творчества ждут вас каждый вечер.',
        completed: false
    },
    5: {
        name: 'Ресторан "Зеркало Вкуса"',
        address: 'улица Восстания, дом 30',
        cuisine: 'Кухня: Французская',
        description: 'Зеркало Вкуса — это ресторан высокой французской кухни. Изысканные блюда, элегантный интерьер и безупречный сервис делают это место идеальным для особых случаев.',
        completed: false
    }
};

// Получаем ID задания из URL
const urlParams = new URLSearchParams(window.location.search);
const taskId = parseInt(urlParams.get('id')) || 1;

// Загрузка данных о ресторане
function loadRestaurantData() {
    const restaurant = restaurantsData[taskId];
    if (restaurant) {
        document.getElementById('restaurantName').textContent = restaurant.name;
        document.getElementById('restaurantAddress').textContent = restaurant.address;
        document.getElementById('restaurantCuisine').textContent = restaurant.cuisine;
        document.getElementById('restaurantDescription').textContent = restaurant.description;
        
        // Проверяем, не выполнено ли уже задание
        if (localStorage.getItem(`task_${taskId}_completed`) === 'true') {
            showCompletedBlock();
        }
    }
}

// Показ блока успешного выполнения
function showCompletedBlock() {
    const mainContent = document.getElementById('mainContent');
    const completedBlock = document.createElement('div');
    completedBlock.className = 'completed-block';
    completedBlock.innerHTML = `
        <div class="success-icon">✅</div>
        <h4>Задание успешно выполнено!</h4>
        <p>Вернитесь во вкладку "Мои задания", чтобы продолжить свое приключение.</p>
    `;
    mainContent.appendChild(completedBlock);
    
    // Скрываем секцию сканера
    const scannerSection = document.querySelector('.scanner-section');
    if (scannerSection) {
        scannerSection.style.display = 'none';
    }
}

// Начать сканирование
function startScanning() {
    const scannerPreview = document.getElementById('scannerPreview');
    scannerPreview.classList.add('active');
    
    // Показываем модальное окно загрузки
    const loadingModal = document.getElementById('loadingModal');
    loadingModal.classList.add('show');
    
    // Имитация сканирования через 2 секунды
    setTimeout(() => {
        loadingModal.classList.remove('show');
        showSuccessModal();
    }, 2000);
}

// Показать модальное окно успеха
function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.classList.add('show');
}

// Закрыть модальное окно успеха
function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('show');
    
    // Сохраняем статус выполнения
    localStorage.setItem(`task_${taskId}_completed`, 'true');
    restaurantsData[taskId].completed = true;
    
    // Обновляем прогресс в localStorage для основного челленджа
    updateChallengeProgress();
    
    // Показываем блок успешного выполнения
    showCompletedBlock();
    
    // Скрываем секцию сканера
    const scannerSection = document.querySelector('.scanner-section');
    if (scannerSection) {
        scannerSection.style.display = 'none';
    }
}

// Загрузка фото
function uploadPhoto() {
    // Создаем скрытый input для загрузки файла
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Показываем загрузку
            const loadingModal = document.getElementById('loadingModal');
            loadingModal.classList.add('show');
            
            setTimeout(() => {
                loadingModal.classList.remove('show');
                showSuccessModal();
            }, 1500);
        }
    };
    input.click();
}

// Обновление прогресса челленджа
function updateChallengeProgress() {
    let completedCount = 0;
    for (let i = 1; i <= 5; i++) {
        if (localStorage.getItem(`task_${i}_completed`) === 'true') {
            completedCount++;
        }
    }
    
    // Сохраняем прогресс для challenge-active.html
    const challengeProgress = {
        completedTasks: completedCount,
        totalTasks: 5
    };
    localStorage.setItem('challenge_3_progress', JSON.stringify(challengeProgress));
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurantData();
});