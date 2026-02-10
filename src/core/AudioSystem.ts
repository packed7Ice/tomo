export class AudioSystem {
    private pool: HTMLAudioElement[] = [];
    private currentAudio: HTMLAudioElement | null = null;
    private lastPlayedIndex = -1;

    constructor() {
        this.initPool();
    }

    private initPool() {
        const filenames = [
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

        filenames.forEach(filename => {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = `/audio/${filename}`;
            this.pool.push(audio);
        });
    }

    public playRandom() {
        if (this.pool.length <= 1) return;

        let idx: number;
        do {
            idx = Math.floor(Math.random() * this.pool.length);
        } while (idx === this.lastPlayedIndex);

        this.lastPlayedIndex = idx;
        const audio = this.pool[idx];
        
        // Stop current
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }

        // Play new
        this.currentAudio = audio;
        return idx;
    }
}
