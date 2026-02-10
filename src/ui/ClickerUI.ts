import { Game } from '../core/Game';

export class ClickerUI {
    private container: HTMLElement;
    private game: Game;
    private tomoCountDisplay: HTMLElement;
    private tpsDisplay: HTMLElement;
    
    // Visual Elements
    private imageWrapper: HTMLElement;
    private particlesContainer: HTMLElement;
    
    constructor(game: Game, rootElement: HTMLElement) {
        this.game = game;
        this.container = rootElement;
        
        // Setup DOM
        this.render();
        
        // Get references
        this.tomoCountDisplay = this.container.querySelector('#tomo-count')!;
        this.tpsDisplay = this.container.querySelector('#tps')!;
        this.imageWrapper = this.container.querySelector('#imageWrapper') as HTMLElement;
        this.particlesContainer = this.container.querySelector('#particles') as HTMLElement;
        
        // Initialize Particles
        this.createParticles();
        
        // Bind events
        this.bindEvents();
        
        // Initial Update
        this.update();
        
        // Game Loop Update
        this.startUIUpdateLoop();
    }
    
    private createParticles() {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 6 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 8}s`;
            p.style.animationDuration = `${Math.random() * 6 + 5}s`;

            const colors = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            this.particlesContainer.appendChild(p);
        }
    }
    
    private render() {
        this.container.innerHTML = `
            <div class="clicker-pane">
                <div class="background-particles" id="particles"></div>
                <div class="header-status">
                    <div class="count-wrapper">
                         <span class="count-label">とも:</span>
                         <span class="count-value" id="tomo-count">0</span>
                    </div>
                    <div class="tps-wrapper">
                         <span class="tps-label">per second:</span>
                         <span class="tps-value" id="tps">0.0</span>
                    </div>
                </div>
                
                <div class="image-area">
                    <div class="image-wrapper" id="imageWrapper">
                        <div class="glow-ring"></div>
                        <div class="pulse-ring"></div>
                        <img src="/image/image.png" class="character-image" draggable="false">
                        <div class="click-effect"></div>
                    </div>
                </div>
            </div>
            <div class="store-pane" id="store-pane">
                <!-- StoreUI will render here -->
            </div>
        `;
    }
    
    private bindEvents() {
        this.imageWrapper.addEventListener('click', (e) => this.handleClick(e));
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                this.handleClick(e);
            }
        });
    }
    
    private handleClick(e: Event) {
        e.preventDefault();
        this.game.click();
        this.triggerVisualEffects();
        this.update();
    }
    
    private triggerVisualEffects() {
        const pulse = this.imageWrapper.querySelector('.pulse-ring') as HTMLElement;
        const clickEffect = this.imageWrapper.querySelector('.click-effect') as HTMLElement;
        
        pulse.classList.remove('active');
        void pulse.offsetWidth;
        pulse.classList.add('active');
        
        clickEffect.classList.remove('flash');
        void clickEffect.offsetWidth;
        clickEffect.classList.add('flash');
        
        this.spawnEmoji();
    }
    
    private spawnEmoji() {
        const emojis = ['🔊', '🎵', '🎶', '✨', '⭐', '💫', '🎤', '🗣️', '💬'];
        const emoji = document.createElement('span');
        emoji.className = 'emoji-burst';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Relative positioning to imageWrapper
        // center logic: 50% + offset
        const tx = (Math.random() - 0.5) * 200;
        const ty = -(Math.random() * 120 + 60);
        const rot = (Math.random() - 0.5) * 360;
        
        emoji.style.left = '50%';
        emoji.style.top = '50%';
        
        emoji.style.setProperty('--tx', `${tx}px`);
        emoji.style.setProperty('--ty', `${ty}px`);
        emoji.style.setProperty('--rot', `${rot}deg`);
        
        this.imageWrapper.appendChild(emoji);
        emoji.addEventListener('animationend', () => emoji.remove());
    }
    
    private update() {
        this.tomoCountDisplay.textContent = Math.floor(this.game.tomo).toLocaleString();
        this.tpsDisplay.textContent = this.game.getProductionPerSecond().toFixed(1);
    }
    
    private startUIUpdateLoop() {
        setInterval(() => {
            this.update();
        }, 100); // 10 FPS for UI update is enough
    }
}
