$srcDir = "c:\Users\zutuu\Documents\GitHub\tomo\とものもと"
$dstDir = "c:\Users\zutuu\Documents\GitHub\tomo\audio"

New-Item -ItemType Directory -Path $dstDir -Force | Out-Null

$wavFiles = Get-ChildItem -Path $srcDir -Recurse -Filter "*.wav"
$i = 1
foreach ($f in $wavFiles) {
    $dstPath = Join-Path $dstDir "$i.wav"
    Copy-Item -Path $f.FullName -Destination $dstPath -Force
    Write-Host "$i : $($f.Name)"
    $i++
}
Write-Host "Total: $($wavFiles.Count) files copied"
