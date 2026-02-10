
import React, { useEffect, useState } from 'react';
import { useGame } from '../hooks/useGame';

export const StatisticsPane: React.FC = () => {
    const { game } = useGame();
    const [, setTick] = useState(0);

    // Refresh every second to update play time etc.
    useEffect(() => {
        const interval = setInterval(() => {
            setTick(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num: number) => {
        return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
    };

    const formatTime = (ms: number) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)));

        if (hours > 0) return `${hours}時間${minutes}分${seconds}秒`;
        if (minutes > 0) return `${minutes}分${seconds}秒`;
        return `${seconds}秒`;
    };

    if (!game) return null;

    return (
        <div className="space-y-6 text-gray-800 dark:text-gray-200 p-2">
            <div>
                <h3 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-2 mb-3">
                    基本統計
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-500 dark:text-gray-400">累計クリック数</div>
                    <div className="text-right font-mono">{formatNumber(game.totalClicks)} 回</div>

                    <div className="text-gray-500 dark:text-gray-400">プレイ時間</div>
                    <div className="text-right font-mono">{formatTime(game.playTime)}</div>

                    <div className="text-gray-500 dark:text-gray-400">ゲーム開始日時</div>
                    <div className="text-right font-mono">{new Date(game.startTime).toLocaleString()}</div>

                    <div className="text-gray-500 dark:text-gray-400">セーブ日時</div>
                    <div className="text-right font-mono">{new Date(game.lastSaveTime).toLocaleString()}</div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-2 mb-3">
                    「とも」統計
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-500 dark:text-gray-400">現在所持とも</div>
                    <div className="text-right font-mono text-pink-500 font-bold">{formatNumber(game.tomo)}</div>

                    <div className="text-gray-500 dark:text-gray-400">最大所持とも</div>
                    <div className="text-right font-mono">{formatNumber(game.maxTomo)}</div>

                    <div className="text-gray-500 dark:text-gray-400">累計獲得とも</div>
                    <div className="text-right font-mono">{formatNumber(game.totalTomo)}</div>
                    
                    <div className="col-span-2 border-t border-gray-200 dark:border-gray-800 my-1"></div>

                    <div className="text-gray-500 dark:text-gray-400">クリックによる獲得</div>
                    <div className="text-right font-mono">{formatNumber(game.clickTomo)}</div>

                    <div className="text-gray-500 dark:text-gray-400">建造物による獲得</div>
                    <div className="text-right font-mono">{formatNumber(game.buildingTomo)}</div>
                    
                    <div className="text-gray-500 dark:text-gray-400">秒間生産量 (TkPS)</div>
                    <div className="text-right font-mono">{formatNumber(game.getProductionPerSecond())}</div>
                </div>
            </div>

             <div>
                <h3 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-2 mb-3">
                    建造物内訳
                </h3>
                <div className="space-y-2 text-sm">
                    {game.buildings.filter(b => b.count > 0).map(b => (
                         <div key={b.data.id} className="flex justify-between items-center">
                            <span>{b.data.name} <span className="text-xs text-gray-500">x{b.count}</span></span>
                            <span className="font-mono text-gray-600 dark:text-gray-400">
                                {formatNumber(b.totalProduction)} /秒
                            </span>
                        </div>
                    ))}
                    {game.buildings.every(b => b.count === 0) && (
                        <div className="text-center text-gray-400 py-2">建造物はまだありません</div>
                    )}
                </div>
            </div>
        </div>
    );
};
