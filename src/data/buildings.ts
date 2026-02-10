import { BuildingData } from '../core/Entity';

export const buildingsData: BuildingData[] = [
    {
        id: 'tomodachi',
        name: 'ともだち',
        description: 'あなたのことを少しだけ広めてくれる友達。',
        baseCost: 15,
        baseProduction: 0.1
    },
    {
        id: 'sns_post',
        name: 'SNS拡散',
        description: 'インターネットの力で「とも」を集める。',
        baseCost: 100,
        baseProduction: 1
    },
    {
        id: 'fan_club',
        name: 'ファンクラブ',
        description: '熱狂的なファンたちが自発的に布教してくれる。',
        baseCost: 1100,
        baseProduction: 8
    },
    {
        id: 'live_event',
        name: 'ライブ開催',
        description: '大規模なライブで一気に知名度アップ！',
        baseCost: 12000,
        baseProduction: 47
    },
    {
        id: 'media_appearance',
        name: 'メディア出演',
        description: 'テレビや雑誌に出て全国区へ。',
        baseCost: 130000,
        baseProduction: 260
    },
    {
        id: 'world_tour',
        name: 'ワールドツアー',
        description: '世界中に「とも」の輪を広げる。',
        baseCost: 1400000,
        baseProduction: 1400
    },
    {
        id: 'office',
        name: 'オフィス',
        description: '会社を設立して組織的に「とも」を集める。',
        baseCost: 20000000, // 20M
        baseProduction: 7500
    },
    {
        id: 'factory',
        name: 'とも工場',
        description: '「とも」を大量生産する最先端工場。',
        baseCost: 330000000, // 330M
        baseProduction: 44000
    },
    {
        id: 'city',
        name: 'ともシティ',
        description: '「とも」が溢れる理想郷のような都市。',
        baseCost: 5100000000, // 5.1B
        baseProduction: 260000
    },
    {
        id: 'country',
        name: 'とも共和国',
        description: '国家予算レベルで「とも」を運用する。',
        baseCost: 75000000000, // 75B
        baseProduction: 1600000
    },
    {
        id: 'planet',
        name: 'ともプラネット',
        description: '星ごと「とも」色に染める。',
        baseCost: 1000000000000, // 1T
        baseProduction: 10000000
    },
    {
        id: 'galaxy',
        name: 'ともギャラクシー',
        description: '銀河系あまねく「とも」が響き渡る。',
        baseCost: 14000000000000, // 14T
        baseProduction: 65000000
    }
];
