const segments = [
    { value: "Бесплатная крутка", type: "free", color: "#F41D91", textColor: "white" },
    { value: "300", type: "purple", color: "#9C27B0", textColor: "white", amount: 300, crystalType: "violet" },
    { value: "Скидка 10%", type: "discount", color: "#F2711E", textColor: "white" },
    { value: "500", type: "orange", color: "#E040FB", textColor: "white", amount: 500, crystalType: "orange" },
    { value: "Попробуй еще раз", type: "lose", color: "#F41D91", textColor: "white" },
    { value: "400", type: "purple", color: "#F2711E", textColor: "white", amount: 400, crystalType: "violet" },
    { value: "Билет на выставку", type: "ticket", color: "#9C27B0", textColor: "white" },
    { value: "200", type: "orange", color: "#E040FB", textColor: "white", amount: 200, crystalType: "orange" }
];

let currentBalance = 600;
let isSpinning = false;
let canvas = null;
let ctx = null;
let currentAngle = 0;
let selectedTopupAmount = 0;

// Загрузка изображений кристаллов
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
        
        // Таймаут на случай ошибки загрузки
        setTimeout(() => resolve(), 2000);
    });
}

function initWheel() {
    canvas = document.getElementById('wheelCanvas');
    ctx = canvas.getContext('2d');
    loadImages().then(() => {
        drawWheel();
    });
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
            // Рисуем число
            ctx.fillStyle = "white";
            ctx.font = 'bold 20px "Sofia Sans"';
            ctx.fillText(segment.value, radius * 0.62, 0);
            // Рисуем фиолетовый кристалл (изображение)
            if (violetCrystalImg && violetCrystalImg.complete) {
                ctx.drawImage(violetCrystalImg, radius * 0.62 + 25, -12, 24, 24);
            } else {
                ctx.fillStyle = "#E040FB";
                ctx.font = 'bold 22px "Sofia Sans"';
                ctx.fillText("⬟", radius * 0.62 + 28, 0);
            }
        } 
        else if (segment.type === "orange") {
            // Рисуем число
            ctx.fillStyle = "white";
            ctx.font = 'bold 20px "Sofia Sans"';
            ctx.fillText(segment.value, radius * 0.62, 0);
            // Рисуем оранжевый кристалл (изображение)
            if (orangeCrystalImg && orangeCrystalImg.complete) {
                ctx.drawImage(orangeCrystalImg, radius * 0.62 + 25, -12, 24, 24);
            } else {
                ctx.fillStyle = "#F2711E";
                ctx.font = 'bold 22px "Sofia Sans"';
                ctx.fillText("⬟", radius * 0.62 + 28, 0);
            }
        }
        else if (segment.value === "Бесплатная крутка") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 12px "Sofia Sans"';
            ctx.fillText("Бесплатная", radius * 0.68, -10);
            ctx.font = 'bold 12px "Sofia Sans"';
            ctx.fillText("крутка", radius * 0.68, 6);
        }
        else if (segment.value === "Скидка 10%") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 20px "Sofia Sans"';
            ctx.fillText("10%", radius * 0.68, -5);
            ctx.font = 'bold 12px "Sofia Sans"';
            ctx.fillText("скидка", radius * 0.68, 18);
        }
        else if (segment.value === "Попробуй еще раз") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 11px "Sofia Sans"';
            ctx.fillText("Попробуй", radius * 0.68, -10);
            ctx.font = 'bold 11px "Sofia Sans"';
            ctx.fillText("еще раз", radius * 0.68, 6);
        }
        else if (segment.value === "Билет на выставку") {
            ctx.fillStyle = "white";
            ctx.font = 'bold 11px "Sofia Sans"';
            ctx.fillText("Билет на", radius * 0.68, -10);
            ctx.font = 'bold 11px "Sofia Sans"';
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
    gradient.addColorStop(0, '#F41D91');
    gradient.addColorStop(1, '#F2711E');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function spinWheel() {
    if (isSpinning) return;
    
    const spinCost = 300;
    if (currentBalance < spinCost) {
        showTopupModal();
        return;
    }
    
    currentBalance -= spinCost;
    updateBalanceDisplay();
    
    isSpinning = true;
    const spinButton = document.getElementById('spinBtn');
    spinButton.classList.add('disabled');
    spinButton.disabled = true;
    
    const targetPrizeIndex = 3;
    const targetAngle = calculateTargetAngle(targetPrizeIndex);
    const spinAngle = 360 * 5 + targetAngle;
    const startTime = performance.now();
    const duration = 3000;
    
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
            processPrize(prize);
            
            isSpinning = false;
            spinButton.classList.remove('disabled');
            spinButton.disabled = false;
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

function processPrize(prize) {
    let rewardMessage = '';
    
    if (prize.type === "free") {
        rewardMessage = "Бесплатная крутка! Стоимость списана не будет!";
        currentBalance += 300;
        updateBalanceDisplay();
    } else if (prize.type === "purple") {
        currentBalance += prize.amount;
        updateBalanceDisplay();
        rewardMessage = `Вы выиграли ${prize.amount} фиолетовых кристаллов!`;
    } else if (prize.type === "orange") {
        currentBalance += prize.amount;
        updateBalanceDisplay();
        rewardMessage = `Вы выиграли ${prize.amount} оранжевых кристаллов!`;
    } else if (prize.type === "discount") {
        rewardMessage = "Скидка 10% от партнеров добавлена в профиль!";
        saveDiscount();
    } else if (prize.type === "lose") {
        rewardMessage = "Попробуйте еще раз! В следующий раз повезет!";
    } else if (prize.type === "ticket") {
        rewardMessage = "Билет на выставку добавлен в профиль!";
        saveTicket();
    }
    
    showRewardModal(rewardMessage);
}

function saveDiscount() {
    const discounts = JSON.parse(localStorage.getItem('user_discounts') || '[]');
    discounts.push({ title: "Скидка 10% от партнеров", date: new Date().toLocaleDateString() });
    localStorage.setItem('user_discounts', JSON.stringify(discounts));
}

function saveTicket() {
    const tickets = JSON.parse(localStorage.getItem('user_tickets') || '[]');
    tickets.push({ title: "Билет на выставку", date: new Date().toLocaleDateString() });
    localStorage.setItem('user_tickets', JSON.stringify(tickets));
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
    const modal = document.getElementById('topupModal');
    modal.classList.add('show');
}

function closeTopupModal() {
    const modal = document.getElementById('topupModal');
    modal.classList.remove('show');
}

function selectTopup(amount) {
    selectedTopupAmount = amount;
    const options = document.querySelectorAll('.topup-option');
    options.forEach(opt => opt.style.border = '1px solid rgba(244, 29, 145, 0.2)');
    event.currentTarget.style.border = '2px solid #F41D91';
}

function confirmTopup() {
    if (selectedTopupAmount > 0) {
        currentBalance += selectedTopupAmount;
        updateBalanceDisplay();
        closeTopupModal();
        selectedTopupAmount = 0;
        alert(`✅ Баланс пополнен на ${selectedTopupAmount} кристаллов`);
    } else {
        alert('❌ Выберите сумму пополнения');
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