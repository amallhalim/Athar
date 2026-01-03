# Project Architecture Documentation

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [State Management](#state-management)
4. [Routing Architecture](#routing-architecture)
5. [Code Patterns & Conventions](#code-patterns--conventions)
6. [Build Tooling](#build-tooling)
7. [Component Architecture](#component-architecture)

---

## Technology Stack

### Core Framework
- **React 19.2.3** - Modern React with latest features
  - **Why**: Latest stable version with improved performance, better TypeScript support, and modern hooks API
  - **Benefits**: Concurrent rendering, automatic batching, improved developer experience

### Routing
- **React Router 7.11.0** - Client-side routing library
  - **Why**: Industry standard, excellent TypeScript support, supports data loaders, nested routing, and route protection
  - **Benefits**: 
    - Declarative routing with TypeScript
    - Built-in support for lazy loading and code splitting
    - Route-based code organization
    - SEO-friendly routing patterns

### State Management
- **Zustand 5.0.9** - Lightweight state management
  - **Why**: Minimal boilerplate, simple API, excellent TypeScript support, no providers needed
  - **Benefits**:
    - Less code than Redux
    - No context provider hell
    - Easy to test and maintain
    - Great performance with selective subscriptions
  - **Usage**: Used for global application state (user data, bear counter, etc.)

### Build Tool
- **Vite 7.2.4** - Next-generation frontend build tool
  - **Why**: Extremely fast HMR (Hot Module Replacement), optimized builds, native ESM support
  - **Benefits**:
    - Lightning-fast development server
    - Optimized production builds
    - Better developer experience than Webpack
    - Native TypeScript support

### Styling
- **Sass/SCSS** - CSS preprocessor
  - **Why**: Variables, nesting, mixins, and better organization than plain CSS
  - **Benefits**: Maintainable stylesheets, reusable styles, better code organization

### Type Safety
- **TypeScript 5.9.3** - Typed JavaScript superset
  - **Why**: Catch errors at compile time, better IDE support, self-documenting code
  - **Benefits**: Type safety, better refactoring, improved developer experience

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer)
│   └── reusable/       # Shared reusable components
├── pages/              # Page components (route-level components)
├── routes/             # Routing configuration and route utilities
│   ├── components/     # Route-specific components (SuspenseRoute)
│   ├── ProtectedRoute.tsx
│   └── RoutesApps.tsx  # Main route configuration
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
└── assets/             # Static assets (images, icons)
```

### Why This Structure?
- **Separation of Concerns**: Clear distinction between pages, components, and utilities
- **Scalability**: Easy to add new features without cluttering
- **Maintainability**: Related files are grouped together
- **Convention**: Follows common React project patterns

---

## State Management

### Zustand Stores

#### Pattern
```typescript
import { create } from 'zustand'

interface StoreState {
  // State properties
  // Action methods
}

const useStore = create<StoreState>((set) => ({
  // Initial state
  // Actions that update state
}))
```

#### Why Zustand?
1. **Simplicity**: No providers, no boilerplate
2. **Performance**: Selective subscriptions prevent unnecessary re-renders
3. **TypeScript**: Excellent type inference and safety
4. **Size**: Small bundle size (~1KB)
5. **Flexibility**: Can be used for both simple and complex state

#### Example Stores
- `bear.store.ts` - Example counter state
- `user.store.ts` - User authentication and profile data

---

## Routing Architecture

### Route Configuration Pattern

Routes are defined in `src/routes/RoutesApps.tsx` using React Router's `RouteObject[]` pattern.

#### Key Features:
1. **Lazy Loading**: All routes use `React.lazy()` for code splitting
2. **Suspense Boundaries**: Each route wrapped in `SuspenseRoute` for loading states
3. **Error Boundaries**: Route-level error handling with `ErrorBoundary`
4. **Protected Routes**: Authentication-based route protection
5. **Route Metadata**: Rich route handles with SEO, analytics, and layout config

### Route Structure

```typescript
{
  path: "/route",
  element: <SuspenseRoute><Component /></SuspenseRoute>,
  errorElement: <ErrorBoundary />,
  handle: {
    title: "Page Title",
    breadcrumb: "Breadcrumb",
    // SEO, analytics, layout config
  }
}
```

### Why This Pattern?
- **Code Splitting**: Automatic lazy loading reduces initial bundle size
- **Error Handling**: Graceful error recovery at route level
- **SEO Optimization**: Route handles contain meta information
- **Type Safety**: TypeScript ensures route configuration correctness
- **Maintainability**: Centralized route configuration

### Protected Routes

Uses `ProtectedRoute` wrapper component:
- Checks authentication state
- Redirects unauthenticated users
- Wraps protected components

---

## Code Patterns & Conventions

### Component Patterns

#### 1. Functional Components
- All components are functional (no class components)
- Use React hooks for state and side effects

#### 2. TypeScript Interfaces
- All props are typed with interfaces
- Use `readonly` for immutable props

#### 3. Default Exports
- Components use default exports
- Utilities use named exports

#### 4. File Naming
- Components: `ComponentName.tsx`
- Utilities: `utilityName.ts`
- Types: `types.ts`

### Error Handling

#### Error Boundaries
- Route-level error boundaries catch rendering errors
- Prevents entire app from crashing
- Provides fallback UI

#### Pattern
```typescript
<ErrorBoundary>
  <SuspenseRoute>
    <Component />
  </SuspenseRoute>
</ErrorBoundary>
```

### Loading States

#### SuspenseRoute Component
- Wraps lazy-loaded components
- Provides loading fallback
- Consistent loading experience across app

---

## Build Tooling

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
})
```

### Why Vite?
1. **Speed**: Instant server start, fast HMR
2. **Optimization**: Automatic code splitting, tree shaking
3. **Modern**: Native ESM, optimized for modern browsers
4. **Developer Experience**: Better error messages, faster feedback

### Build Scripts
- `dev`: Development server with HMR
- `build`: Production build with TypeScript checking
- `preview`: Preview production build locally

---

## Component Architecture

### Layout Components
- **Header**: Navigation and branding
- **Footer**: Site footer with links
- **App**: Main layout wrapper with `<Outlet />` for nested routes

### Reusable Components
- **LoadingFallback**: Consistent loading UI
- **SuspenseRoute**: Suspense wrapper for routes
- **ProtectedRoute**: Authentication guard

### Page Components
- Located in `src/pages/`
- Each page is a route-level component
- Lazy loaded for performance

---

## Best Practices

### 1. Code Splitting
- All routes are lazy loaded
- Reduces initial bundle size
- Improves load time

### 2. Type Safety
- All components typed with TypeScript
- Interfaces for props and state
- Type-safe routing configuration

### 3. Performance
- Lazy loading routes
- Selective Zustand subscriptions
- Optimized Vite builds

### 4. Maintainability
- Clear file structure
- Consistent naming conventions
- Centralized route configuration
- Reusable components

### 5. Developer Experience
- Fast HMR with Vite
- TypeScript for better IDE support
- Clear error messages
- Consistent patterns

---

## Future Considerations

### Potential Additions
1. **Testing**: Add Vitest for unit testing
2. **E2E Testing**: Playwright or Cypress
3. **Form Handling**: React Hook Form
4. **API Client**: Axios or Fetch wrapper
5. **Internationalization**: react-i18next
6. **Theme Management**: CSS variables or styled-components
7. **Analytics**: Google Analytics or similar
8. **Error Tracking**: Sentry or similar

---

## Summary

This architecture prioritizes:
- **Developer Experience**: Fast feedback, type safety, clear patterns
- **Performance**: Code splitting, lazy loading, optimized builds
- **Maintainability**: Clear structure, consistent patterns, good documentation
- **Scalability**: Easy to extend, modular architecture, separation of concerns

The tech stack is modern, lightweight, and production-ready while maintaining simplicity and developer productivity.

