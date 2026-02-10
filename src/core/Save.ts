import { Building, Achievement } from './Entity';

export interface GameSaveData {
    tomo: number;
    totalTomo: number;
    buildings: { [id: string]: number };
    achievements: { [id: string]: boolean };
    startTime: number;
    lastSaveTime: number;
}

const STORAGE_KEY = 'tomo_clicker_save';

export class SaveSystem {
    static save(data: GameSaveData) {
        try {
            const json = JSON.stringify(data);
            localStorage.setItem(STORAGE_KEY, json);
            console.log('Game saved');
        } catch (e) {
            console.error('Failed to save game', e);
        }
    }

    static load(): GameSaveData | null {
        try {
            const json = localStorage.getItem(STORAGE_KEY);
            if (!json) return null;
            return JSON.parse(json);
        } catch (e) {
            console.error('Failed to load game', e);
            return null;
        }
    }

    static reset() {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}
