import os, shutil, glob

src = os.path.join(os.path.dirname(os.path.abspath(__file__)), "とものもと")
dst = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio")
os.makedirs(dst, exist_ok=True)

wavs = glob.glob(os.path.join(src, "**", "*.wav"), recursive=True)
for i, f in enumerate(wavs, 1):
    dest = os.path.join(dst, f"{i}.wav")
    shutil.copy2(f, dest)
    print(f"{i}: {os.path.basename(f)}")

print(f"\nTotal: {len(wavs)} files copied to audio/")
