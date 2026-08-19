# Run local development DB + Prisma migrations + seed admin for Hamrah platform
# Usage (PowerShell):
#   ./scripts/run-local.ps1
# Or run with elevated privileges if needed.

param(
  [string]$AdminName = 'admin',
  [string]$AdminPassword = 'adminpass'
)

# Load .env into the process environment for commands that rely on it
if (Test-Path -Path ".env") {
  Get-Content .env | ForEach-Object {
    if ($_ -match "^\s*#") { return }
    $parts = $_ -split '='; if ($parts.Count -lt 2) { return }
    $key = $parts[0].Trim()
    $val = ($parts[1..($parts.Count-1)] -join '=').Trim('"')
    Set-Item -Path Env:\$key -Value $val
  }
}

Write-Host "Checking for Docker..."
$docker = Get-Command docker -ErrorAction SilentlyContinue
if (-not $docker) {
  Write-Error "Docker CLI not found. Install Docker Desktop and ensure 'docker' is in PATH. Aborting."
  exit 1
}

Write-Host "Starting Postgres via docker-compose..."
# Use docker-compose if available, else try docker compose
$dcCmd = Get-Command docker-compose -ErrorAction SilentlyContinue
if ($dcCmd) {
  docker-compose up -d db
} else {
  docker compose up -d db
}

Write-Host "Waiting for Postgres to accept connections (up to 30s)..."
$tries = 0
$max = 30
while ($tries -lt $max) {
  try {
    docker run --rm --network host postgres:15 pg_isready -h localhost -p 5432 | Out-Null
    if ($LASTEXITCODE -eq 0) { break }
  } catch {}
  Start-Sleep -Seconds 1
  $tries++
}

Write-Host "Running Prisma migrate (dev)..."
npm run db:migrate
if ($LASTEXITCODE -ne 0) { Write-Error "prisma migrate failed"; exit 1 }

Write-Host "Generating Prisma client..."
npm run db:generate
if ($LASTEXITCODE -ne 0) { Write-Error "prisma generate failed"; exit 1 }

Write-Host "Seeding admin user (AdminName=$AdminName)..."
$env:ADMIN_NAME = $AdminName
$env:ADMIN_PASSWORD = $AdminPassword
npm run db:seed-admin

Write-Host "Setup complete. You can now run 'npm run dev' and sign in with the admin credentials."