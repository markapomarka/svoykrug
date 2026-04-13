// Данные челленджей
let challengesData = {
    all_challenges: [],
    my_challenges: []
};

// Проверка участия в Гастрономическом туре
function checkGastroChallengeParticipation() {
    const hasJoined = localStorage.getItem('gastro_challenge_joined') === 'true';
    if (hasJoined) {
        const savedProgress = localStorage.getItem('gastro_challenge_progress');
        let completedTasks = 0;
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            completedTasks = progress.completedTasks || 0;
        }
        
        const exists = challengesData.my_challenges.some(c => c.title === "Гастрономический тур");
        if (!exists) {
            challengesData.my_challenges.push({
                id: 3,
                title: "Гастрономический тур",
                description: "Посети 5 ресторанов в креативных кластерах",
                start_date: "1.04.2026",
                end_date: "31.05.2026",
                duration: "2 месяца",
                reward_points: 500,
                discount: "15%",
                joined: true,
                progress: (completedTasks / 5) * 100,
                current: completedTasks,
                total: 5,
                completed: completedTasks === 5,
                gradient: "orange-purple"
            });
        } else {
            const index = challengesData.my_challenges.findIndex(c => c.title === "Гастрономический тур");
            if (index !== -1) {
                challengesData.my_challenges[index].progress = (completedTasks / 5) * 100;
                challengesData.my_challenges[index].current = completedTasks;
                challengesData.my_challenges[index].completed = completedTasks === 5;
            }
        }
    }
}

// Проверка завершения челленджа "Искатели красоты"
function checkBeautyChallengeCompletion() {
    const isCompleted = localStorage.getItem('beauty_challenge_completed') === 'true';
    const hasRewardClaimed = localStorage.getItem('beauty_challenge_reward_claimed') === 'true';
    
    if (isCompleted || hasRewardClaimed) {
        const exists = challengesData.my_challenges.some(c => c.title === "Искатели красоты" && c.completed === true);
        if (!exists) {
            // Удаляем существующий незавершенный, если есть
            const index = challengesData.my_challenges.findIndex(c => c.title === "Искатели красоты");
            if (index !== -1) {
                challengesData.my_challenges.splice(index, 1);
            }
            
            challengesData.my_challenges.push({
                id: 1,
                title: "Искатели красоты",
                description: "Отправляйся в увлекательное путешествие по Брусницы Лофту",
                start_date: "21.03.2026",
                end_date: "22.03.2026",
                duration: "2 дня",
                reward_points: 1000,
                discount: "15%",
                joined: true,
                progress: 100,
                current: 5,
                total: 5,
                completed: true,
                gradient: "pink-purple"
            });
        }
    }
}

// Загрузка данных из JSON
async function loadChallenges() {
    try {
        const response = await fetch('../data/challenges.json');
        const data = await response.json();
        challengesData = data;
        
        checkGastroChallengeParticipation();
        checkBeautyChallengeCompletion();
        
        renderAllChallenges();
        renderMyChallenges();
    } catch (error) {
        console.error('Ошибка загрузки челленджей:', error);
        useDemoData();
        checkGastroChallengeParticipation();
        checkBeautyChallengeCompletion();
        renderAllChallenges();
        renderMyChallenges();
    }
}

