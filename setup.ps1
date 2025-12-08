# AgriConnect Angular - Setup Script
# This script copies all generated files into the Angular project

$projectPath = "C:\Users\pranay\Downloads\AgriConnect-Angular"
$filesPath = "C:\Users\pranay\Documents\AgriConnect-Angular-Files"

Write-Host "Setting up AgriConnect Angular Application..." -ForegroundColor Green

# Create necessary directories
Write-Host "Creating directory structure..."
New-Item -ItemType Directory -Force -Path "$projectPath/src/environments" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/models" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/services" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/guards" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/interceptors" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/components/auth" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/components/dashboard" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/components/machines" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/components/bookings" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/components/climate" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/components/crop" | Out-Null
New-Item -ItemType Directory -Force -Path "$projectPath/src/app/components/shared" | Out-Null

# Copy environment files
Write-Host "Copying environment files..."
Copy-Item "$filesPath/environment.ts" "$projectPath/src/environments/" -Force
Copy-Item "$filesPath/environment.prod.ts" "$projectPath/src/environments/" -Force

# Copy model files
Write-Host "Copying models..."
Copy-Item "$filesPath/user.model.ts" "$projectPath/src/app/models/" -Force
Copy-Item "$filesPath/machine.model.ts" "$projectPath/src/app/models/" -Force
Copy-Item "$filesPath/booking.model.ts" "$projectPath/src/app/models/" -Force
Copy-Item "$filesPath/climate.model.ts" "$projectPath/src/app/models/" -Force
Copy-Item "$filesPath/crop.model.ts" "$projectPath/src/app/models/" -Force

# Copy service files
Write-Host "Copying services..."
Copy-Item "$filesPath/auth.service.ts" "$projectPath/src/app/services/" -Force
Copy-Item "$filesPath/machine.service.ts" "$projectPath/src/app/services/" -Force
Copy-Item "$filesPath/booking.service.ts" "$projectPath/src/app/services/" -Force
Copy-Item "$filesPath/climate-crop.service.ts" "$projectPath/src/app/services/" -Force

# Copy guard and interceptor
Write-Host "Copying guards and interceptors..."
Copy-Item "$filesPath/auth.guard.ts" "$projectPath/src/app/guards/" -Force
Copy-Item "$filesPath/auth.interceptor.ts" "$projectPath/src/app/interceptors/" -Force

Write-Host ""
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the files in the project"
Write-Host "2. Update app.config.ts to include HTTP interceptor"
Write-Host "3. Create components using ng generate"
Write-Host "4. Run the dev server with ng serve"
Write-Host ""
