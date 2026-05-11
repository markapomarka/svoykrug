const segments = [
    { value: "Бесплатная крутка", type: "free", color: "#E91E63", textColor: "white" },
    { value: "300", type: "purple", color: "#9C27B0", textColor: "white", amount: 300, crystalType: "violet" },
    { value: "Скидка 10%", type: "discount", color: "#E67E22", textColor: "white" },
    { value: "500", type: "orange", color: "#E040FB", textColor: "white", amount: 500, crystalType: "orange" },
    { value: "Попробуй еще раз", type: "lose", color: "#E91E63", textColor: "white" },
    { value: "400", type: "purple", color: "#E67E22", textColor: "white", amount: 400, crystalType: "violet" },
    { value: "Билет на выставку", type: "ticket", color: "#9C27B0", textColor: "white" },
    { value: "200", type: "orange", color: "#E040FB", textColor: "white", amount: 200, crystalType: "orange" }
];

let currentBalance = 600;
let freeSpinsLeft = 1;
let isSpinning = false;
let canvas = null;
let ctx = null;
let currentAngle = 0;
let selectedTopupAmount = 0;

let violetCrystalImg = null;
let orangeCrystalImg = null;

function loadImages() {
    return new Promise((resolve) => {
        let loaded = 0;
        const total = 2;
        
        violetCrystalImg = new Image();
        orangeCrystalImg = new Image();
        
        violetCrystalImg.onload = () => {
            loaded++;
            if (loaded === total) resolve();
        };
        orangeCrystalImg.onload = () => {
            loaded++;
            if (loaded === total) resolve();
        };
        
        violetCrystalImg.src = '../images/violetcrystal.png';
        orangeCrystalImg.src = '../images/orangecrystal.png';
        
        setTimeout(() => resolve(), 2000);
    });
}

function initWheel() {
    canvas = document.getElementById('wheelCanvas');
    ctx = canvas.getContext('2d');
    loadImages().then(() => {
        drawWheel();
    });
    updateFreeSpinsUI();
}

function updateFreeSpinsUI() {
    const freeSpinBtn = document.getElementById('spinBtnFree');
    if (freeSpinBtn) {
        if (freeSpinsLeft > 0) {
            freeSpinBtn.innerHTML = `<i class="material-symbols-outlined">casino</i> Бесплатная крутка (${freeSpinsLeft})`;
            freeSpinBtn.disabled = false;
            freeSpinBtn.classList.remove('disabled');
        } else {
            freeSpinBtn.innerHTML = `<i class="material-symbols-outlined">casino</i> Бесплатных круток нет`;
            freeSpinBtn.disabled = true;
            freeSpinBtn.classList.add('disabled');
        }
    }
}

function drawWheel() {
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;
    const angleStep = (Math.PI * 2) / segments.length;
    
    for (let i = 0; i < segments.length; i++) {
        const startAngle = currentAngle + i * angleStep;
        const endAngle = startAngle + angleStep;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = segments[i].color;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const segment = segments[i];
        
        if (segment.type === "purple") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 22px "Sofia Sans"';
            ctx.fillText(segment.value, radius * 0.62, 0);
            if (violetCrystalImg && violetCrystalImg.complete) {
                ctx.drawImage(violetCrystalImg, radius * 0.62 + 30, -14, 28, 28);
            }
        } 
        else if (segment.type === "orange") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 22px "Sofia Sans"';
            ctx.fillText(segment.value, radius * 0.62, 0);
            if (orangeCrystalImg && orangeCrystalImg.complete) {
                ctx.drawImage(orangeCrystalImg, radius * 0.62 + 30, -14, 28, 28);
            }
        }
        else if (segment.value === "Бесплатная крутка") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 13px "Sofia Sans"';
            ctx.fillText("Бесплатная", radius * 0.68, -10);
            ctx.fillText("крутка", radius * 0.68, 6);
        }
        else if (segment.value === "Скидка 10%") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 22px "Sofia Sans"';
            ctx.fillText("10%", radius * 0.68, -5);
            ctx.font = 'bold 13px "Sofia Sans"';
            ctx.fillText("скидка", radius * 0.68, 18);
        }
        else if (segment.value === "Попробуй еще раз") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 12px "Sofia Sans"';
            ctx.fillText("Попробуй", radius * 0.68, -10);
            ctx.fillText("еще раз", radius * 0.68, 6);
        }
        else if (segment.value === "Билет на выставку") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 12px "Sofia Sans"';
            ctx.fillText("Билет на", radius * 0.68, -10);
            ctx.fillText("выставку", radius * 0.68, 6);
        }
        
        ctx.restore();
    }
    
    drawCenterGradient();
}

