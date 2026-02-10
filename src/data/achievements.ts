import { AchievementData } from '../core/Entity';

export const achievementsData: AchievementData[] = [
    {
        id: 'first_tomo',
        name: 'はじめてのとも',
        description: '「とも」を1つ手に入れる。',
        condition: (game) => game.totalTomo >= 1
    },
    {
        id: 'tomodachi_recruit',
        name: 'ともだち募集中',
        description: '「ともだち」を1人増やす。',
        condition: (game) => game.getBuildingCount('tomodachi') >= 1
    },
    {
        id: 'circle_of_tomo',
        name: 'ともの輪',
        description: '累計で100「とも」を集める。',
        condition: (game) => game.totalTomo >= 100
    },
    {
        id: 'popular',
        name: '人気者',
        description: '累計で1,000「とも」を集める。',
        condition: (game) => game.totalTomo >= 1000
    },
    {
        id: 'influencer',
        name: 'インフルエンサー',
        description: 'SNS拡散を10回行う。',
        condition: (game) => game.getBuildingCount('sns_post') >= 10
    }
];
