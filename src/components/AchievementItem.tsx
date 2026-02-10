import React from 'react';
import { Achievement } from '../core/Entity';

interface Props {
    achievement: Achievement;
}

export const AchievementItem: React.FC<Props> = ({ achievement }) => {
    const { unlocked, data } = achievement;
    
    return (
        <div className={`
            p-3 rounded-lg border flex items-center gap-3 transition-all
            ${unlocked 
                ? 'bg-accent-1/10 border-accent-1/30 text-text-primary' 
                : 'bg-black/20 border-white/5 text-text-muted opacity-60'
            }
        `}>
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-xl
                ${unlocked ? 'bg-accent-1/20 text-accent-1' : 'bg-black/40 text-white/20'}
            `}>
                {unlocked ? '🏆' : '?'}
            </div>
            
            <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-sm ${unlocked ? 'text-accent-1' : 'text-text-muted'}`}>
                    {unlocked ? data.name : '???'}
                </h3>
                <p className="text-xs text-text-muted truncate">
                    {unlocked ? data.description : '条件未達成'}
                </p>
            </div>
        </div>
    );
};
