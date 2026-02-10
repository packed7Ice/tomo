import os
import shutil
import glob
import json

SOURCE_DIR = "とものもと"
DEST_DIR = "public/audio"

def update_audio():
    if not os.path.exists(SOURCE_DIR):
        print(f"Source directory '{SOURCE_DIR}' not found.")
        return

    if os.path.exists(DEST_DIR):
        shutil.rmtree(DEST_DIR)
    
    os.makedirs(DEST_DIR)
    
    wav_files = glob.glob(os.path.join(SOURCE_DIR, "*.wav"))
    copied_files = []
    
    print(f"Found {len(wav_files)} wav files.")
    
    for file_path in wav_files:
        filename = os.path.basename(file_path)
        dest_path = os.path.join(DEST_DIR, filename)
        shutil.copy2(file_path, dest_path)
        copied_files.append(filename)
        print(f"Copied: {filename}")
        
    print(f"\nTotal copied: {len(copied_files)}")
    
    # Generate array string for TS
    ts_array = json.dumps(copied_files, ensure_ascii=False)
    print("\nFile list for AudioSystem.ts:")
    print(ts_array)

if __name__ == "__main__":
    update_audio()
