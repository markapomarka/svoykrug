// Открытие/закрытие бокового меню
function toggleSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    
    if (sideMenu && overlay) {
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('show');
        
        // Блокируем/разблокируем прокрутку страницы
        document.body.style.overflow = sideMenu.classList.contains('open') ? 'hidden' : '';
    }
}

// Обработка кликов по пунктам меню
function handleMenuClick(itemName) {
    console.log(` Нажато: ${itemName}`);
    alert(`🚧 Раздел "${itemName}" скоро появится!\nСледите за обновлениями.`);
    // Закрываем меню после выбора пункта (опционально)
    // toggleSideMenu();
}

// Показ сторис
function showStory(storyId) {
    const actions = {
        1: () => alert('📖 Откроется инструкция по использованию приложения'),
        2: () => alert('🎉 Здесь будут события, которые можно создать или посетить'),
        3: () => alert('🏆 Участвуйте в челленджах и получайте награды!'),
        4: () => alert('🎁 Собирайте бонусы за активность в приложении')
    };
    
    const action = actions[storyId];
    if (action) {
        action();
    } else {
        alert('Скоро появится!');
    }
}

// Навигация (заглушка)
function navigateTo(page) {
    if (page === 'index.html') {
        // Уже на главной
        console.log('🏠 На главной');
    } else {
        alert('🚧 Страница в разработке');
    }
}

// Обновление активного пункта нижнего меню
function updateActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-icon-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navItems.forEach(item => item.classList.remove('active'));
    
    if (currentPage === '' || currentPage === '/' || currentPage === 'index.html') {
        const homeIcon = document.querySelector('.nav-icon-item:nth-child(2)');
        if (homeIcon) homeIcon.classList.add('active');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavItem();
    
    // Закрываем меню при клике на оверлей
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSideMenu);
    }
    
    console.log('🚀 СвойКруг готов к работе!');
});