function drawCenterGradient() {
    const centerX = 200;
    const centerY = 200;
    const radius = 25;
    
    const gradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
    gradient.addColorStop(0, '#E91E63');
    gradient.addColorStop(1, '#E67E22');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function spinWheelFree() {
    if (isSpinning) return;
    if (freeSpinsLeft <= 0) {
        alert('У вас закончились бесплатные крутки! Используйте платную крутку.');
        return;
    }
    
    freeSpinsLeft--;
    updateFreeSpinsUI();
    startSpin('free');
}

function spinWheelPaid() {
    if (isSpinning) return;
    
    const spinCost = 300;
    if (currentBalance < spinCost) {
        showTopupModal();
        return;
    }
    
    currentBalance -= spinCost;
    updateBalanceDisplay();
    startSpin('paid');
}

function startSpin(type) {
    isSpinning = true;
    const spinButtonFree = document.getElementById('spinBtnFree');
    const spinButtonPaid = document.getElementById('spinBtnPaid');
    
    if (spinButtonFree) spinButtonFree.disabled = true;
    if (spinButtonPaid) spinButtonPaid.disabled = true;
    
    const targetPrizeIndex = Math.floor(Math.random() * segments.length);
    const targetAngle = calculateTargetAngle(targetPrizeIndex);
    const spinAngle = 360 * 5 + targetAngle;
    const startTime = performance.now();
    const duration = 4000;
    
    function animateSpin(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const newAngle = currentAngle + (spinAngle * Math.PI / 180) * easeOut;
        
        currentAngle = newAngle;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            const prize = segments[targetPrizeIndex];
            processPrize(prize, type);
            
            isSpinning = false;
            if (spinButtonFree) spinButtonFree.disabled = false;
            if (spinButtonPaid) spinButtonPaid.disabled = false;
            
            if (type === 'free') {
                updateFreeSpinsUI();
            }
        }
    }
    
    requestAnimationFrame(animateSpin);
}

function calculateTargetAngle(segmentIndex) {
    const angleStep = 360 / segments.length;
    const pointerAngle = 90;
    let targetAngle = (segmentIndex * angleStep + angleStep / 2 - pointerAngle + 360) % 360;
    return (360 - targetAngle) % 360;
}

function processPrize(prize, spinType) {
    let rewardMessage = '';
    let showProfileButton = false;
    let isLose = false;
    
    if (prize.type === "free") {
        rewardMessage = "Бесплатная крутка! +1 дополнительное вращение!";
        freeSpinsLeft++;
        updateFreeSpinsUI();
    } else if (prize.type === "purple") {
        let rewardAmount = prize.amount;
        currentBalance += rewardAmount;
        updateBalanceDisplay();
        rewardMessage = `Вы выиграли ${rewardAmount} фиолетовых кристаллов!`;
        addVioletCrystals(rewardAmount);
        showProfileButton = true;
    } else if (prize.type === "orange") {
        let rewardAmount = prize.amount;
        currentBalance += rewardAmount;
        updateBalanceDisplay();
        rewardMessage = `Вы выиграли ${rewardAmount} оранжевых кристаллов!`;
    } else if (prize.type === "discount") {
        rewardMessage = "Скидка 10% на чек в ресторане 'Прибой' до 25.08.2026 добавлена в профиль!";
        saveDiscountReward();
        showProfileButton = true;
    } else if (prize.type === "lose") {
        rewardMessage = "Попробуйте еще раз!";
        isLose = true;
    } else if (prize.type === "ticket") {
        rewardMessage = "Билет на выставку 'Третье измерение' до 25.08.2026 добавлен в профиль!";
        saveTicketReward();
        showProfileButton = true;
    }
    
    showResultModal(rewardMessage, showProfileButton, isLose);
}

function addVioletCrystals(amount) {
    let violetBalance = parseInt(localStorage.getItem('violet_crystals') || '0');
    violetBalance += amount;
    localStorage.setItem('violet_crystals', violetBalance);
    
    if (window.updateVioletBalance) {
        window.updateVioletBalance(amount);
    }
}

function saveDiscountReward() {
    const rewards = JSON.parse(localStorage.getItem('user_rewards') || '[]');
    rewards.push({
        id: Date.now(),
        title: "Скидка 10% на чек в ресторане 'Прибой'",
        date: "До 25.08.2026",
        tag: "Лотерея",
        type: "discount",
        icon: "local_offer",
        used: false
    });
    localStorage.setItem('user_rewards', JSON.stringify(rewards));
}

