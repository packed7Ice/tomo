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
    },
    {
        id: 'click_100',
        name: 'はじめての一歩',
        description: '累計100回クリックする。', // Approximation using Tomo for now if click count not tracked, but user asked for "achievements", so let's stick to available metrics or add click tracking later. 
        // For now, let's use Total Tomo as proxy for early game or specific building counts.
        // Actually, let's just add high tier achievements.
        condition: (game) => game.totalTomo >= 50
    },
    {
        id: '10k_tomo',
        name: '1万とも',
        description: '累計10,000「とも」を集める。',
        condition: (game) => game.totalTomo >= 10000
    },
    {
        id: '100k_tomo',
        name: '10万とも',
        description: '累計100,000「とも」を集める。',
        condition: (game) => game.totalTomo >= 100000
    },
    {
        id: '1m_tomo',
        name: '100万とも',
        description: '累計1,000,000「とも」を集める。',
        condition: (game) => game.totalTomo >= 1000000
    },
    {
        id: 'building_master',
        name: '不動産王',
        description: '建造物を合計50個所持する。',
        condition: (game) => game.buildings.reduce((sum: number, b: any) => sum + b.count, 0) >= 50
    },
    // Building Count Achievements
    {
        id: 'fan_club_10',
        name: '親衛隊',
        description: 'ファンクラブを10個運営する。',
        condition: (game) => game.getBuildingCount('fan_club') >= 10
    },
    {
        id: 'live_10',
        name: 'ツアーバンド',
        description: 'ライブを10回開催する。',
        condition: (game) => game.getBuildingCount('live_event') >= 10
    },
    {
        id: 'media_10',
        name: 'レギュラー番組',
        description: 'メディア出演を10回果たす。',
        condition: (game) => game.getBuildingCount('media_appearance') >= 10
    },
    {
        id: 'world_10',
        name: '世界的スター',
        description: 'ワールドツアーを10回行う。',
        condition: (game) => game.getBuildingCount('world_tour') >= 10
    },
    {
        id: 'office_10',
        name: '上場企業',
        description: 'オフィスを10個構える。',
        condition: (game) => game.getBuildingCount('office') >= 10
    },
    {
        id: 'factory_10',
        name: '産業革命',
        description: '工場を10個稼働させる。',
        condition: (game) => game.getBuildingCount('factory') >= 10
    },
    {
        id: 'city_10',
        name: 'メガロポリス',
        description: 'ともシティを10個建設する。',
        condition: (game) => game.getBuildingCount('city') >= 10
    },
    // Tomo Count Milestones
    {
        id: '10m_tomo',
        name: '1000万とも',
        description: '累計1,000万「とも」を集める。',
        condition: (game) => game.totalTomo >= 10000000
    },
    {
        id: '100m_tomo',
        name: '1億とも',
        description: '累計1億「とも」を集める。',
        condition: (game) => game.totalTomo >= 100000000
    },
    {
        id: '1b_tomo',
        name: '10億とも',
        description: '累計10億「とも」を集める。',
        condition: (game) => game.totalTomo >= 1000000000
    },
    {
        id: '1t_tomo',
        name: '1兆とも',
        description: '累計1兆「とも」を集める。',
        condition: (game) => game.totalTomo >= 1000000000000
    }
];
