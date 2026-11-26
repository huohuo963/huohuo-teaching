# Push the current HEAD's file changes to GitHub through the Git Data API.
# Use this only when git push fails because github.com:443 is unreachable
# while gh api still works. Requires an authenticated gh CLI.
#
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/push-via-api.ps1
#
# It creates blobs for files changed in HEAD, builds a tree on top of the
# remote main tree, creates a commit with remote main as parent, and updates
# refs/heads/main. It never prints or stores a token.

$ErrorActionPreference = "Stop"
$repo = "huohuo963/huohuo-teaching"
$gh = "C:\Users\24178\.local\gh-cli\bin\gh.exe"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$utf8 = New-Object System.Text.UTF8Encoding($false)
function Write-JsonFile($path, $obj) {
  $json = $obj | ConvertTo-Json -Depth 8 -Compress
  [System.IO.File]::WriteAllText($path, $json, $utf8)
}

$remote = (& $gh api "repos/$repo/git/ref/heads/main" --jq .object.sha).Trim()
$local = (git rev-parse HEAD).Trim()
$baseTree = (& $gh api "repos/$repo/git/commits/$remote" --jq .tree.sha).Trim()
$changed = @(git diff-tree --no-commit-id --name-only -r HEAD)

Write-Output "remote=$remote"
Write-Output "local=$local"
Write-Output "files=$($changed -join ', ')"

if ($changed.Count -eq 0) {
  Write-Output "No changed files in HEAD; nothing to push."
  exit 0
}

$entries = @()
foreach ($f in $changed) {
  $full = Join-Path $root $f
  if (Test-Path $full) {
    $b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($full))
    $blobPath = Join-Path $root ".tmp-blob.json"
    Write-JsonFile $blobPath @{ content = $b64; encoding = "base64" }
    $blob = (& $gh api --method POST "repos/$repo/git/blobs" --input $blobPath --jq .sha).Trim()
    Write-Output "blob $f $blob"
    $entries += @{ path = $f; mode = "100644"; type = "blob"; sha = $blob }
  } else {
    Write-Output "delete $f"
    $entries += @{ path = $f; mode = "100644"; type = "blob"; sha = $null }
  }
}

$treePath = Join-Path $root ".tmp-tree.json"
Write-JsonFile $treePath @{ base_tree = $baseTree; tree = $entries }
$newTree = (& $gh api --method POST "repos/$repo/git/trees" --input $treePath --jq .sha).Trim()
Write-Output "tree=$newTree"

$message = ((git show -s --format=%B HEAD) -join "`n").Trim()
$commitPath = Join-Path $root ".tmp-commit.json"
Write-JsonFile $commitPath @{ message = $message; tree = $newTree; parents = @($remote) }
$newCommit = (& $gh api --method POST "repos/$repo/git/commits" --input $commitPath --jq .sha).Trim()
Write-Output "commit=$newCommit"

$refPath = Join-Path $root ".tmp-ref.json"
Write-JsonFile $refPath @{ sha = $newCommit; force = $false }
& $gh api --method PATCH "repos/$repo/git/refs/heads/main" --input $refPath --jq .object.sha

Remove-Item ".tmp-blob.json", ".tmp-tree.json", ".tmp-commit.json", ".tmp-ref.json" -ErrorAction SilentlyContinue
Write-Output "Done. Remote main updated. Local history may differ; sync with git fetch when the network is back."
