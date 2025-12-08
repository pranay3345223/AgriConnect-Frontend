# Easy Git Commit Script - Angular Frontend
# Run this to quickly commit and push changes

Write-Host "=== AgriConnect Angular - Easy Git Commit ===" -ForegroundColor Cyan
Write-Host ""

# Check if changes exist
$status = git status --short
if ($status) {
    Write-Host "Files changed:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    
    # Ask for commit message
    $message = Read-Host "Enter commit message (or press Enter for 'Update frontend')"
    if ([string]::IsNullOrWhiteSpace($message)) {
        $message = "Update frontend"
    }
    
    # Add all files
    Write-Host "`nAdding files..." -ForegroundColor Green
    git add .
    
    # Commit
    Write-Host "Creating commit..." -ForegroundColor Green
    git commit -m "$message"
    
    # Ask to push
    $push = Read-Host "`nPush to GitHub? (y/n)"
    if ($push -eq 'y' -or $push -eq 'Y') {
        Write-Host "Pushing to GitHub..." -ForegroundColor Green
        git push
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    }
    else {
        Write-Host "`nCommit created locally. Run 'git push' later to upload." -ForegroundColor Yellow
    }
}
else {
    Write-Host "No changes to commit. Everything is up to date!" -ForegroundColor Green
}

Write-Host "`nDone!" -ForegroundColor Cyan
