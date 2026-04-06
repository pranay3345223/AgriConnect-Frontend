# AgriConnect - Nginx Setup Guide

## Prerequisites
1. Install Nginx for Windows from: https://nginx.org/en/download.html
2. Extract to `C:\nginx` (or your preferred location)

## Setup Steps

### 1. Build Angular Application
```bash
cd C:\Users\pranay\Downloads\AgriConnect-Angular
npm run build
```

This creates production-ready files in `dist/agri-connect-angular/browser/`

### 2. Configure Nginx

Copy the `nginx.conf` file to your Nginx installation:
```
C:\nginx\conf\nginx.conf
```

Or create a new site configuration in:
```
C:\nginx\conf\sites-enabled\agriconnect.conf
```

### 3. Update nginx.conf Root Path

Edit the `root` directive in nginx.conf to match your actual build output path:
```nginx
root C:/Users/pranay/Downloads/AgriConnect-Angular/dist/agri-connect-angular/browser;
```

### 4. Start Nginx

Open Command Prompt as Administrator:
```bash
cd C:\nginx
start nginx
```

### 5. Verify Nginx is Running

Check if Nginx is running:
```bash
tasklist /fi "imagename eq nginx.exe"
```

### 6. Access Your Application

- **Angular Frontend**: http://localhost
- **Spring Boot API**: http://localhost/api/*
- **Thymeleaf Website**: http://localhost:8080 (direct access)

## Nginx Commands

**Start Nginx:**
```bash
cd C:\nginx
start nginx
```

**Stop Nginx:**
```bash
nginx -s stop
```

**Reload Configuration:**
```bash
nginx -s reload
```

**Test Configuration:**
```bash
nginx -t
```

## Architecture

```
User Browser (http://localhost)
        ↓
    Nginx (Port 80)
        ↓
    ┌───────────────┬──────────────┐
    ↓               ↓              ↓
Angular Static   API Proxy    Thymeleaf
  (served)    → Backend:8080  (optional)
```

## Production Considerations

1. **SSL/HTTPS**: Add SSL certificate configuration
2. **Caching**: Configure browser caching for static assets
3. **Compression**: Gzip is already enabled
4. **Security Headers**: Add security headers (CORS, CSP, etc.)

## Troubleshooting

**Port 80 already in use:**
- Change `listen 80;` to `listen 8081;` (or any available port)
- Access via http://localhost:8081

**404 errors on Angular routes:**
- Ensure `try_files $uri $uri/ /index.html;` is present
- This enables Angular routing to work properly

**API calls failing:**
- Check Spring Boot is running on port 8080
- Verify proxy_pass URLs in nginx.conf
- Check browser console for CORS errors
