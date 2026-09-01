$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distRoot = Join-Path $projectRoot 'dist'
$clientRoot = Join-Path $distRoot 'client'
$serverRoot = Join-Path $distRoot 'server'

New-Item -ItemType Directory -Force $clientRoot | Out-Null
New-Item -ItemType Directory -Force $serverRoot | Out-Null
New-Item -ItemType Directory -Force (Join-Path $clientRoot 'public') | Out-Null

Copy-Item -LiteralPath (Join-Path $projectRoot 'index.html') -Destination $clientRoot -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'styles.css') -Destination $clientRoot -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'report-data.js') -Destination $clientRoot -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'app.js') -Destination $clientRoot -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'public\torgtechnika-mark.png') -Destination (Join-Path $clientRoot 'public\torgtechnika-mark.png') -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'public\og.png') -Destination (Join-Path $clientRoot 'public\og.png') -Force

Copy-Item -LiteralPath (Join-Path $projectRoot 'worker.js') -Destination (Join-Path $serverRoot 'index.js') -Force

Write-Output 'Production bundle created in dist.'
