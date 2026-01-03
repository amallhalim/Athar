# Documentation

Welcome to the project documentation. This folder contains comprehensive documentation about the project's architecture, patterns, packages, and best practices.

## 📚 Documentation Structure

```
docs/
├── ARCHITECTURE.md          # Project architecture overview
├── packages/                # Package-specific documentation
│   ├── react.md
│   ├── react-router.md
│   ├── zustand.md
│   ├── vite.md
│   ├── typescript.md
│   ├── sass.md
│   └── lucide-react.md
└── guides/                  # How-to guides
    └── routing-guide.md
```

## 📖 Available Documentation

### Architecture
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete architecture documentation
  - Technology stack and rationale
  - Project structure
  - State management patterns
  - Routing architecture
  - Code patterns and conventions
  - Build tooling
  - Component architecture

### Packages Documentation
Detailed documentation for each package used in the project:

- **[React](./packages/react.md)** - UI Framework
  - Hooks, components, patterns
  - React 19 features
  - Best practices

- **[React Router](./packages/react-router.md)** - Routing library
  - Route configuration
  - Navigation hooks
  - Protected routes
  - Data loading

- **[Zustand](./packages/zustand.md)** - State management
  - Store creation
  - Usage patterns
  - Best practices

- **[React Error Boundary](./packages/react-error-boundary.md)** - Error handling
  - Error boundary component
  - Error recovery
  - Best practices

- **[Vite](./packages/vite.md)** - Build tool
  - Configuration
  - Development server
  - Production builds

- **[TypeScript](./packages/typescript.md)** - Type safety
  - Type annotations
  - Interfaces and types
  - React with TypeScript

- **[Sass](./packages/sass.md)** - CSS preprocessor
  - Variables, nesting, mixins
  - Best practices

- **[Lucide React](./packages/lucide-react.md)** - Icon library
  - Icon usage
  - Styling options
  - Best practices

### Guides
- **[Routing Guide](./guides/routing-guide.md)** - Complete React Router guide
  - Route types
  - How to add routes
  - Best practices
  - Examples

## 🚀 Quick Reference

### Tech Stack
- **React 19.2.3** - UI Framework
- **React Router 7.11.0** - Routing
- **Zustand 5.0.9** - State Management
- **React Error Boundary 6.0.1** - Error Handling
- **Vite 7.2.4** - Build Tool
- **TypeScript 5.9.3** - Type Safety
- **Sass 1.97.1** - Styling
- **Lucide React 0.562.0** - Icons

### Key Patterns
- Lazy loading for all routes
- Zustand for global state
- TypeScript for type safety
- Error boundaries for error handling
- Suspense for loading states

## 📝 How to Use This Documentation

### For New Developers
1. Start with [ARCHITECTURE.md](./ARCHITECTURE.md) for project overview
2. Read package docs in `packages/` for specific technologies
3. Refer to guides in `guides/` for how-to instructions

### For Specific Tasks
- **Adding a new route?** → [Routing Guide](./guides/routing-guide.md)
- **Creating a store?** → [Zustand Documentation](./packages/zustand.md)
- **Handling errors?** → [React Error Boundary Documentation](./packages/react-error-boundary.md)
- **Styling components?** → [Sass Documentation](./packages/sass.md)
- **Using React hooks?** → [React Documentation](./packages/react.md)

## 🤝 Contributing

When adding new features or making changes:
1. Follow the established patterns
2. Update relevant documentation
3. Maintain type safety
4. Keep components reusable
5. Document new packages in `packages/` folder

## ❓ Questions?

- **Architecture questions?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Package usage?** → Check `packages/` folder
- **How-to guides?** → Check `guides/` folder

