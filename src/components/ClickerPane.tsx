import React, { useRef, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import { BackgroundCharacters } from './BackgroundCharacters';

export const ClickerPane: React.FC = () => {
    const { tomo, production, click } = useGame();
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    // Initialize Particles
    useEffect(() => {
        if (!particlesRef.current) return;
        const container = particlesRef.current;
        
        // Clear existing
        container.innerHTML = '';

        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 6 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 8}s`;
            p.style.animationDuration = `${Math.random() * 6 + 5}s`;

            const colors = ['#6c5ce7', '#a29bfe', '#fd79a8'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(p);
        }
    }, []);

    const spawnEmoji = () => {
        if (!imageWrapperRef.current) return;
        
        // Create container for particle
        const particle = document.createElement('div');
        particle.className = 'emoji-burst flex items-center justify-center';
        
        // Style container (white background)
        particle.style.width = '40px';
        particle.style.height = '40px';
        particle.style.background = 'rgba(255, 255, 255, 0.9)';
        particle.style.borderRadius = '8px';
        particle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        
        // Create image
        const img = document.createElement('img');
        img.src = '/image/image.png';
        img.style.width = '30px';
        img.style.height = '30px';
        img.style.objectFit = 'contain';
        
        particle.appendChild(img);
        
        const tx = (Math.random() - 0.5) * 200;
        const ty = -(Math.random() * 120 + 60);
        const rot = (Math.random() - 0.5) * 360;
        
        particle.style.left = '50%';
        particle.style.top = '50%';
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--rot', `${rot}deg`);
        
        imageWrapperRef.current.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove());
    };

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        // e.preventDefault(); // Sometimes prevents focus
        click();
        spawnEmoji();

        // Trigger animations via class toggling
        const wrapper = imageWrapperRef.current;
        if (wrapper) {
            // Pulse
            const pulse = wrapper.querySelector('.pulse-ring');
            if (pulse) {
                pulse.classList.remove('animate-pulse-out');
                void (pulse as HTMLElement).offsetWidth; // Trigger reflow
                pulse.classList.add('animate-pulse-out');
            }

            // Click Effect (Flash)
            const flash = wrapper.querySelector('.click-effect');
            if (flash) {
                flash.classList.remove('animate-pulse-out'); // Reusing pulse-out or creating flash?
                // Let's stick to simple opacity flash
                (flash as HTMLElement).style.animation = 'none';
                void (flash as HTMLElement).offsetWidth;
                (flash as HTMLElement).style.animation = 'flashEffect 0.3s ease-out';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
        }
    };

    return (
        <div className="flex-1 relative flex flex-col justify-center items-center bg-radial-app overflow-hidden">
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
            
            {/* Background Characters */}
            <BackgroundCharacters tomo={tomo} />
            
            <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none">
                <div className="text-5xl font-black mb-2 drop-shadow-[0_0_20px_rgba(108,92,231,0.5)]">
                    <span className="text-text-secondary text-2xl mr-2">とも:</span>
                    <span className="text-white">{tomo.toLocaleString()}</span>
                </div>
                <div className="text-xl text-text-secondary">
                    per second: {production.toFixed(1)}
                </div>
            </div>

            <div className="relative z-10">
                <div 
                    ref={imageWrapperRef}
                    className="relative w-[clamp(250px,45vmin,400px)] h-[clamp(250px,45vmin,400px)] cursor-pointer select-none transition-transform active:scale-95 hover:scale-105"
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="button"
                    aria-label="Click to get Tomo"
                >
                    {/* Glow Ring */}
                    <div className="absolute -inset-4 rounded-3xl bg-glow-conic opacity-50 blur-xl animate-rotate-glow -z-20" />
                    
                    {/* White Background (Square with rounded corners) */}
                    <div className="absolute inset-0 rounded-[40px] bg-white/90 scale-105 -z-10 shadow-[0_0_30px_rgba(255,255,255,0.4)]" />

                    {/* Pulse Ring */}
                    <div className="pulse-ring absolute -inset-2 rounded-[20px] border-2 border-accent-3 opacity-0 pointer-events-none" />
                    
                    <img 
                        src="/image/image.png" 
                        alt="Character" 
                        className="w-full h-full object-contain rounded-2xl drop-shadow-[0_0_15px_rgba(108,92,231,0.4)] pointer-events-none"
                        draggable={false}
                    />
                    
                    {/* Flash Effect */}
                    <div className="click-effect absolute inset-0 rounded-2xl bg-white/60 opacity-0 pointer-events-none" />
                </div>
            </div>
            
            <style>{`
                @keyframes flashEffect {
                    0% { opacity: 0.6; }
                    100% { opacity: 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(var(--scale)); }
                    50% { transform: translateY(-10px) scale(var(--scale)); }
                }
            `}</style>
        </div>
    );
};
