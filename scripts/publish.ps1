param(
  [string]$Message = "chore: publish site"
)

$ErrorActionPreference = "Stop"

function Step($Text) {
  Write-Host "==> $Text" -ForegroundColor DarkRed
}

$repoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

Step "Building site"
npm run build

$branch = (git branch --show-current).Trim()
if (-not $branch) {
  throw "Cannot determine current git branch."
}

Step "Checking git changes"
$status = git status --porcelain
if (-not $status) {
  Write-Host "No changes to publish. Build passed."
  exit 0
}

git status --short

Step "Committing changes"
git add index.html package.json package-lock.json public src scripts .github README.md
$staged = git diff --cached --name-only
if (-not $staged) {
  Write-Host "No tracked publishable changes staged. Build passed."
  exit 0
}

git commit -m $Message

Step "Pushing to origin/$branch"
git push origin $branch

Write-Host "Published. GitHub Pages deployment will run from GitHub Actions." -ForegroundColor Green
