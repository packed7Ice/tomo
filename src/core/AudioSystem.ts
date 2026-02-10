export class AudioSystem {
    private pool: Map<string, HTMLAudioElement> = new Map();
    private currentAudio: HTMLAudioElement | null = null;
    private lastPlayedIndex = -1;
    
    private mode: 'random' | 'fixed' = 'random';
    private fixedFilename: string | null = null;
    private volume: number = 0.5; // Default volume 50%

    public readonly filenames = [
        "D班2回生の.wav",
        "D班2回生差分.wav",
        "original.wav",
        "tomo_tomo_collection4.wav",
        "あ〜.wav",
        "ありがとうございました.wav",
        "えっ.wav",
        "お疲れ様です.wav",
        "お疲れ様です2.wav",
        "お願いします.wav",
        "かにしゃぶ.wav",
        "ではどうぞ.wav",
        "とりあえず.wav",
        "なんだっけ.wav",
        "はい！.wav",
        "やばいっす.wav",
        "やりますかぁ.wav",
        "よし.wav",
        "今私は何を.wav",
        "何をしているんですか.wav",
        "嘘の情報を.wav",
        "笑.wav",
        "録音できました.wav"
    ];

    constructor() {
        this.initPool();
    }

    private initPool() {
        this.filenames.forEach(filename => {
            const audio = new Audio();
            audio.preload = 'auto';
            // Encode filename for URL
            audio.src = `/audio/${encodeURIComponent(filename)}`;
            audio.volume = this.volume;
            
            // Debug loading
            audio.onerror = (e) => console.error(`Failed to load audio: ${filename}`, e);
            
            this.pool.set(filename, audio);
        });
    }

    public setMode(mode: 'random' | 'fixed', filename?: string) {
        this.mode = mode;
        if (mode === 'fixed' && filename) {
            this.fixedFilename = filename;
        } else {
            this.fixedFilename = null;
        }
    }

    public setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.pool.forEach(audio => {
            audio.volume = this.volume;
        });
    }

    public getVolume(): number {
        return this.volume;
    }

    public play() {
        if (this.pool.size === 0) return;

        let audio: HTMLAudioElement | undefined;
        let idx = -1;

        if (this.mode === 'fixed' && this.fixedFilename) {
            audio = this.pool.get(this.fixedFilename);
            if (!audio) {
                console.warn(`Fixed audio not found: ${this.fixedFilename}, falling back to random`);
                this.mode = 'random'; // Fallback
            }
        }

        if (!audio || this.mode === 'random') {
             // Random logic
             const keys = Array.from(this.pool.keys());
             if (keys.length <= 1) {
                 idx = 0;
             } else {
                 do {
                     idx = Math.floor(Math.random() * keys.length);
                 } while (idx === this.lastPlayedIndex);
             }
             this.lastPlayedIndex = idx;
             audio = this.pool.get(keys[idx]);
        }

        if (!audio) return;

        // Stop current
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }

        // Play new
        this.currentAudio = audio;
        audio.currentTime = 0;
        audio.play().catch(e => console.warn('Audio play failed', e));

        audio.onended = () => {
            if (this.currentAudio === audio) {
                this.currentAudio = null;
            }
        };
    }
}
