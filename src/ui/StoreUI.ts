import { Game } from '../core/Game';
import { Building } from '../core/Entity';

export class StoreUI {
    private container: HTMLElement;
    private game: Game;
    
    constructor(game: Game, rootElement: HTMLElement) {
        this.game = game;
        this.container = rootElement;
        
        this.render();
        this.startUpdateLoop();
    }
    
    private render() {
        this.container.innerHTML = `
            <div class="store-header">
                <h2>ストア</h2>
                <button id="reset-btn" class="reset-btn">リセット</button>
            </div>
            <div class="building-list" id="building-list">
                <!-- Buildings go here -->
            </div>
        `;
        
        this.renderBuildings();
        
        const resetBtn = this.container.querySelector('#reset-btn');
        resetBtn?.addEventListener('click', () => {
            if (confirm('本当にリセットしますか？')) {
                this.game.reset();
            }
        });
    }
    
    private renderBuildings() {
        const list = this.container.querySelector('#building-list')!;
        list.innerHTML = '';
        
        this.game.buildings.forEach(building => {
            const item = document.createElement('div');
            item.className = 'building-item';
            item.id = `building-${building.data.id}`;
            item.innerHTML = this.getBuildingHTML(building);
            
            item.addEventListener('click', () => {
                if (this.game.buyBuilding(building.data.id)) {
                    this.updateBuildings();
                }
            });
            
            list.appendChild(item);
        });
    }
    
    private getBuildingHTML(building: Building): string {
        const canBuy = this.game.tomo >= building.currentCost;
        return `
            <div class="building-info">
                <div class="building-name">${building.data.name}</div>
                <div class="building-cost ${canBuy ? 'affordable' : 'expensive'}">
                    💎 ${building.currentCost.toLocaleString()}
                </div>
            </div>
            <div class="building-count">${building.count}</div>
            <div class="building-desc">${building.data.description}</div>
        `;
    }
    
    private updateBuildings() {
        this.game.buildings.forEach(building => {
            const el = this.container.querySelector(`#building-${building.data.id}`);
            if (el) {
                // Determine if we should re-render or just update classes
                // Simple re-render of content is safer for state
                const canBuy = this.game.tomo >= building.currentCost;
                const costEl = el.querySelector('.building-cost')!;
                costEl.className = `building-cost ${canBuy ? 'affordable' : 'expensive'}`;
                costEl.innerHTML = `💎 ${building.currentCost.toLocaleString()}`;
                
                const countEl = el.querySelector('.building-count')!;
                countEl.textContent = building.count.toString();
                
                if (canBuy) {
                    el.classList.add('can-buy');
                } else {
                    el.classList.remove('can-buy');
                }
            }
        });
    }
    
    private startUpdateLoop() {
        setInterval(() => this.updateBuildings(), 200);
    }
}
