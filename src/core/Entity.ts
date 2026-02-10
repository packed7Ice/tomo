export interface BuildingData {
    id: string;
    name: string;
    description: string;
    baseCost: number;
    baseProduction: number; // production per second
}

export class Building {
    public count: number = 0;

    constructor(public data: BuildingData) {}

    get currentCost(): number {
        return Math.floor(this.data.baseCost * Math.pow(1.15, this.count));
    }

    get totalProduction(): number {
        return this.data.baseProduction * this.count;
    }

    buy(): boolean {
        this.count++;
        return true;
    }
}

export interface AchievementData {
    id: string;
    name: string;
    description: string;
    condition: (game: any) => boolean; // Using 'any' for Game instance to avoid circular dependency for now, or define interface
}

export class Achievement {
    public unlocked: boolean = false;

    constructor(public data: AchievementData) {}

    check(game: any): boolean {
        if (this.unlocked) return false;
        if (this.data.condition(game)) {
            this.unlocked = true;
            return true;
        }
        return false;
    }
}