// Демо-данные на случай ошибки загрузки
function useDemoData() {
    challengesData.all_challenges = [
        {
            id: 1,
            title: "Искатели красоты",
            description: "Отправляйся в увлекательное путешествие по Брусницы Лофту",
            start_date: "21.03.2026",
            end_date: "22.03.2026",
            duration: "2 дня",
            reward_points: 1000,
            discount: "15%",
            joined: false,
            progress: null,
            current: null,
            total: null,
            completed: false,
            gradient: "pink-purple"
        },
        {
            id: 2,
            title: "Путешествие по ярмарке",
            description: "Посети всех резидентов на ярмарке в Сейкабеле",
            start_date: "1.03.2026",
            end_date: "15.03.2026",
            duration: "14 дней",
            reward_points: 300,
            discount: "15%",
            joined: false,
            progress: null,
            current: null,
            total: null,
            completed: false,
            gradient: "orange-pink"
        },
        {
            id: 3,
            title: "Гастрономический тур",
            description: "Посети 5 ресторанов в креативных кластерах",
            start_date: "1.04.2026",
            end_date: "31.05.2026",
            duration: "2 месяца",
            reward_points: 500,
            discount: "15%",
            joined: false,
            progress: null,
            current: null,
            total: null,
            completed: false,
            gradient: "orange-purple"
        }
    ];
    
    challengesData.my_challenges = [
        {
            id: 4,
            title: "Пора любить",
            description: "Устрой романтическое свидание в Брусницы Лофт и посети уютные локации",
            start_date: "14.02.2026",
            end_date: "16.02.2026",
            duration: "2 дня",
            reward_points: 500,
            discount: "15%",
            joined: true,
            progress: 100,
            current: 8,
            total: 8,
            completed: true,
            gradient: "pink-purple"
        },
        {
            id: 5,
            title: "Путешествие по ярмарке",
            description: "Посети всех резидентов на ярмарке в Сейкабеле",
            start_date: "1.03.2026",
            end_date: "15.03.2026",
            duration: "14 дней",
            reward_points: 300,
            discount: "15%",
            joined: true,
            progress: 20,
            current: 2,
            total: 10,
            completed: false,
            gradient: "orange-pink"
        },
        {
            id: 6,
            title: "Посети 5 концертов",
            description: "Сходи на пять концертов в креативных кластерах",
            start_date: "1.01.2026",
            end_date: "31.05.2026",
            duration: "5 месяцев",
            reward_points: 1000,
            discount: "20%",
            joined: true,
            progress: 20,
            current: 1,
            total: 5,
            completed: false,
            gradient: "vibrant-purple"
        }
    ];
    
    checkGastroChallengeParticipation();
    checkBeautyChallengeCompletion();
    
    renderAllChallenges();
    renderMyChallenges();
}

// Получение класса градиента
function getGradientClass(gradient) {
    const gradients = {
        'pink-purple': 'pink-purple',
        'orange-pink': 'orange-pink',
        'orange-purple': 'orange-purple',
        'vibrant-purple': 'vibrant-purple'
    };
    return gradients[gradient] || 'pink-purple';
}

// Отображение всех челленджей
function renderAllChallenges() {
    const container = document.getElementById('allChallenges');
    if (!container) return;
    
    const allChallenges = challengesData.all_challenges;
    
    if (allChallenges.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="material-symbols-outlined">emoji_events</i>
                <p>Пока нет доступных челленджей</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = allChallenges.map(challenge => createChallengeCard(challenge, false)).join('');
    
    document.querySelectorAll('#allChallenges .join-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            joinChallenge(id);
        });
    });
    
    document.querySelectorAll('#allChallenges .challenge-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            showChallengeDetails(id);
        });
    });
}

// Отображение моих челленджей
function renderMyChallenges() {
    const container = document.getElementById('myChallenges');
    if (!container) return;
    
    checkGastroChallengeParticipation();
    checkBeautyChallengeCompletion();
    
    const myChallenges = challengesData.my_challenges;
    
    if (myChallenges.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="material-symbols-outlined">emoji_events</i>
                <p>Вы еще не участвуете ни в одном челлендже</p>
                <p style="font-size: 14px; margin-top: 8px;">Перейдите на вкладку "Все челленджи" и присоединяйтесь!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = myChallenges.map(challenge => createChallengeCard(challenge, true)).join('');
    
    document.querySelectorAll('#myChallenges .claim-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            claimReward(id);
        });
    });
    
    document.querySelectorAll('#myChallenges .challenge-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const title = card.querySelector('.challenge-title h3')?.textContent || '';
            
            if (title.includes("Гастрономический тур")) {
                window.location.href = 'challenge-active.html';
            } else if (title.includes("Искатели красоты")) {
                const isCompleted = localStorage.getItem('beauty_challenge_completed') === 'true';
                if (!isCompleted) {
                    window.location.href = 'beauty-seekers-active.html';
                } else {
                    showChallengeDetails(id);
                }
            } else {
                showChallengeDetails(id);
            }
        });
    });
}

