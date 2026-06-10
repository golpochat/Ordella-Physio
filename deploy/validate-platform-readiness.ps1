# Ordella Physio — Platform Readiness Validation (PowerShell)
# Usage: .\deploy\validate-platform-readiness.ps1 [-Mode local|production]
param(
    [string]$Mode = "local"
)

$ErrorActionPreference = "Continue"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Parent $ScriptDir
$Pass = 0
$Fail = 0

function Test-Endpoint {
    param([string]$Name, [string]$Url)
    try {
        $response = Invoke-WebRequest -Uri $Url -TimeoutSec 15 -UseBasicParsing
        if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300) {
            Write-Host "  OK   $Name"
            $script:Pass++
        } else {
            Write-Host "  FAIL $Name - $Url ($($response.StatusCode))"
            $script:Fail++
        }
    } catch {
        Write-Host "  FAIL $Name - $Url"
        $script:Fail++
    }
}

Write-Host "==> Ordella Platform Readiness Validation ($Mode)"
Write-Host ""

if ($Mode -eq "production") {
    & "$ScriptDir\production\verify-production.sh"
    exit $LASTEXITCODE
}

$GatewayUrl = if ($env:API_GATEWAY_URL) { $env:API_GATEWAY_URL } else { "http://localhost:3049" }
$FrontendUrl = if ($env:FRONTEND_URL) { $env:FRONTEND_URL } else { "http://localhost:3010" }

Write-Host "==> Core endpoints"
Test-Endpoint "API Gateway health" "$GatewayUrl/health"
Test-Endpoint "API Gateway services" "$GatewayUrl/health/services"
Test-Endpoint "Frontend portal" "$FrontendUrl/"

Write-Host ""
Write-Host "==> Gateway service probes (via /health/services)"
try {
    $servicesJson = Invoke-RestMethod -Uri "$GatewayUrl/health/services" -TimeoutSec 15
    $expected = @("auth", "tenant", "patient", "appointment", "notes", "billing", "payment",
        "communication", "reporting", "messaging", "notification", "ai-notes", "marketplace", "enterprise")
    foreach ($name in $expected) {
        $svc = $servicesJson.services | Where-Object { $_.name -eq $name }
        if ($svc) {
            if ($svc.status -eq "up") {
                Write-Host "  OK   $name (up)"
                $Pass++
            } else {
                Write-Host "  FAIL $name (down)"
                $Fail++
            }
        } else {
            Write-Host "  SKIP $name (not in probe list - start container to include)"
        }
    }
} catch {
    Write-Host "  FAIL could not fetch /health/services"
    $Fail++
}

Write-Host ""
Write-Host "==> Docker containers"
try {
    $running = (docker ps --format "{{.Names}}" 2>$null | Select-String ordella).Count
    if ($running -gt 0) {
        Write-Host "  OK   $running ordella containers running"
        $Pass++
    } else {
        Write-Host "  FAIL no ordella containers running"
        $Fail++
    }
} catch {
    Write-Host "  SKIP docker not available"
}

Write-Host ""
Write-Host "==> Mobile app build"
$apk = Join-Path $RootDir "apps\mobile\build\app\outputs\flutter-apk\app-debug.apk"
if (Test-Path $apk) {
    Write-Host "  OK   Flutter debug APK present"
    $Pass++
} elseif (Get-Command flutter -ErrorAction SilentlyContinue) {
    Push-Location (Join-Path $RootDir "apps\mobile")
    flutter analyze --no-fatal-infos 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK   Flutter analyze passed"
        $Pass++
    } else {
        Write-Host "  FAIL Flutter analyze"
        $Fail++
    }
    Pop-Location
} else {
    Write-Host "  SKIP flutter not in PATH"
}

Write-Host ""
Write-Host "==> Multi-region configs"
@("docker-compose.eu.yml", "docker-compose.us.yml", "docker-compose.apac.yml") | ForEach-Object {
    $file = Join-Path $ScriptDir "multi-region\$_"
    if (Test-Path $file) {
        Write-Host "  OK   multi-region/$_"
        $Pass++
    } else {
        Write-Host "  FAIL multi-region/$_ missing"
        $Fail++
    }
}

Write-Host ""
Write-Host "==> English-only UI"
$layout = Join-Path $RootDir "apps\frontend-web\app\layout.tsx"
if ((Get-Content $layout -Raw) -match 'lang="en"') {
    Write-Host "  OK   frontend-web lang=en"
    $Pass++
} else {
    Write-Host "  FAIL frontend-web missing lang=en"
    $Fail++
}

Write-Host ""
Write-Host "Results: $Pass passed, $Fail failed"
if ($Fail -gt 0) { exit 1 }
Write-Host ""
Write-Host "Platform readiness validation PASSED ($Mode)"
