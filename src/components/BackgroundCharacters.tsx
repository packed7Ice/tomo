import React, { useMemo } from 'react';

interface Props {
    tomo: number;
}

export const BackgroundCharacters: React.FC<Props> = ({ tomo }) => {
    // Increase count based on tomo (logarithmic scale)
    // 0 -> 0
    // 100 -> ~10
    // 10000 -> ~40
    // 1M -> ~100
    // Max 200 items
    const count = Math.min(Math.floor(Math.log10(tomo + 1) * 20), 200);

    // Generate stable random positions based on index
    // We use useMemo to ensure positions don't change for existing items when count increases
    const characters = useMemo(() => {
        return Array.from({ length: 200 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 90 + 5}%`, // 5% to 95%
            // Bias top position towards bottom (higher percentage)
            // Using power logic to push towards 100%
            top: `${100 - (Math.pow(Math.random(), 3) * 90 + 5)}%`, 
            scale: 0.3 + Math.random() * 0.4,
            rotation: (Math.random() - 0.5) * 60,
            delay: Math.random() * 2
        }));
    }, []);

    const visibleCharacters = characters.slice(0, count);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {visibleCharacters.map(char => (
                <div
                    key={char.id}
                    className="absolute w-16 h-16 flex items-center justify-center transition-all duration-1000 ease-out"
                    style={{
                        left: char.left,
                        top: char.top,
                        transform: `scale(${char.scale}) rotate(${char.rotation}deg)`,
                        opacity: 1 // Ensure they are visible
                    }}
                >
                    {/* White Background (Rounded Square) */}
                    <div className="absolute inset-0 bg-white/80 rounded-[16px] shadow-sm" />
                    
                    {/* Character Image */}
                    <img 
                        src={import.meta.env.BASE_URL + 'image/image.png'}
                        alt="" 
                        className="relative w-12 h-12 object-contain z-10"
                    />
                </div>
            ))}
        </div>
    );
};
