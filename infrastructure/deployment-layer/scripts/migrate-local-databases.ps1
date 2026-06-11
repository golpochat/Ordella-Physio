# Run Prisma migrate deploy for every service in the local Docker stack.
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$DeployDir = Join-Path $ScriptDir ".."
Push-Location $DeployDir
try {
  node (Join-Path $ScriptDir "migrate-local-databases.mjs")
  exit $LASTEXITCODE
} finally {
  Pop-Location
}
