$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$DeployDir = Split-Path -Parent $ScriptDir

Set-Location $DeployDir

if (-not (Test-Path ".env.local")) {
  Write-Host "Creating .env.local from .env.local.example"
  Copy-Item ".env.local.example" ".env.local"
  Write-Host "Review .env.local and update secrets before production-like testing."
}

Write-Host "Starting Ordella Physio local stack..."
docker compose -f docker-compose.local.yml up -d --build

Write-Host ""
Write-Host "Running database migrations..."
& (Join-Path $ScriptDir "migrate-local-databases.ps1")

Write-Host ""
Write-Host "Local stack is up."
$gatewayPort = if ($env:API_GATEWAY_PORT) { $env:API_GATEWAY_PORT } else { "3049" }
$frontendPort = if ($env:FRONTEND_WEB_PORT) { $env:FRONTEND_WEB_PORT } else { "3010" }
Write-Host "  API Gateway:  http://localhost:$gatewayPort"
Write-Host "  Frontend Web: http://localhost:$frontendPort"
