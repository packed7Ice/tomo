import React, { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { BuildingItem } from './BuildingItem';
import { AchievementItem } from './AchievementItem';

export const StorePane: React.FC = () => {
    const { game, tomo, buyBuilding, reset, audioFilenames, setAudioMode, setVolume, volume } = useGame();
    const [activeTab, setActiveTab] = useState<'store' | 'achievements'>('store');

    const handleReset = () => {
        if (confirm('本当にリセットしますか？')) {
            reset();
        }
    };

    return (
        <div className="w-full md:w-[450px] flex flex-col bg-bg-secondary border-t md:border-t-0 md:border-l border-white/10 z-20 h-[40vh] md:h-full">
            <div className="shrink-0 bg-black/20 border-b border-white/10">
                {/* Tabs */}
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('store')}
                        className={`flex-1 py-3 text-sm font-bold transition-colors ${
                            activeTab === 'store' 
                            ? 'bg-accent-1/10 text-accent-1 border-b-2 border-accent-1' 
                            : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                        }`}
                    >
                        ストア
                    </button>
                    <button
                        onClick={() => setActiveTab('achievements')}
                        className={`flex-1 py-3 text-sm font-bold transition-colors ${
                            activeTab === 'achievements' 
                            ? 'bg-accent-1/10 text-accent-1 border-b-2 border-accent-1' 
                            : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                        }`}
                    >
                        実績
                    </button>
                </div>

                {/* Controls (Reset / Audio) */}
                <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-text-muted font-bold">
                            {activeTab === 'store' ? 'アイテム購入' : '実績リスト'}
                        </h2>
                        <button 
                            onClick={handleReset}
                            className="btn-reset"
                        >
                            リセット
                        </button>
                    </div>
                    
                    {/* Audio Selector */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-text-muted font-bold">音声設定</label>
                        <select 
                            className="w-full bg-bg-primary border border-white/20 rounded px-2 py-1 text-xs text-text-primary focus:outline-none focus:border-accent-1 mb-1"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === 'random') {
                                    setAudioMode('random');
                                } else {
                                    setAudioMode('fixed', val);
                                }
                            }}
                        >
                            <option value="random">🎵 ランダム再生</option>
                            {audioFilenames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        
                        <div className="flex items-center gap-2">
                             <span className="text-xs">🔊</span>
                             <input 
                                 type="range" 
                                 min="0" 
                                 max="1" 
                                 step="0.05"
                                 value={volume} 
                                 onChange={(e) => setVolume(parseFloat(e.target.value))}
                                 className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-accent-1 [&::-webkit-slider-thumb]:rounded-full"
                             />
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="flex-1 pane-scroll p-4 flex flex-col gap-3">
                {activeTab === 'store' ? (
                    game.buildings.map(building => (
                        <BuildingItem
                            key={building.data.id}
                            building={building}
                            canBuy={tomo >= building.currentCost}
                            onBuy={() => buyBuilding(building.data.id)}
                        />
                    ))
                ) : (
                    game.achievements.map(achievement => (
                        <AchievementItem
                            key={achievement.data.id}
                            achievement={achievement}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
