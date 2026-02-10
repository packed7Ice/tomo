import { useState, useEffect, useCallback, useRef } from 'react';
import { Game } from '../core/Game';
import { Achievement } from '../core/Entity';

// Singleton Game instance
const gameInstance = new Game();

export const useGame = () => {
    // We use a dummy state to force re-render
    const [, setTick] = useState(0);
    const lastUpdateRef = useRef(0);

    useEffect(() => {
        // Subscribe to game updates
        const handleUpdate = () => {
             // Throttling UI updates to 30fps to avoid excessive react renders
            const now = performance.now();
            if (now - lastUpdateRef.current > 33) {
                setTick(t => t + 1);
                lastUpdateRef.current = now;
            }
        };

        // We need to modify Game class to allow multiple listeners or specific listener for React
        // For now, we hijack the onTomoUpdate. Ideally Game should implement an event emitter.
        // Let's hook into the existing callback but chain it if it exists (though here we are the main UI)
        
        const originalOnUpdate = gameInstance.onTomoUpdate;
        gameInstance.onTomoUpdate = (tomo, total) => {
            if (originalOnUpdate) originalOnUpdate(tomo, total);
            handleUpdate();
        };

        const onUnlock = () => {
             setTick(t => t + 1);
        };
        gameInstance.addAchievementListener(onUnlock);

        return () => {
            gameInstance.onTomoUpdate = originalOnUpdate;
            gameInstance.removeAchievementListener(onUnlock);
        };
    }, []);

    // For specific actions
    const click = useCallback(() => {
        gameInstance.click();
        // Instant update on click for responsiveness
        setTick(t => t + 1); 
    }, []);

    const buyBuilding = useCallback((id: string) => {
        const success = gameInstance.buyBuilding(id);
        if (success) {
            setTick(t => t + 1);
        }
        return success;
    }, []);
    
    const reset = useCallback(() => {
        gameInstance.reset();
    }, []);

    const setAchievementCallback = useCallback((callback: (ach: Achievement) => void) => {
        gameInstance.addAchievementListener(callback);
        return () => gameInstance.removeAchievementListener(callback);
    }, []);

    const setSaveCallback = useCallback((callback: () => void) => {
        gameInstance.onSave = callback;
    }, []);

    const setAudioMode = useCallback((mode: 'random' | 'fixed', filename?: string) => {
        gameInstance.setAudioMode(mode, filename);
    }, []);

    return {
        game: gameInstance,
        tomo: Math.floor(gameInstance.tomo), // Return integers for display
        totalTomo: Math.floor(gameInstance.totalTomo),
        production: gameInstance.getProductionPerSecond(),
        audioFilenames: gameInstance.getAudioFilenames(),
        click,
        buyBuilding,
        reset,
        setAchievementCallback,
        setSaveCallback,
        setAudioMode,
        volume: gameInstance.getVolume(),
        setVolume: (v: number) => {
             gameInstance.setVolume(v);
             // Force update ?? setTick?
             // Volume change doesn't need immediate UI re-render unless we show slider value dragging
             // But valid use case.
             setTick(t => t + 1);
        }
    };
};
