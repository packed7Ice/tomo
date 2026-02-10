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
    // Click Achievements
    {
        id: 'click_100',
        name: 'はじめての一歩',
        description: '累計100回クリックする。',
        condition: (game) => game.totalClicks >= 100
    },
    {
        id: 'click_1000',
        name: '連打の鬼',
        description: '累計1,000回クリックする。',
        condition: (game) => game.totalClicks >= 1000
    },
    {
        id: 'click_10000',
        name: '指が痛い',
        description: '累計10,000回クリックする。',
        condition: (game) => game.totalClicks >= 10000
    },
    
    // Play Time Achievements
    {
        id: 'play_1h',
        name: 'ともの虜',
        description: 'プレイ時間が1時間を超える。',
        condition: (game) => game.playTime >= 3600000 // 1 hour in ms
    },
    {
        id: 'play_24h',
        name: 'ともの住人',
        description: 'プレイ時間が24時間を超える。',
        condition: (game) => game.playTime >= 86400000 // 24 hours in ms
    },

    // Tomo Milestones
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

    // New Building Count Achievements
    {
        id: 'influencer_10',
        name: 'カリスマ講師',
        description: 'インフルエンサー塾を10個運営する。',
        condition: (game) => game.getBuildingCount('influencer_school') >= 10
    },
    {
        id: 'fan_club_10',
        name: '親衛隊',
        description: 'ファンクラブを10個運営する。',
        condition: (game) => game.getBuildingCount('fan_club') >= 10
    },
    {
        id: 'merch_10',
        name: '完売御礼',
        description: '公式グッズショップを10店舗展開する。',
        condition: (game) => game.getBuildingCount('merch_store') >= 10
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
        id: 'theme_park_10',
        name: '夢の国',
        description: 'テーマパークを10個建設する。',
        condition: (game) => game.getBuildingCount('theme_park') >= 10
    },
    {
        id: 'world_10',
        name: '世界的スター',
        description: 'ワールドツアーを10回行う。',
        condition: (game) => game.getBuildingCount('world_tour') >= 10
    },
    {
        id: 'satellite_10',
        name: '宇宙通信',
        description: 'とも衛星を10基打ち上げる。',
        condition: (game) => game.getBuildingCount('satellite') >= 10
    },
    {
        id: 'office_10',
        name: '上場企業',
        description: 'オフィスを10個構える。',
        condition: (game) => game.getBuildingCount('office') >= 10
    },
    {
        id: 'moon_base_10',
        name: '月面都市',
        description: '月面基地を10個建設する。',
        condition: (game) => game.getBuildingCount('moon_base') >= 10
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
    },
    {
        id: '1q_tomo',
        name: '1京とも',
        description: '累計1京「とも」を集める。',
        condition: (game) => game.totalTomo >= 10000000000000000
    }
];
