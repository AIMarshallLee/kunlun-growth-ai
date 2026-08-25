param([switch]$Force)

$ErrorActionPreference = 'Stop'
$workspace = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$productsRoot = (Resolve-Path -LiteralPath (Join-Path $workspace 'products')).Path
$packages = @(
  @{ Slug = 'product-material-agent'; Version = '1.0.0' },
  @{ Slug = 'crossborder-listing-localization'; Version = '1.0.0' },
  @{ Slug = 'product-media-qa'; Version = '1.0.0' }
)
$releaseEntries = @()
$fixedZipTimestamp = [DateTimeOffset]::new(2026, 8, 26, 0, 0, 0, [TimeSpan]::Zero)
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

foreach ($package in $packages) {
  $source = Join-Path $productsRoot $package.Slug
  $zipName = "$($package.Slug)-$($package.Version).zip"
  $destination = Join-Path $productsRoot $zipName
  $temporary = Join-Path $productsRoot ".$zipName.tmp.zip"

  node (Join-Path $workspace 'scripts\write-skill-checksums.mjs') $source
  if ($LASTEXITCODE -ne 0) { throw "Checksum generation failed for $($package.Slug)" }
  node (Join-Path $workspace 'scripts\check-skill-package.mjs') $source
  if ($LASTEXITCODE -ne 0) { throw "Package validation failed for $($package.Slug)" }
  node (Join-Path $source 'verify.mjs')
  if ($LASTEXITCODE -ne 0) { throw "Internal verification failed for $($package.Slug)" }

  if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary -Force }
  $zipStream = [System.IO.File]::Open($temporary, [System.IO.FileMode]::CreateNew)
  $zipArchive = [System.IO.Compression.ZipArchive]::new($zipStream, [System.IO.Compression.ZipArchiveMode]::Create, $false)
  try {
    $sourcePrefix = $source.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
    foreach ($file in Get-ChildItem -LiteralPath $source -Recurse -File | Sort-Object FullName) {
      $relativePath = $file.FullName.Substring($sourcePrefix.Length).Replace('\', '/')
      $entry = $zipArchive.CreateEntry($relativePath, [System.IO.Compression.CompressionLevel]::Optimal)
      $entry.LastWriteTime = $fixedZipTimestamp
      $inputStream = $file.OpenRead()
      $outputStream = $entry.Open()
      try { $inputStream.CopyTo($outputStream) } finally { $outputStream.Dispose(); $inputStream.Dispose() }
    }
  } finally {
    $zipArchive.Dispose()
    $zipStream.Dispose()
  }

  if (Test-Path -LiteralPath $destination) {
    if (-not $Force) { throw "Archive already exists: $destination. Re-run with -Force after reviewing the source package." }
    $resolvedDestination = (Resolve-Path -LiteralPath $destination).Path
    if (-not $resolvedDestination.StartsWith($productsRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
      throw "Unsafe archive replacement target: $resolvedDestination"
    }
    Remove-Item -LiteralPath $resolvedDestination -Force
  }
  Move-Item -LiteralPath $temporary -Destination $destination

  $archive = [System.IO.Compression.ZipFile]::OpenRead($destination)
  try { $entryCount = @($archive.Entries | Where-Object { $_.Name }).Count } finally { $archive.Dispose() }
  $item = Get-Item -LiteralPath $destination
  $releaseEntries += [ordered]@{
    slug = $package.Slug
    version = $package.Version
    file = $zipName
    sizeBytes = $item.Length
    sha256 = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash
    zipEntryCount = $entryCount
    packageStatus = 'commercial-ready'
    marketValidationStatus = 'awaiting-real-customer-operations-data'
  }
}

$releaseManifest = [ordered]@{
  schemaVersion = 1
  generatedOn = (Get-Date -Format 'yyyy-MM-dd')
  products = $releaseEntries
}
$releaseManifestPath = Join-Path $productsRoot 'release-manifest.json'
$releaseManifestJson = $releaseManifest | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($releaseManifestPath, $releaseManifestJson + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))
Write-Output "WROTE: $releaseManifestPath"
