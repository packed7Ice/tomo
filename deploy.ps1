
# エラーが発生したら停止
$ErrorActionPreference = "Stop"

Write-Host "Building project..."
npm run build

# distフォルダが存在することを確認
if (!(Test-Path -Path "dist")) {
    Write-Error "dist folder not found!"
    exit 1
}

# distフォルダに移動
Set-Location dist

Write-Host "Initializing git in dist..."
git init
git checkout -b gh-pages

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

Write-Host "Pushing to gh-pages..."
# リモートリポジトリのURLを設定（ユーザーの環境に合わせてhttpsを使用）
git remote add origin https://github.com/packed7Ice/tomo.git

# 強制プッシュ
git push -f origin gh-pages

Write-Host "Deployed successfully!"

# 元のディレクトリに戻る
Set-Location ..
