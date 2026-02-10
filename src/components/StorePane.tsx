import React from 'react';
import { useGame } from '../hooks/useGame';
import { BuildingItem } from './BuildingItem';

export const StorePane: React.FC = () => {
    const { game, tomo, buyBuilding, reset } = useGame();

    const handleReset = () => {
        if (confirm('本当にリセットしますか？')) {
            reset();
        }
    };

    return (
        <div className="w-full md:w-[350px] flex flex-col bg-bg-secondary border-t md:border-t-0 md:border-l border-white/10 z-20 h-[40vh] md:h-full">
            <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center shrink-0">
                <h2 className="text-lg text-accent-2 font-bold">ストア</h2>
                <button 
                    onClick={handleReset}
                    className="btn-reset"
                >
                    リセット
                </button>
            </div>
            
            <div className="flex-1 pane-scroll p-4 flex flex-col gap-3">
                {game.buildings.map(building => (
                    <BuildingItem
                        key={building.data.id}
                        building={building}
                        canBuy={tomo >= building.currentCost}
                        onBuy={() => buyBuilding(building.data.id)}
                    />
                ))}
            </div>
        </div>
    );
};
