// State
let currentPage = 0;
let musicPlaying = false;
let gameChoice = null;

// Romantic Quotes for each choice
const romanticQuotes = {
    heart: [
        "You are the heartbeat that keeps my soul alive. Every moment without you feels incomplete. 💕",
        "In a world full of chaos, your love is my peace. You are my sanctuary, my home. 🏡",
        "I didn't know what true love was until I met you. Now I can't imagine life without you. 💖"
    ],
    star: [
        "You shine brighter than all the stars in the sky. You light up my darkest nights. ✨",
        "In the galaxy of my life, you are the brightest constellation guiding me home. 🌟",
        "Like a shooting star, you came into my life unexpectedly and made all my wishes come true. 💫"
    ],
    flower: [
        "Like a rose, you are beautiful, delicate, and worth every thorn life throws at us. 🌹",
        "You bloom in my heart like the most precious flower in an eternal garden. 🌸",
        "Every petal of your love makes my life more colorful and meaningful. You are my spring forever. 🌺"
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initBackgroundHearts();
    startRosePetals();
    calculateCountdown();
    attachEventListeners();
});

// Background Hearts
function initBackgroundHearts() {
    const container = document.getElementById('backgroundHearts');
    const heartSVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = heartSVG;
        heart.style.left = `${(i * 10 + 5)}%`;
        heart.style.top = `${(i * 10) % 100}%`;
        heart.style.animation = `float ${12 + i * 2}s ease-in-out infinite`;
        heart.style.animationDelay = `${i * 0.5}s`;
        heart.style.fontSize = `${25 + (i % 3) * 15}px`;
        container.appendChild(heart);
    }
}

// Continuous Rose Petals
function startRosePetals() {
    const container = document.getElementById('rosePetalsContainer');
    let petalCount = 0;
    const maxPetals = 20;
    
    function createPetal() {
        if (petalCount >= maxPetals) {
            const oldPetal = container.querySelector('.rose-petal');
            if (oldPetal) {
                oldPetal.remove();
                petalCount--;
            }
        }
        
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        petal.textContent = '🌹';
        
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 4;
        const size = 20 + Math.random() * 15;
        const rotation = Math.random() * 360;
        const sway = Math.random() * 50 - 25;
        
        petal.style.left = `${left}%`;
        petal.style.top = '-50px';
        petal.style.fontSize = `${size}px`;
        petal.style.transform = `rotate(${rotation}deg)`;
        petal.style.setProperty('--sway', `${sway}px`);
        petal.style.animation = `roseFall ${duration}s linear forwards`;
        
        container.appendChild(petal);
        petalCount++;
        
        setTimeout(() => {
            petal.remove();
            petalCount--;
        }, duration * 1000);
    }
    
    // Initial petals
    for (let i = 0; i < 15; i++) {
        setTimeout(createPetal, i * 300);
    }
    
    // Continuous generation
    setInterval(createPetal, 800);
}

// Fireworks Effect
function triggerFireworks() {
    const container = document.getElementById('fireworksContainer');
    const particles = [];
    
    for (let i = 0; i < 30; i++) {
        const type = Math.random() > 0.5 ? 'heart' : 'sparkle';
        const particle = document.createElement('div');
        particle.className = 'firework';
        
        if (type === 'heart') {
            particle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#ec4899"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
        } else {
            particle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="10"></circle></svg>';
        }
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const tx = (Math.random() - 0.5) * 150;
        const ty = Math.random() * -120;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animation = `fireworkAnim 1.8s ease-out ${delay}s forwards`;
        
        container.appendChild(particle);
        particles.push(particle);
    }
    
    setTimeout(() => {
        particles.forEach(p => p.remove());
    }, 2500);
}

// Page Navigation
function goToPage(pageNumber) {
    const currentPageEl = document.querySelector('.page.active');
    const nextPageEl = document.getElementById(`page${pageNumber}`);
    
    if (currentPageEl) {
        currentPageEl.classList.remove('active');
    }
    
    if (nextPageEl) {
        triggerFireworks();
        setTimeout(() => {
            nextPageEl.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            currentPage = pageNumber;
        }, 600);
    }
}

// Calculate Countdown
function calculateCountdown() {
    const startDate = new Date('2022-12-07T00:00:00');
    const endDate = new Date('2025-12-07T00:00:00');
    const diff = endDate - startDate;
    
    const years = 3;
    const months = 36;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days.toLocaleString();
    document.getElementById('hours').textContent = hours.toLocaleString();
}

// Game Logic
function playGame(choice) {
    gameChoice = choice;
    
    // Hide choices, show loading
    document.getElementById('gameChoices').classList.add('hidden');
    
    setTimeout(() => {
        showGameResult(choice);
    }, 800);
}

function showGameResult(choice) {
    const resultSection = document.getElementById('gameResult');
    const quotesContainer = document.getElementById('quotesContainer');
    
    // Clear previous quotes
    quotesContainer.innerHTML = '';
    
    // Add quotes for the selected choice
    const quotes = romanticQuotes[choice];
    quotes.forEach((quote, index) => {
        const p = document.createElement('p');
        p.className = 'quote-text';
        p.textContent = quote;
        p.style.animationDelay = `${index * 0.3}s`;
        quotesContainer.appendChild(p);
    });
    
    // Show result
    resultSection.classList.remove('hidden');
    triggerFireworks();
}

function resetGame() {
    document.getElementById('gameChoices').classList.remove('hidden');
    document.getElementById('gameResult').classList.add('hidden');
    gameChoice = null;
}

// Event Listeners
function attachEventListeners() {
    // Music toggle
    const musicBtn = document.getElementById('musicToggle');
    musicBtn.addEventListener('click', function() {
        musicPlaying = !musicPlaying;
        const musicIcon = this.querySelector('.music-icon');
        const muteIcon = this.querySelector('.mute-icon');
        
        if (musicPlaying) {
            musicIcon.classList.add('hidden');
            muteIcon.classList.remove('hidden');
        } else {
            musicIcon.classList.remove('hidden');
            muteIcon.classList.add('hidden');
        }
    });
    
    // Heart buttons for page navigation
    const heartButtons = document.querySelectorAll('.heart-btn[data-next]');
    heartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextPage = parseInt(this.getAttribute('data-next'));
            goToPage(nextPage);
        });
    });
    
    // Game choice buttons
    const choiceCards = document.querySelectorAll('.choice-card');
    choiceCards.forEach(card => {
        card.addEventListener('click', function() {
            const choice = this.getAttribute('data-choice');
            playGame(choice);
        });
    });
    
    // Play again button
    const playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', resetGame);
    }
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';