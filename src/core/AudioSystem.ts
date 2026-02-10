export class AudioSystem {
    private pool: Map<string, HTMLAudioElement> = new Map();
    private currentAudio: HTMLAudioElement | null = null;
    private lastPlayedIndex = -1;
    
    private mode: 'random' | 'fixed' = 'random';
    private fixedFilename: string | null = null;
    private volume: number = 0.5; // Default volume 50%

    // Load all audio files from assets using Vite's glob import
    // eager: true -> load immediately
    // import: 'default' -> get the URL string
    private audioModules = import.meta.glob('../assets/audio/*.wav', { eager: true, import: 'default' }) as Record<string, string>;

    public readonly filenames: string[] = [];

    constructor() {
        this.initPool();
    }

    private initPool() {
        // Clear existing
        this.filenames.length = 0;
        this.pool.clear();

        for (const path in this.audioModules) {
            // Extract filename from path (e.g., "../assets/audio/foo.wav" -> "foo.wav")
            const filename = path.split('/').pop() || "";
            if (!filename) continue;

            this.filenames.push(filename);

            const src = this.audioModules[path];
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = src; // Vite has already resolved this to the correct assets URL
            audio.volume = this.volume;
            
            // Debug loading
            audio.onerror = (e) => console.error(`Failed to load audio: ${filename} (src: ${src})`, e);
            
            this.pool.set(filename, audio);
        }
        
        // Sort filenames for consistency
        this.filenames.sort();
        console.log("AudioSystem initialized with:", this.filenames);
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
        if (this.pool.size === 0) {
            console.warn("No audio files loaded in pool");
            return;
        }

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

        const playPromise = audio.play();
        if (playPromise !== undefined) {
             playPromise.catch(e => {
                 console.warn('Audio play failed', e);
                 // User interaction requirement might trigger this
             });
        }

        audio.onended = () => {
            if (this.currentAudio === audio) {
                this.currentAudio = null;
            }
        };
    }
}
