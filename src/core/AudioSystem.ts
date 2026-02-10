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
            // Base URL (e.g., /tomo/) + audio/ + filename
            audio.src = `${import.meta.env.BASE_URL}audio/${encodeURIComponent(filename)}`;
            audio.volume = this.volume;
            
            // Debug loading
            audio.onerror = (e) => console.error(`Failed to load audio: ${filename} (src: ${audio.src})`, e);
            
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
             if (this.filenames.length <= 1) {
                 idx = 0;
             } else {
                 do {
                     idx = Math.floor(Math.random() * this.filenames.length);
                 } while (idx === this.lastPlayedIndex && this.filenames.length > 1);
             }
             this.lastPlayedIndex = idx;
             const key = this.filenames[idx];
             audio = this.pool.get(key);
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
        
        // Ensure volume is set (in case it was changed globally)
        audio.volume = this.volume;

        audio.play().catch(e => console.warn('Audio play failed', e));

        audio.onended = () => {
            if (this.currentAudio === audio) {
                this.currentAudio = null;
            }
        };
    }
}
