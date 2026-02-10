export class AudioSystem {
    private audioPool: HTMLAudioElement[] = [];
    private currentAudio: HTMLAudioElement | null = null;
    private readonly TOTAL_AUDIO = 22;
    private lastPlayedIndex = -1;

    constructor() {
        this.init();
    }

    private init() {
        for (let i = 1; i <= this.TOTAL_AUDIO; i++) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = `/audio/${i}.wav`;
            this.audioPool.push(audio);
        }
    }

    public playRandom() {
        // Stop currently playing
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }

        const idx = this.getRandomIndex();
        const audio = this.audioPool[idx];
        
        if (!audio) return;

        audio.currentTime = 0;
        this.currentAudio = audio;

        audio.play().catch(err => {
            console.warn('Audio play failed:', err);
        });

        return idx; // Return index for potential visual sync
    }

    private getRandomIndex(): number {
        if (this.TOTAL_AUDIO <= 1) return 0;
        let idx;
        do {
            idx = Math.floor(Math.random() * this.TOTAL_AUDIO);
        } while (idx === this.lastPlayedIndex);
        this.lastPlayedIndex = idx;
        return idx;
    }
}
