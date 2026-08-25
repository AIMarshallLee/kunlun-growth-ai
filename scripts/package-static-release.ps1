$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outPath = Join-Path $repoRoot "out"
$releaseDir = Join-Path $repoRoot "releases"
$resolvedRepo = [System.IO.Path]::GetFullPath($repoRoot)
$resolvedReleaseDir = [System.IO.Path]::GetFullPath($releaseDir)

if (-not $resolvedReleaseDir.StartsWith($resolvedRepo + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Release directory must remain inside the repository."
}
if (-not (Test-Path -LiteralPath $outPath -PathType Container)) {
  throw "Static export not found. Run npm run build first."
}

$packageJson = Get-Content -Raw -LiteralPath (Join-Path $repoRoot "package.json") | ConvertFrom-Json
$version = [string]$packageJson.version
if ($version -notmatch '^\d+\.\d+\.\d+$') {
  throw "package.json version must use semantic versioning."
}

New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null
$archiveName = "kunlun-growth-ai-$version-static.zip"
$archivePath = Join-Path $releaseDir $archiveName
$hashPath = "$archivePath.sha256"

foreach ($target in @($archivePath, $hashPath)) {
  $resolvedTarget = [System.IO.Path]::GetFullPath($target)
  if (-not $resolvedTarget.StartsWith($resolvedReleaseDir + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Package target must remain inside the release directory."
  }
  if (Test-Path -LiteralPath $resolvedTarget) {
    Remove-Item -LiteralPath $resolvedTarget -Force
  }
}

Compress-Archive -Path (Join-Path $outPath "*") -DestinationPath $archivePath -CompressionLevel Optimal
$stream = [System.IO.File]::OpenRead($archivePath)
$sha = [System.Security.Cryptography.SHA256]::Create()
try {
  $hash = ([System.BitConverter]::ToString($sha.ComputeHash($stream))).Replace("-", "").ToLowerInvariant()
} finally {
  $sha.Dispose()
  $stream.Dispose()
}
"$hash  $archiveName" | Set-Content -LiteralPath $hashPath -Encoding ascii

Write-Output "Archive: $archivePath"
Write-Output "SHA-256: $hash"
