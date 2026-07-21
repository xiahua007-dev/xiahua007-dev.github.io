param(
  [string]$Message = "chore: publish site"
)

$ErrorActionPreference = "Stop"

function Step($Text) {
  Write-Host "==> $Text" -ForegroundColor DarkRed
}

function Invoke-Checked([scriptblock]$Command, [string]$FailureMessage) {
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$FailureMessage (exit code: $LASTEXITCODE)"
  }
}

$repoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

Step "Building site"
Invoke-Checked { npm run build } "Build failed"

$branch = (git branch --show-current).Trim()
if ($LASTEXITCODE -ne 0 -or -not $branch) {
  throw "Cannot determine current git branch."
}

Step "Checking git changes"
$status = git status --porcelain
if ($LASTEXITCODE -ne 0) {
  throw "Cannot read git status."
}

if (-not $status) {
  Write-Host "No changes to publish. Build passed."
  exit 0
}

Invoke-Checked { git status --short } "Cannot print git status"

Step "Committing changes"
Invoke-Checked { git add AGENTS.md index.html package.json package-lock.json public src content scripts .github README.md } "git add failed"

$staged = git diff --cached --name-only
if ($LASTEXITCODE -ne 0) {
  throw "Cannot inspect staged changes."
}

if (-not $staged) {
  Write-Host "No tracked publishable changes staged. Build passed."
  exit 0
}

Invoke-Checked { git commit -m $Message } "git commit failed"

Step "Pushing to origin/$branch"
Invoke-Checked { git push origin $branch } "git push failed"

Write-Host "Published. GitHub Pages deployment will run from GitHub Actions." -ForegroundColor Green


