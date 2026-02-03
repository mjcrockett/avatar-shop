# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Avatar Shop is an Angular 17 standalone application that renders an interactive 2D avatar using CreateJS. Users can customize their avatar by selecting different body parts (head, hair, torso, arms, legs, feet) from various themed sets. The avatar displays animated reactions when parts are changed.

## Commands

### Development
```bash
npm start              # Start dev server on http://localhost:4200
ng serve              # Alternative command for dev server
```

### Building
```bash
npm run build         # Production build
npm run build:prod    # Production build with GitHub Pages base-href
npm run watch         # Development build with watch mode
```

### Testing
```bash
npm test              # Run Karma/Jasmine unit tests
ng test              # Alternative test command
```

### Code Generation
```bash
ng generate component component-name    # Generate new component
ng generate service service-name        # Generate new service
```

## Architecture

### Core Components Structure

The application follows a component-based architecture with two main feature areas:

1. **AvatarComponent** (`src/app/avatar/`): Displays the animated avatar
   - Uses a jQuery plugin (`avatar-renderer.js`) wrapped with CreateJS for rendering
   - Manages avatar state via `ShopService.currentBody` BehaviorSubject
   - Includes `CurtainComponent` for transitions between outfit changes
   - Includes `AudioComponent` for sound effects
   - Performs random reactions after outfit changes (laughing, confused, smiling, etc.)

2. **ShopComponent** (`src/app/shop/`): Displays customization UI
   - `CategoryComponent`: Renders icon grids for each body part category
   - `BannerComponent`: Displays category headers
   - Categories: Arms, Feet, Full, Hair, Heads, Legs, Torsos (defined in `models.ts`)

### Data Flow

1. **Avatar Data**: Stored in `src/assets/avatar-shop.json`
   - Contains two main arrays: `icons[]` (UI thumbnails) and `parts[]` (actual body part paths)
   - Each part has a `partsId` that links icons to their corresponding body parts

2. **State Management**: Uses RxJS BehaviorSubject pattern
   - `ShopService.currentBody` holds current avatar configuration (AvatarParts interface)
   - When user clicks an icon, `CategoryComponent.applySelected()` fetches parts by ID and updates `currentBody`
   - `AvatarComponent` subscribes to changes and triggers curtain animation + part swap

3. **Avatar Rendering**: Custom jQuery plugin integration
   - TypeScript definitions in `src/assets/js/avatar-renderer.d.ts`
   - Plugin loaded via `angular.json` scripts array
   - Supports methods: `wave`, `jump`, `confused`, `laughing`, `celebrate`, `mouth`, `eyes`, etc.

### Key Services

**ShopService** (`src/app/shop/shop.service.ts`):
- Fetches avatar data from JSON file
- Caches data after first load
- Methods: `GetAllData()`, `GetIcons()`, `GetPartsById()`
- Manages `currentBody` BehaviorSubject for avatar state synchronization

### External Dependencies

The app uses non-standard script loading configured in `angular.json`:
- jQuery (required for avatar plugin)
- CreateJS 2015.11.26 build (for canvas rendering)
- `avatar-renderer.js` (custom jQuery plugin, not in npm)
- Bootstrap 5.3.7 (CSS and JS)

### Path Handling Quirk

In `CategoryComponent.applySelected()`, paths are constructed using backslashes:
```typescript
const basePath = `assets\\parts\\${p.partsName}\\`;
```
This is used with paths stored in JSON, which only include filenames (e.g., `"head.png"`).

### TypeScript Configuration

- Strict mode enabled with Angular-specific compiler options
- Includes custom type definitions for avatar renderer
- Target: ES2022

## Deployment

GitHub Actions workflow (`.github/workflows/Angular.yml`) automatically deploys to GitHub Pages:
- Triggers on push to `main` branch or manual dispatch
- Builds with production config and base-href `/avatar-shop/`
- Deploys from `dist/browser/` directory

## Important Notes

- This is a standalone Angular 17 app (no NgModules)
- Avatar animations depend on CreateJS and the custom `avatar-renderer.js` plugin
- All body part images must exist in `src/assets/parts/[partsName]/` directories
- The avatar plugin is initialized once and then uses `insertNewParts` method to swap body parts
- Component SCSS styling is used (configured in `angular.json`)
