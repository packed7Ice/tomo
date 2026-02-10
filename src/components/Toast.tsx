import React, { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import { Achievement } from '../core/Entity';

interface ToastItem {
    id: number;
    message: string;
    type: 'info' | 'achievement';
}

export const Toast: React.FC = () => {
    const { setAchievementCallback, setSaveCallback } = useGame();
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const [counter, setCounter] = useState(0);

    const addToast = (message: string, type: 'info' | 'achievement' = 'info') => {
        const id = counter;
        setCounter(c => c + 1);
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    useEffect(() => {
        setAchievementCallback((ach: Achievement) => {
            addToast(`実績解除: ${ach.data.name}`, 'achievement');
        });
        
        setSaveCallback(() => {
            addToast('データを保存しました', 'info');
        });
        
        // Initial welcome
        // We can't easily check 'if game.tomo === 0' here inside effect without dep, 
        // effectively runs once on mount.
        setTimeout(() => {
            // Simple check or just always show on load? Maybe annoying.
            // Let's skip for now or make it state based in App.
        }, 1000);
    }, [setAchievementCallback]);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 pointer-events-none w-max">
            {toasts.map(toast => (
                <div 
                    key={toast.id}
                    className={`
                        animate-fade-slide-up bg-bg-panel/90 backdrop-blur border rounded-lg px-5 py-3 
                        flex items-center gap-3 text-white shadow-lg
                        ${toast.type === 'achievement' 
                            ? 'border-yellow-400 bg-yellow-900/80' 
                            : 'border-accent-2'
                        }
                    `}
                >
                    <span className="text-2xl">
                        {toast.type === 'achievement' ? '🏆' : 'ℹ️'}
                    </span>
                    <span className="font-bold text-sm">
                        {toast.message}
                    </span>
                </div>
            ))}
        </div>
    );
};