// Создание карточки челленджа
function createChallengeCard(challenge, isMyChallenge = false) {
    const gradientClass = getGradientClass(challenge.gradient);
    
    const progressHtml = challenge.progress !== null ? `
        <div class="progress-container">
            <div class="progress-info">
                <span>Прогресс: ${challenge.current}/${challenge.total}</span>
                <span class="progress-percent-value">${challenge.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${challenge.progress}%"></div>
            </div>
            ${challenge.progress === 100 ? '<div class="progress-complete">Выполнено! 🎉</div>' : ''}
        </div>
    ` : '';
    
    let rewardText = '';
if (challenge.reward_points && challenge.discount) {
    rewardText = `${challenge.reward_points} <span class="crystal-icon-img"></span> + скидка ${challenge.discount}`;
} else if (challenge.reward_points) {
    rewardText = `${challenge.reward_points} <span class="crystal-icon-img"></span>`;
} else if (challenge.discount) {
    rewardText = `скидка ${challenge.discount}`;
}
    
    let actionButton = '';
    if (challenge.completed && challenge.progress === 100) {
        actionButton = `
            <button class="claim-btn" data-id="${challenge.id}">
                <i class="material-symbols-outlined">emoji_events</i>
                Забрать награду →
            </button>
        `;
    } else if (!challenge.joined && !isMyChallenge) {
        actionButton = `
            <button class="join-btn" data-id="${challenge.id}">
                Участвовать →
            </button>
        `;
    }
    
    const showArrow = (challenge.title === "Путешествие по ярмарке" || challenge.title === "Посети 5 концертов");
    
    return `
        <div class="challenge-card" data-id="${challenge.id}">
            <div class="challenge-header ${gradientClass}">
                <div class="challenge-title">
                    <h3>
                        ${challenge.title}
                        ${showArrow ? '<i class="material-symbols-outlined arrow-icon">chevron_right</i>' : ''}
                    </h3>
                    <p>${challenge.description}</p>
                </div>
            </div>
            
            <div class="challenge-body">
                <div class="challenge-dates">
                    <div class="date-item">
                        <i class="material-symbols-outlined">event</i>
                        <span>Начало: <span class="date-value">${challenge.start_date}</span></span>
                    </div>
                    <div class="date-item">
                        <i class="material-symbols-outlined">event_busy</i>
                        <span>Конец: <span class="date-value">${challenge.end_date}</span></span>
                    </div>
                </div>
                
                ${progressHtml}
                
                <div class="challenge-footer">
                    <div class="reward-info">
                        <div class="reward-item">
                            <i class="material-symbols-outlined">schedule</i>
                            <span>${challenge.duration}</span>
                        </div>
                        <div class="reward-item reward-main">
                            <i class="material-symbols-outlined trophy-icon">emoji_events</i>
                            <span class="reward-text">${rewardText}</span>
                        </div>
                    </div>
                    ${actionButton}
                </div>
            </div>
        </div>
    `;
}

// Присоединение к челленджу
function joinChallenge(id) {
    const challenge = challengesData.all_challenges.find(c => c.id === id);
    
    if (id === 3 && challenge && challenge.title === "Гастрономический тур") {
        window.location.href = 'challenge-detail.html';
        return;
    }
    
    if (id === 1 && challenge && challenge.title === "Искатели красоты") {
        window.location.href = 'beauty-seekers-detail.html';
        return;
    }
    
    if (challenge && !challenge.joined) {
        challenge.joined = true;
        challenge.progress = 0;
        challenge.current = 0;
        challenge.total = challenge.total || 10;
        
        challengesData.my_challenges.push({
            id: Date.now(),
            title: challenge.title,
            description: challenge.description,
            start_date: challenge.start_date,
            end_date: challenge.end_date,
            duration: challenge.duration,
            reward_points: challenge.reward_points,
            discount: challenge.discount,
            joined: true,
            progress: 0,
            current: 0,
            total: challenge.total || 10,
            completed: false,
            gradient: challenge.gradient
        });
        
        alert(`✅ Вы присоединились к челленджу "${challenge.title}"!\n\nВыполняйте задания и получайте награды!`);
        
        renderAllChallenges();
        renderMyChallenges();
    }
}

// Забрать награду
function claimReward(id) {
    let challenge = challengesData.my_challenges.find(c => c.id === id);
    
    if (challenge && challenge.title === "Гастрономический тур") {
        if (challenge.completed && challenge.progress === 100) {
            alert(`🎉 Поздравляем!\n\nВы получили:\n◆ ${challenge.reward_points} кристаллов\n🏷️ Скидку ${challenge.discount}\n\nНаграда зачислена на ваш счет!`);
            
            const index = challengesData.my_challenges.findIndex(c => c.id === id);
            if (index !== -1) {
                challengesData.my_challenges.splice(index, 1);
            }
            
            localStorage.removeItem('gastro_challenge_joined');
            localStorage.removeItem('gastro_challenge_progress');
            
            renderAllChallenges();
            renderMyChallenges();
        }
        return;
    }
    
    if (challenge && challenge.completed && challenge.progress === 100) {
        alert(`🎉 Поздравляем!\n\nВы получили:\n◆ ${challenge.reward_points} кристаллов\n🏷️ Скидку ${challenge.discount}\n\nНаграда зачислена на ваш счет!`);
        
        const index = challengesData.my_challenges.findIndex(c => c.id === id);
        if (index !== -1) {
            challengesData.my_challenges.splice(index, 1);
        }
        
        renderAllChallenges();
        renderMyChallenges();
    }
}

