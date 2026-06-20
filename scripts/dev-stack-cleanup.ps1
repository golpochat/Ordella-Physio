# Rebuild and prune the Ordella dev Docker stack.
# Usage: pwsh scripts/dev-stack-cleanup.ps1

$ErrorActionPreference = "Stop"
$composeFile = "docker-compose.dev.yml"

Write-Host "Stopping dev stack..."
docker compose -f $composeFile down --remove-orphans

Write-Host "Removing deprecated subscription-billing images (if any)..."
docker image rm ordella-physio-subscription-billing-service:latest 2>$null

Write-Host "Pruning dangling images and stopped containers..."
docker container prune -f
docker image prune -f

Write-Host "Rebuilding core services..."
docker compose -f $composeFile build api-gateway frontend-web billing-service notification-provider-service pharmacy-service terminal-service

Write-Host "Starting dev stack..."
docker compose -f $composeFile up -d

Write-Host "Done. Optional monolith: docker compose -f $composeFile --profile clinic-backend up -d"
