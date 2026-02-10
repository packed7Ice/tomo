import { Building, Achievement } from './Entity';
import { buildingsData } from '../data/buildings';
import { achievementsData } from '../data/achievements';
import { SaveSystem, GameSaveData } from './Save';
import { AudioSystem } from './AudioSystem';

export class Game {
    public tomo: number = 0;
    public totalTomo: number = 0;
    public buildings: Building[] = [];
    public achievements: Achievement[] = [];
    public startTime: number = Date.now();
    public lastSaveTime: number = Date.now();

    public audio: AudioSystem;
    private _lastTick: number = performance.now();
    private _autoSaveInterval: number = 30000; // 30 sec
    private _accumulatedTime: number = 0;
    
    // UI Callbacks
    public onTomoUpdate?: (tomo: number, total: number) => void;
    // public onAchievementUnlock?: (achievement: Achievement) => void; // Deprecated
    public onSave?: () => void;
    
    private achievementListeners: Set<(achievement: Achievement) => void> = new Set();
    
    public addAchievementListener(listener: (achievement: Achievement) => void) {
        this.achievementListeners.add(listener);
    }
    
    public removeAchievementListener(listener: (achievement: Achievement) => void) {
        this.achievementListeners.delete(listener);
    }

    // Statistics
    public totalClicks: number = 0;
    public maxTomo: number = 0;
    public clickTomo: number = 0;
    public buildingTomo: number = 0;
    public playTime: number = 0;

    constructor() {
        this.audio = new AudioSystem();
        this.initEntities();
        this.load();
        this.startLoop();
    }

    private initEntities() {
        this.buildings = buildingsData.map(data => new Building(data));
        this.achievements = achievementsData.map(data => new Achievement(data));
    }

    private startLoop() {
        const loop = (time: number) => {
            const dt = (time - this._lastTick) / 1000;
            this._lastTick = time;
            
            this.tick(dt);
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    private tick(dt: number) {
        // Production
        const production = this.getProductionPerSecond() * dt;
        if (production > 0) {
            this.addTomo(production, 'building');
        }

        // Auto Save & Play Time
        this.playTime += dt * 1000;
        this._accumulatedTime += dt * 1000;
        if (this._accumulatedTime >= this._autoSaveInterval) {
            this.save();
            this._accumulatedTime = 0;
        }

        // Check Achievements
        this.achievements.forEach(ach => {
            if (ach.check(this)) {
                this.achievementListeners.forEach(listener => listener(ach));
            }
        });
    }

    public click() {
        this.totalClicks++;
        this.addTomo(1, 'click');
        this.audio.play();
    }

    public addTomo(amount: number, source: 'click' | 'building' | 'other' = 'other') {
        this.tomo += amount;
        if (amount > 0) {
            this.totalTomo += amount;
            if (source === 'click') this.clickTomo += amount;
            if (source === 'building') this.buildingTomo += amount;
        }
        
        if (this.tomo > this.maxTomo) {
            this.maxTomo = this.tomo;
        }

        if (this.onTomoUpdate) this.onTomoUpdate(Math.floor(this.tomo), Math.floor(this.totalTomo));
    }

    public getProductionPerSecond(): number {
        return this.buildings.reduce((sum, b) => sum + b.totalProduction, 0);
    }
    
    // --- Audio Control ---
    public setAudioMode(mode: 'random' | 'fixed', filename?: string) {
        this.audio.setMode(mode, filename);
    }
    
    public getAudioFilenames(): string[] {
        return this.audio.filenames;
    }

    public setVolume(volume: number) {
        this.audio.setVolume(volume);
    }

    public getVolume(): number {
        return this.audio.getVolume();
    }

    public buyBuilding(buildingId: string): boolean {
        const building = this.buildings.find(b => b.data.id === buildingId);
        if (!building) return false;

        const cost = building.currentCost;
        if (this.tomo >= cost) {
            this.tomo -= cost;
            building.buy();
            this.save(); // Save on important action
            return true;
        }
        return false;
    }

    public getBuildingCount(buildingId: string): number {
        const building = this.buildings.find(b => b.data.id === buildingId);
        return building ? building.count : 0;
    }

    // --- Save/Load ---

    public save() {
        const data: GameSaveData = {
            tomo: this.tomo,
            totalTomo: this.totalTomo,
            buildings: {},
            achievements: {},
            startTime: this.startTime,
            lastSaveTime: Date.now(),
            // Stats
            totalClicks: this.totalClicks,
            maxTomo: this.maxTomo,
            clickTomo: this.clickTomo,
            buildingTomo: this.buildingTomo,
            playTime: this.playTime
        };

        this.buildings.forEach(b => data.buildings[b.data.id] = b.count);
        this.achievements.forEach(a => data.achievements[a.data.id] = a.unlocked);

        SaveSystem.save(data);
        if (this.onSave) this.onSave();
    }

    public load() {
        const data = SaveSystem.load();
        if (data) {
            this.tomo = data.tomo;
            this.totalTomo = data.totalTomo || 0; // Fallback for migration
            this.startTime = data.startTime || Date.now();
            
            // Load Stats with fallback
            this.totalClicks = data.totalClicks || 0;
            this.maxTomo = data.maxTomo || this.tomo;
            this.clickTomo = data.clickTomo || 0;
            this.buildingTomo = data.buildingTomo || 0;
            this.playTime = data.playTime || 0;
            
            if (data.buildings) {
                this.buildings.forEach(b => {
                    if (data.buildings[b.data.id]) {
                        b.count = data.buildings[b.data.id];
                    }
                });
            }

            if (data.achievements) {
                this.achievements.forEach(a => {
                    if (data.achievements[a.data.id]) {
                        a.unlocked = data.achievements[a.data.id];
                    }
                });
            }
        }
    }

    public reset() {
        SaveSystem.reset();
    }
}
