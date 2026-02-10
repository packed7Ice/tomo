import React from 'react';
import { Building } from '../core/Entity';

interface Props {
    building: Building;
    canBuy: boolean;
    onBuy: () => void;
}

export const BuildingItem: React.FC<Props> = ({ building, canBuy, onBuy }) => {
    return (
        <div 
            className={`
                relative p-3 rounded-lg border transition-all select-none
                ${canBuy 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer opacity-100' 
                    : 'bg-white/5 border-white/5 opacity-60 cursor-default'
                }
            `}
            onClick={() => canBuy && onBuy()}
        >
            <div className="flex justify-between items-center mb-1">
                <div className="font-bold text-base">{building.data.name}</div>
                <div className={`font-mono text-sm flex items-center gap-1.5 ${canBuy ? 'text-success' : 'text-warning'}`}>
                    <div className="bg-white/90 rounded p-0.5 shadow-sm">
                        <img src="image/image.png" alt="tomo" className="w-3.5 h-3.5 object-contain" />
                    </div>
                    {building.currentCost.toLocaleString()}
                </div>
            </div>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-black text-white/10 pointer-events-none">
                {building.count}
            </div>
            
            <div className="text-xs text-text-secondary pr-8 leading-snug">
                {building.data.description}
            </div>
        </div>
    );
};
