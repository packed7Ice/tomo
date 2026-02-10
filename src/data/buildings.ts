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
    }
];