// Показ деталей челленджа
function showChallengeDetails(id) {
    let challenge = challengesData.all_challenges.find(c => c.id === id);
    if (!challenge) {
        challenge = challengesData.my_challenges.find(c => c.id === id);
    }
    
    if (challenge) {
        alert(`📋 ${challenge.title}\n\n${challenge.description}\n\n📅 ${challenge.start_date} - ${challenge.end_date}\n🏆 Награда: ${challenge.reward_points} ◆ + скидка ${challenge.discount}`);
    }
}

// Переключение вкладок
function switchTab(tab) {
    const allTab = document.getElementById('allChallenges');
    const myTab = document.getElementById('myChallenges');
    const btns = document.querySelectorAll('.tab-btn');
    
    btns.forEach((btn, index) => {
        if ((tab === 'all' && index === 0) || (tab === 'my' && index === 1)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (tab === 'all') {
        allTab.style.display = 'block';
        myTab.style.display = 'none';
    } else {
        allTab.style.display = 'none';
        myTab.style.display = 'block';
    }
}

// Фильтры
let activeFilters = {
    new: false,
    completed: false,
    duration: 'all',
    theme: 'all'
};

let originalAllChallenges = [];
let originalMyChallenges = [];

function openFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function toggleFilter(filterType) {
    const checkbox = document.getElementById(`filter${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`);
    
    if (filterType === 'new') {
        activeFilters.new = !activeFilters.new;
        if (activeFilters.new) {
            checkbox.classList.add('checked');
        } else {
            checkbox.classList.remove('checked');
        }
    } else if (filterType === 'completed') {
        activeFilters.completed = !activeFilters.completed;
        if (activeFilters.completed) {
            checkbox.classList.add('checked');
        } else {
            checkbox.classList.remove('checked');
        }
    }
}

function toggleDropdown(type) {
    const dropdown = document.getElementById(`${type}Dropdown`);
    const filterDropdown = dropdown.previousElementSibling;
    
    dropdown.classList.toggle('show');
    filterDropdown.classList.toggle('open');
}

function selectDuration(duration) {
    activeFilters.duration = duration;
    
    const durationDropdown = document.getElementById('durationDropdown');
    const items = durationDropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        if (item.textContent === (duration === 'all' ? 'Все' : duration)) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    
    const filterDropdown = durationDropdown.previousElementSibling;
    const span = filterDropdown.querySelector('span');
    if (duration === 'all') {
        span.textContent = 'Длительность';
    } else {
        span.textContent = duration;
    }
    
    durationDropdown.classList.remove('show');
    filterDropdown.classList.remove('open');
}

function selectTheme(theme) {
    activeFilters.theme = theme;
    
    const themeDropdown = document.getElementById('themeDropdown');
    const items = themeDropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        if (item.textContent === (theme === 'all' ? 'Все' : theme.charAt(0).toUpperCase() + theme.slice(1))) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    
    const filterDropdown = themeDropdown.previousElementSibling;
    const span = filterDropdown.querySelector('span');
    if (theme === 'all') {
        span.textContent = 'Тематика';
    } else {
        span.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }
    
    themeDropdown.classList.remove('show');
    filterDropdown.classList.remove('open');
}

function clearAllFilters() {
    activeFilters = {
        new: false,
        completed: false,
        duration: 'all',
        theme: 'all'
    };
    
    document.getElementById('filterNew').classList.remove('checked');
    document.getElementById('filterCompleted').classList.remove('checked');
    
    const durationDropdown = document.getElementById('durationDropdown');
    const durationItems = durationDropdown.querySelectorAll('.dropdown-item');
    durationItems.forEach(item => {
        if (item.textContent === 'Все') {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    const durationFilter = durationDropdown.previousElementSibling;
    durationFilter.querySelector('span').textContent = 'Длительность';
    
    const themeDropdown = document.getElementById('themeDropdown');
    const themeItems = themeDropdown.querySelectorAll('.dropdown-item');
    themeItems.forEach(item => {
        if (item.textContent === 'Все') {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    const themeFilter = themeDropdown.previousElementSibling;
    themeFilter.querySelector('span').textContent = 'Тематика';
}

function applyFilters() {
    const allContainer = document.getElementById('allChallenges');
    const myContainer = document.getElementById('myChallenges');
    const currentTab = document.querySelector('.tab-btn.active').textContent === 'Все челленджи' ? 'all' : 'my';
    
    let filteredChallenges = [];
    
    if (currentTab === 'all') {
        filteredChallenges = [...originalAllChallenges];
    } else {
        filteredChallenges = [...originalMyChallenges];
    }
    
    if (activeFilters.new) {
        const today = new Date();
        filteredChallenges = filteredChallenges.filter(challenge => {
            const startDate = new Date(challenge.start_date.split('.').reverse().join('-'));
            const daysDiff = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
            return daysDiff <= 3 && daysDiff >= -1;
        });
    }
    
    if (activeFilters.completed) {
        filteredChallenges = filteredChallenges.filter(challenge => challenge.completed === true);
    }
    
    if (activeFilters.duration !== 'all') {
        filteredChallenges = filteredChallenges.filter(challenge => challenge.duration === activeFilters.duration);
    }
    
    if (activeFilters.theme !== 'all') {
        const themeKeywords = {
            'романтика': ['романтическое', 'свидание', 'любовь', 'уютные'],
            'путешествия': ['путешествие', 'ярмарка', 'резидентов', 'брусницы'],
            'гастрономия': ['ресторанов', 'гастрономический', 'тур'],
            'искусство': ['красоты', 'искатели', 'креативных'],
            'музыка': ['концертов', 'музыка']
        };
        
        const keywords = themeKeywords[activeFilters.theme] || [];
        filteredChallenges = filteredChallenges.filter(challenge => {
            const text = (challenge.title + ' ' + challenge.description).toLowerCase();
            return keywords.some(keyword => text.includes(keyword.toLowerCase()));
        });
    }
    
    if (currentTab === 'all') {
        if (filteredChallenges.length === 0) {
            allContainer.innerHTML = `<div class="empty-state"><i class="material-symbols-outlined">filter_alt</i><p>Нет челленджей по выбранным фильтрам</p></div>`;
        } else {
            allContainer.innerHTML = filteredChallenges.map(challenge => createChallengeCard(challenge, false)).join('');
            document.querySelectorAll('#allChallenges .join-btn').forEach(btn => {
                btn.addEventListener('click', (e) => { e.stopPropagation(); const id = parseInt(btn.dataset.id); joinChallenge(id); });
            });
            document.querySelectorAll('#allChallenges .challenge-card').forEach(card => {
                card.addEventListener('click', () => { const id = parseInt(card.dataset.id); showChallengeDetails(id); });
            });
        }
    } else {
        if (filteredChallenges.length === 0) {
            myContainer.innerHTML = `<div class="empty-state"><i class="material-symbols-outlined">filter_alt</i><p>Нет челленджей по выбранным фильтрам</p></div>`;
        } else {
            myContainer.innerHTML = filteredChallenges.map(challenge => createChallengeCard(challenge, true)).join('');
            document.querySelectorAll('#myChallenges .claim-btn').forEach(btn => {
                btn.addEventListener('click', (e) => { e.stopPropagation(); const id = parseInt(btn.dataset.id); claimReward(id); });
            });
            document.querySelectorAll('#myChallenges .challenge-card').forEach(card => {
                card.addEventListener('click', () => { const id = parseInt(card.dataset.id); showChallengeDetails(id); });
            });
        }
    }
    
    closeFilterModal();
}

function saveOriginalData() {
    originalAllChallenges = [...challengesData.all_challenges];
    originalMyChallenges = [...challengesData.my_challenges];
}

const originalRenderAll = renderAllChallenges;
const originalRenderMy = renderMyChallenges;

renderAllChallenges = function() {
    const container = document.getElementById('allChallenges');
    if (!container) return;
    originalAllChallenges = [...challengesData.all_challenges];
    originalRenderAll();
};

renderMyChallenges = function() {
    const container = document.getElementById('myChallenges');
    if (!container) return;
    originalMyChallenges = [...challengesData.my_challenges];
    originalRenderMy();
};

document.addEventListener('click', (e) => {
    const modal = document.getElementById('filterModal');
    if (modal && modal.classList.contains('show')) {
        if (e.target === modal) {
            closeFilterModal();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadChallenges();
});