function saveTicketReward() {
    const rewards = JSON.parse(localStorage.getItem('user_rewards') || '[]');
    rewards.push({
        id: Date.now(),
        title: "Билет на выставку 'Третье измерение'",
        date: "До 25.08.2026",
        tag: "Лотерея",
        type: "ticket",
        icon: "confirmation_number",
        used: false
    });
    localStorage.setItem('user_rewards', JSON.stringify(rewards));
}

function showResultModal(message, showProfileButton = false, isLose = false) {
    const modal = document.getElementById('resultModal');
    const messageElement = document.getElementById('resultMessage');
    const titleElement = document.getElementById('resultTitle');
    const iconElement = document.getElementById('resultIcon');
    
    // Убираем эмодзи
    if (iconElement) iconElement.style.display = 'none';
    
    messageElement.innerHTML = message.replace(/\n/g, '<br>');
    
    if (isLose) {
        titleElement.textContent = 'Попробуйте снова';
    } else {
        titleElement.textContent = 'Поздравляем!';
    }
    
    // Получаем кнопку "Отлично!"
    const okBtn = document.querySelector('.result-btn');
    
    if (showProfileButton) {
        // Скрываем старую кнопку
        if (okBtn) okBtn.style.display = 'none';
        
        // Создаем или показываем кнопку "Посмотреть профиль"
        let profileBtn = document.querySelector('.result-profile-btn');
        if (!profileBtn) {
            profileBtn = document.createElement('button');
            profileBtn.className = 'result-profile-btn';
            profileBtn.innerHTML = 'Посмотреть профиль';
            profileBtn.onclick = () => {
                closeResultModal();
                window.location.href = 'profile.html';
            };
            modal.querySelector('.result-modal-content').appendChild(profileBtn);
            profileBtn.style.marginTop = '12px';
        } else {
            profileBtn.style.display = 'block';
        }
    } else {
        // Показываем старую кнопку
        if (okBtn) {
            okBtn.style.display = 'block';
            okBtn.style.margin = '0 auto';
        }
        
        // Скрываем кнопку профиля если есть
        const profileBtn = document.querySelector('.result-profile-btn');
        if (profileBtn) profileBtn.style.display = 'none';
    }
    
    modal.classList.add('show');
}

function closeResultModal() {
    const modal = document.getElementById('resultModal');
    modal.classList.remove('show');
    
    // Возвращаем стандартный вид
    const okBtn = document.querySelector('.result-btn');
    if (okBtn) {
        okBtn.style.display = 'block';
        okBtn.style.margin = '0 auto';
    }
    
    const profileBtn = document.querySelector('.result-profile-btn');
    if (profileBtn) profileBtn.style.display = 'none';
}

function showRewardModal(message) {
    const modal = document.getElementById('rewardModal');
    const messageElement = document.getElementById('resultMessage');
    messageElement.textContent = message;
    modal.classList.add('show');
}

function closeRewardModal() {
    const modal = document.getElementById('rewardModal');
    modal.classList.remove('show');
}

function goToProfile() {
    window.location.href = 'profile.html';
}

function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balanceAmount');
    if (balanceElement) {
        balanceElement.textContent = currentBalance;
    }
    localStorage.setItem('wheel_balance', currentBalance);
}

function showTopupModal() {
    selectedTopupAmount = 0;
    const modal = document.getElementById('topupModal');
    modal.classList.add('show');
    
    const options = document.querySelectorAll('.topup-option');
    options.forEach(opt => opt.style.border = '1px solid rgba(233, 30, 99, 0.2)');
}

function closeTopupModal() {
    const modal = document.getElementById('topupModal');
    modal.classList.remove('show');
}

function selectTopup(amount) {
    selectedTopupAmount = amount;
    const options = document.querySelectorAll('.topup-option');
    options.forEach(opt => opt.style.border = '1px solid rgba(233, 30, 99, 0.2)');
    event.currentTarget.style.border = '2px solid #E91E63';
}

function confirmTopup() {
    if (selectedTopupAmount > 0) {
        currentBalance += selectedTopupAmount;
        updateBalanceDisplay();
        closeTopupModal();
        alert(`Баланс пополнен на ${selectedTopupAmount} оранжевых кристаллов!`);
        selectedTopupAmount = 0;
    } else {
        alert('Пожалуйста, выберите сумму пополнения');
    }
}

function loadBalance() {
    const saved = localStorage.getItem('wheel_balance');
    if (saved !== null) {
        currentBalance = parseInt(saved);
    }
    updateBalanceDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    initWheel();
    loadBalance();
});