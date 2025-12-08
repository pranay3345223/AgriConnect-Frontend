# Quick Diagnostic Script for AgriConnect Angular

Write-Host "=== AgriConnect Angular Diagnostics ===" -ForegroundColor Cyan
Write-Host ""

# Check if server is running
Write-Host "1. Checking if Angular server is running on port 4200..." -ForegroundColor Yellow
$connection = Test-NetConnection -ComputerName localhost -Port 4200 -WarningAction SilentlyContinue
if ($connection.TcpTestSucceeded) {
    Write-Host "   ✓ Server is running on port 4200" -ForegroundColor Green
}
else {
    Write-Host "   ✗ Server is NOT running on port 4200" -ForegroundColor Red
    Write-Host "   Run: ng serve" -ForegroundColor Yellow
    exit
}

# Check app.html content
Write-Host ""
Write-Host "2. Checking app.html template..." -ForegroundColor Yellow
$appHtml = Get-Content "C:\Users\pranay\Downloads\AgriConnect-Angular\src\app\app.html"
if ($appHtml -eq "<router-outlet></router-outlet>") {
    Write-Host "   ✓ Template is correct" -ForegroundColor Green
}
else {
    Write-Host "   ✗ Template content:" -ForegroundColor Red
    Write-Host "   $appHtml"
}

# Check routes file
Write-Host ""
Write-Host "3. Checking routes configuration..." -ForegroundColor Yellow
$routes = Get-Content "C:\Users\pranay\Downloads\AgriConnect-Angular\src\app\app.routes.ts" | Select-String "redirectTo.*login"
if ($routes) {
    Write-Host "   ✓ Default route redirects to /login" -ForegroundColor Green
}
else {
    Write-Host "   ⚠ Default route may not be configured correctly" -ForegroundColor Yellow
}

# Check if components exist
Write-Host ""
Write-Host "4. Checking if login component exists..." -ForegroundColor Yellow
if (Test-Path "C:\Users\pranay\Downloads\AgriConnect-Angular\src\app\components\auth\login.component.ts") {
    Write-Host "   ✓ Login component exists" -ForegroundColor Green
}
else {
    Write-Host "   ✗ Login component NOT found" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Open browser to: http://localhost:4200"
Write-Host "2. Press F12 to open DevTools"
Write-Host "3. Go to Console tab"
Write-Host "4. Look for red errors"
Write-Host "5. Share any errors you see"
Write-Host ""
