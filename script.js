/**
 * とものもと - 画像クリック音声再生アプリ
 */
(function () {
    'use strict';

    const TOTAL_AUDIO = 22;
    const EMOJIS = ['🔊', '🎵', '🎶', '✨', '⭐', '💫', '🎤', '🗣️', '💬'];

    // --- DOM Elements ---
    const imageWrapper  = document.getElementById('imageWrapper');
    const characterImage = document.getElementById('characterImage');
    const pulseRing     = document.getElementById('pulseRing');
    const clickEffect   = document.getElementById('clickEffect');
    const countNumber   = document.getElementById('countNumber');
    const countIcon     = document.querySelector('.count-icon');
    const particlesContainer = document.getElementById('particles');

    // --- State ---
    let playCount = 0;
    let lastPlayedIndex = -1;
    let isPlaying = false;
    let currentAudio = null;

    // --- Sound wave visualizer ---
    const soundWaves = document.createElement('div');
    soundWaves.className = 'sound-waves';
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        soundWaves.appendChild(bar);
    }
    imageWrapper.appendChild(soundWaves);

    // --- Pre-load audio ---
    const audioPool = [];
    for (let i = 1; i <= TOTAL_AUDIO; i++) {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = 'audio/' + i + '.wav';
        audioPool.push(audio);
    }

    // --- Create background particles ---
    function createParticles() {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 6 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (Math.random() * 6 + 5) + 's';

            const colors = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            particlesContainer.appendChild(p);
        }
    }
    createParticles();

    // --- Pick random audio (avoid immediate repeat) ---
    function getRandomIndex() {
        if (TOTAL_AUDIO <= 1) return 0;
        let idx;
        do {
            idx = Math.floor(Math.random() * TOTAL_AUDIO);
        } while (idx === lastPlayedIndex);
        lastPlayedIndex = idx;
        return idx;
    }

    // --- Emoji burst effect ---
    function spawnEmoji() {
        const emoji = document.createElement('span');
        emoji.className = 'emoji-burst';
        emoji.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        const rect = imageWrapper.getBoundingClientRect();
        emoji.style.left = (rect.width / 2 + (Math.random() - 0.5) * rect.width * 0.6) + 'px';
        emoji.style.top = (rect.height / 2 + (Math.random() - 0.5) * rect.height * 0.4) + 'px';
        emoji.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        emoji.style.setProperty('--ty', -(Math.random() * 120 + 60) + 'px');
        emoji.style.setProperty('--rot', (Math.random() - 0.5) * 360 + 'deg');

        imageWrapper.appendChild(emoji);
        emoji.addEventListener('animationend', () => emoji.remove());
    }

    // --- Play audio on click ---
    function handleClick(e) {
        e.preventDefault();

        // Stop currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const idx = getRandomIndex();
        const audio = audioPool[idx];
        audio.currentTime = 0;
        currentAudio = audio;

        audio.play().then(() => {
            isPlaying = true;
            soundWaves.classList.add('playing');
        }).catch(err => {
            console.warn('Audio play failed:', err);
        });

        audio.onended = function () {
            isPlaying = false;
            soundWaves.classList.remove('playing');
            currentAudio = null;
        };

        // Visual effects
        pulseRing.classList.remove('active');
        void pulseRing.offsetWidth;
        pulseRing.classList.add('active');

        clickEffect.classList.remove('flash');
        void clickEffect.offsetWidth;
        clickEffect.classList.add('flash');

        countIcon.classList.remove('bounce');
        void countIcon.offsetWidth;
        countIcon.classList.add('bounce');

        // Spawn emojis
        const emojiCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < emojiCount; i++) {
            setTimeout(() => spawnEmoji(), i * 80);
        }

        // Update play count
        playCount++;
        countNumber.textContent = playCount;
    }

    // --- Event listeners ---
    imageWrapper.addEventListener('click', handleClick);
    imageWrapper.addEventListener('touchend', function (e) {
        e.preventDefault();
        handleClick(e);
    }, { passive: false });

    // --- Keyboard accessibility ---
    imageWrapper.setAttribute('tabindex', '0');
    imageWrapper.setAttribute('role', 'button');
    imageWrapper.setAttribute('aria-label', 'クリックして音声を再生');
    imageWrapper.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
        }
    });

})();
