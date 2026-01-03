# Vite Documentation

## Overview
**Vite 7.2.4** - Next-generation frontend build tool. Provides lightning-fast development experience and optimized production builds.

## Why Vite?
- **Speed**: Instant server start, fast HMR (Hot Module Replacement)
- **Optimization**: Automatic code splitting, tree shaking
- **Modern**: Native ESM support, optimized for modern browsers
- **Developer Experience**: Better error messages, faster feedback
- **TypeScript**: Native TypeScript support without configuration
- **Plugin Ecosystem**: Rich plugin ecosystem

## Key Features

### 1. Development Server
Vite provides an extremely fast development server.

```bash
npm run dev
```

**Features:**
- Instant server start
- Fast HMR (updates appear instantly)
- Native ESM (no bundling in dev)
- Optimized dependency pre-bundling

### 2. Production Build
Optimized production builds with code splitting.

```bash
npm run build
```

**Output:**
- Optimized and minified code
- Code splitting
- Tree shaking
- Asset optimization

### 3. Configuration

#### Basic Config (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

#### Common Configuration Options
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Base public path
  base: '/',
  
  // Development server options
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  
  // Build options
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
        },
      },
    },
  },
  
  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
```

### 4. Environment Variables
Vite uses `.env` files for environment variables.

```bash
# .env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My App
```

```typescript
// Access in code
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

**Note:** Variables must be prefixed with `VITE_` to be exposed to client code.

### 5. Asset Handling

#### Static Assets
Place in `public/` folder - copied as-is.

```
public/
  favicon.ico
  logo.png
```

```tsx
<img src="/logo.png" alt="Logo" />
```

#### Imported Assets
Import assets in code - processed by Vite.

```tsx
import logo from './assets/logo.png';

<img src={logo} alt="Logo" />
```

#### CSS/SCSS
```tsx
import './styles.css';
import './styles.scss';
```

### 6. TypeScript Support
Native TypeScript support - no configuration needed!

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

TypeScript works out of the box with:
- Type checking
- Path resolution
- Import/export types

### 7. Hot Module Replacement (HMR)
Vite provides instant HMR - changes appear immediately without full page reload.

**React Fast Refresh:**
- Preserves component state
- Updates only changed components
- Instant feedback

## Scripts in This Project

### Development
```bash
npm run dev
```
- Starts development server
- Enables HMR
- Opens browser (if configured)

### Build
```bash
npm run build
```
- Type checks with TypeScript
- Builds for production
- Outputs to `dist/` folder

### Preview
```bash
npm run preview
```
- Serves production build locally
- Tests production build

## Project Structure

```
project-root/
├── index.html          # Entry HTML
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies
├── public/             # Static assets
└── src/                # Source code
    ├── main.tsx        # Entry point
    ├── App.tsx
    └── ...
```

## Key Differences from Webpack

### Development
- **Vite**: Native ESM, no bundling, instant start
- **Webpack**: Bundles everything, slower start

### Production
- **Vite**: Uses Rollup, optimized builds
- **Webpack**: Uses Webpack bundler

### HMR
- **Vite**: Instant updates, preserves state
- **Webpack**: Full reload or module replacement

## Best Practices

### 1. Use Path Aliases
```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}

// Usage
import Component from '@/components/Component';
```

### 2. Optimize Dependencies
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
      },
    },
  },
}
```

### 3. Environment Variables
```bash
# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.production.com
```

### 4. Asset Optimization
- Use appropriate image formats
- Import assets for processing
- Use public folder for static assets

## Common Issues & Solutions

### Issue: Module not found
**Solution:** Check import paths, use path aliases

### Issue: Environment variables not working
**Solution:** Ensure variables are prefixed with `VITE_`

### Issue: Slow builds
**Solution:** Check bundle size, use code splitting

## Resources
- [Vite Documentation](https://vitejs.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vite Config Reference](https://vitejs.dev/config/)

