$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = Resolve-Path (Join-Path $ScriptDir "..")
$LogDir = if ($env:BACKUP_OUTPUT_DIR) { $env:BACKUP_OUTPUT_DIR } else { Join-Path $BackendDir "backups" }

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
Set-Location $BackendDir

$Timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$LogFile = Join-Path $LogDir "backup.log"

Add-Content -Path $LogFile -Value "==> Clinic backend backup ($Timestamp)"
node scripts/backup-database.mjs 2>&1 | Tee-Object -FilePath $LogFile -Append
Add-Content -Path $LogFile -Value "==> Backup complete"
