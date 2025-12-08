# AgriConnect - Angular Frontend

Modern, responsive web application for the AgriConnect agricultural platform. This Angular application provides farmers with an intuitive interface to rent machinery, get AI-powered crop recommendations, check weather forecasts, and access market information.

## Features

### Machine Marketplace
- Browse available agricultural equipment with photos and details
- Advanced search and filtering by type, location, and price
- Interactive maps showing machine locations using Leaflet.js
- Book equipment with date range selection
- Track booking status in real-time

### Smart Farming Tools
- **Crop Recommendations**: Get AI-powered crop suggestions based on soil composition and climate
- **Weather Dashboard**: Current conditions and 5-day forecast with GPS location support
- **Market Prices**: Real-time commodity prices for informed selling decisions
- **Farming Advice**: AI-generated recommendations based on local weather patterns

### User Experience
- Responsive Material Design interface
- Mobile-friendly layout for farmers in the field
- Progressive Web App (PWA) with offline capabilities
- Fast loading with Angular's optimized build
- Clean, intuitive navigation

## Technology Stack

**Framework**: Angular 21  
**UI Library**: Angular Material  
**State Management**: RxJS  
**Maps**: Leaflet.js  
**PWA**: Angular Service Worker  
**Testing**: Vitest  
**Build Tool**: Angular CLI  

## Prerequisites

Make sure you have these installed:

1. **Node.js 18 or higher** - [Download](https://nodejs.org/)
2. **npm 10 or higher** - Comes with Node.js
3. **Angular CLI** - Install globally:
   ```bash
   npm install -g @angular/cli
   ```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AgriConnect-Angular
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Angular, Material, and other dependencies.

### 3. Configure Backend URL

The app connects to the Java Spring Boot backend. Update the API URL if needed:

Open `src/environments/environment.ts`:

```typescript
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api',  // Change if backend runs elsewhere
    appName: 'AgriConnect'
};
```

For production, edit `src/environments/environment.prod.ts`:

```typescript
export const environment = {
    production: true,
    apiUrl: 'https://your-backend-url.com/api',
    appName: 'AgriConnect'
};
```

### 4. Run Development Server

```bash
npm start
```

Or using Angular CLI:

```bash
ng serve
```

The app will be available at `http://localhost:4200`

The page automatically reloads when you make changes to the code.

## Available Scripts

```bash
# Development server
npm start          # Starts dev server on localhost:4200

# Build for production
npm run build      # Builds to /dist directory

# Run tests
npm test          # Runs unit tests with Vitest

# Watch mode (rebuild on changes)
npm run watch     # Continuous build
```

## Project Structure

```
AgriConnect-Angular/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API and business logic services
│   │   ├── models/          # TypeScript interfaces/models
│   │   ├── guards/          # Route guards for authentication
│   │   ├── pages/           # Page components (routes)
│   │   └── app.component.ts # Root component
│   ├── environments/        # Environment configurations
│   ├── assets/              # Images, icons, static files
│   ├── styles.css           # Global styles
│   └── index.html           # Main HTML file
├── angular.json             # Angular CLI configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Backend Integration

This Angular app connects to the AgriConnect Java Spring Boot backend API.

**Backend Repository**: [Link to Java backend repository]

### API Endpoints Used

- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `GET /api/machines` - Fetch machinery listings
- `POST /api/bookings` - Create rental bookings
- `POST /api/crop-recommendation` - Get crop suggestions
- `POST /api/weather` - Fetch weather data

Make sure the backend is running before starting the Angular app.

### CORS Configuration

The backend must allow requests from `http://localhost:4200` for development. This is already configured in the Spring Boot backend.

## Building for Production

Create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with compressed and optimized files ready for deployment.

### Deploy to Web Server

1. Copy contents of `dist/agri-connect-angular/` to your web server
2. Configure your web server to serve `index.html` for all routes (for Angular routing)
3. Update `environment.prod.ts` with production backend URL

### Deploy to Firebase (Example)

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## Development Guidelines

### Adding a New Feature

1. Generate component:
   ```bash
   ng generate component components/my-feature
   ```

2. Generate service:
   ```bash
   ng generate service services/my-service
   ```

3. Add routing in `app.routes.ts`
4. Update navigation if needed

### Code Style

The project uses Prettier for code formatting:
- Single quotes
- 100 character line width
- 2 space indentation

Format code before committing:
```bash
npx prettier --write .
```

## Progressive Web App (PWA)

This app is configured as a PWA with offline support:

- Works offline after first visit
- Cacheable assets for faster loading
- Installable on mobile devices
- Configured in `ngsw-config.json`

To test PWA locally:
1. Build for production: `ng build`
2. Serve with HTTP server: `npx http-server dist/agri-connect-angular`
3. Open in browser and check DevTools > Application > Service Workers

## Troubleshooting

**Error: "Cannot connect to backend"**
- Make sure Java backend is running on port 8080
- Check `environment.ts` has correct API URL
- Verify CORS is enabled in backend

**Error: "Module not found"**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Port 4200 already in use**
- Stop other Angular development servers
- Or use different port: `ng serve --port 4300`

**Build errors**
- Update Angular CLI: `npm install -g @angular/cli@latest`
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The app is optimized for performance:
- Lazy loading of routes
- OnPush change detection strategy
- Tree-shaking to remove unused code
- AOT (Ahead-of-Time) compilation
- Service worker caching

## Contributing

This is a frontend for the AgriConnect platform. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

Make sure your code follows the existing style and all tests pass.

## Related Repositories

**Backend (Java Spring Boot)**: [Link to backend repository]

Both repositories are required for the full AgriConnect platform to function.

## License

MIT License - See LICENSE file for details

## Version

**Current Version**: 1.0.0  
**Angular Version**: 21.0  
**Last Updated**: December 2025

## Contact

For issues or questions, please open an issue in the repository or contact the development team.

---

**AgriConnect Angular Frontend** - Connecting farmers with technology
