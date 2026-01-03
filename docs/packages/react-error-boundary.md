# React Error Boundary Documentation

## Overview
**react-error-boundary 6.0.1** - A reusable React error boundary component. Provides a better API for error boundaries than the class component approach.

## Why react-error-boundary?
- **Simpler API**: No need to write class components
- **Reset Capability**: Reset error state without page reload
- **Better UX**: More control over error handling and recovery
- **TypeScript Support**: Full TypeScript support
- **Flexible**: Customizable fallback components and error handlers
- **Modern**: Works with React hooks and functional components

## Key Features

### 1. Basic Usage

```tsx
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 2. Error Fallback Component

The fallback component receives `error` and `resetErrorBoundary` props:

```tsx
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

### 3. Custom Error Handler

```tsx
function logErrorToService(error: Error, errorInfo: { componentStack: string }) {
  // Log to error tracking service (e.g., Sentry, LogRocket)
  console.error('Error:', error, errorInfo);
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={logErrorToService}
>
  <MyComponent />
</ErrorBoundary>
```

### 4. Reset Keys

Reset error boundary when specific values change:

```tsx
const [userId, setUserId] = useState(null);

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  resetKeys={[userId]}  // Resets when userId changes
>
  <UserProfile userId={userId} />
</ErrorBoundary>
```

### 5. onReset Callback

```tsx
function handleReset() {
  // Clear any error-related state
  console.log('Error boundary reset');
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={handleReset}
>
  <MyComponent />
</ErrorBoundary>
```

## Usage in This Project

### ReactErrorBoundary Component

We've created a wrapper component that uses `react-error-boundary`:

```tsx
// src/routes/ReactErrorBoundary.tsx
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";

export default function ReactErrorBoundary({
  children,
  fallback,
  onError,
  onReset,
}: ReactErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallback}
      onError={handleError}
      onReset={handleReset}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### ErrorFallback Component

Default error fallback with nice UI:

```tsx
// src/routes/components/ErrorFallback.tsx
export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div>
      <h1>⚠️ Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
      <button onClick={() => window.location.href = "/"}>Go Home</button>
    </div>
  );
}
```

### Usage Example

```tsx
import ReactErrorBoundary from "../../routes/ReactErrorBoundary";

function MyComponent() {
  return (
    <ReactErrorBoundary>
      <ComponentThatMightError />
    </ReactErrorBoundary>
  );
}
```

## Advanced Features

### 1. Different Fallbacks for Different Errors

```tsx
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error.message.includes('Network')) {
    return <NetworkErrorFallback reset={resetErrorBoundary} />;
  }
  return <GenericErrorFallback error={error} reset={resetErrorBoundary} />;
}
```

### 2. Error Boundary with Context

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Access context or other values
        console.error('Error in context:', error);
      }}
    >
      <MyApp />
    </ErrorBoundary>
  );
}
```

### 3. Nested Error Boundaries

```tsx
<ErrorBoundary FallbackComponent={OuterFallback}>
  <Header />
  <ErrorBoundary FallbackComponent={InnerFallback}>
    <MainContent />
  </ErrorBoundary>
  <Footer />
</ErrorBoundary>
```

## Best Practices

### 1. Use Error Boundaries Strategically

```tsx
// ✅ Good: Wrap potentially error-prone sections
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <DataFetcher />
</ErrorBoundary>

// ❌ Avoid: Wrapping everything (defeats the purpose)
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <EntireApp />
</ErrorBoundary>
```

### 2. Provide Recovery Options

```tsx
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div>
      <p>Something went wrong</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
      <button onClick={() => window.location.href = "/"}>Go Home</button>
    </div>
  );
}
```

### 3. Log Errors

```tsx
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={(error, errorInfo) => {
    // Log to error tracking service
    logErrorToService(error, errorInfo);
  }}
>
  <MyComponent />
</ErrorBoundary>
```

### 4. Use Reset Keys

```tsx
// Reset when route changes
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  resetKeys={[location.pathname]}
>
  <RouteComponent />
</ErrorBoundary>
```

## Common Patterns in This Project

### Pattern 1: Component-Level Error Boundary

```tsx
import ReactErrorBoundary from "../../routes/ReactErrorBoundary";

function Page() {
  return (
    <ReactErrorBoundary>
      <ComponentThatMightError />
    </ReactErrorBoundary>
  );
}
```

### Pattern 2: Custom Error Handler

```tsx
<ReactErrorBoundary
  onError={(error, errorInfo) => {
    console.error('Component error:', error);
    // Send to error tracking service
  }}
>
  <MyComponent />
</ReactErrorBoundary>
```

### Pattern 3: Custom Fallback

```tsx
<ReactErrorBoundary
  fallback={<CustomErrorUI />}
>
  <MyComponent />
</ReactErrorBoundary>
```

## Difference from Route Error Boundaries

### Route Error Boundaries (React Router)
- Catches errors in route loaders/actions
- Uses `useRouteError()` hook
- Defined in route config with `errorElement`
- Used in: `src/pages/ErrorBoundary/ErrorBoundary.tsx`

### React Error Boundaries (react-error-boundary)
- Catches errors in component rendering
- Uses `ErrorBoundary` component
- Wraps components directly
- Used in: `src/routes/ReactErrorBoundary.tsx`

## Error Boundary Strategy: When to Use What

### Strategy 1: App-Level Error Boundary (Recommended for Most Projects)

**Place:** Wrap your entire app in `App.tsx`

```tsx
// App.tsx
function App() {
  return (
    <ReactErrorBoundary>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ReactErrorBoundary>
  );
}
```

**When to Use:**
- ✅ **Default choice** for most projects
- ✅ Small to medium applications
- ✅ Want simple, consistent error handling
- ✅ Don't need granular error recovery
- ✅ Want to catch ALL errors in one place

**Benefits:**
- Simple setup - one error boundary
- Consistent error UI across the app
- Catches errors in layout, routes, and components
- Easier to maintain

**Limitations:**
- If one component errors, entire app shows error UI
- Less granular control over error recovery

---

### Strategy 2: Component-Level Error Boundaries

**Place:** Wrap specific components that might fail

```tsx
// UserProfile.tsx
function UserProfile() {
  return (
    <ReactErrorBoundary
      fallback={<UserProfileError />}
      onReset={() => refetchUser()}
    >
      <UserData />
      <UserPosts />
    </ReactErrorBoundary>
  );
}
```

**When to Use:**
- ✅ **Critical components** that must not crash the app
- ✅ **Isolated features** (e.g., widgets, dashboards)
- ✅ **Third-party components** you don't control
- ✅ **Data-heavy components** that might fail
- ✅ Want **partial app recovery** (one widget fails, rest works)

**Benefits:**
- Isolated errors - one component fails, rest works
- Better UX - users can still use other parts
- Granular recovery - reset just the failed component
- Custom error UI per component

**Example Use Cases:**
```tsx
// Dashboard with multiple widgets
function Dashboard() {
  return (
    <div>
      <ReactErrorBoundary fallback={<WidgetError />}>
        <SalesWidget />
      </ReactErrorBoundary>
      
      <ReactErrorBoundary fallback={<WidgetError />}>
        <AnalyticsWidget />
      </ReactErrorBoundary>
      
      <ReactErrorBoundary fallback={<WidgetError />}>
        <UserActivityWidget />
      </ReactErrorBoundary>
    </div>
  );
}
```

---

### Strategy 3: Hybrid Approach (Best for Large Apps)

**Place:** App-level + component-level boundaries

```tsx
// App.tsx - Catches layout errors
function App() {
  return (
    <ReactErrorBoundary>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ReactErrorBoundary>
  );
}

// Dashboard.tsx - Catches widget errors
function Dashboard() {
  return (
    <div>
      <ReactErrorBoundary fallback={<WidgetError />}>
        <CriticalWidget />
      </ReactErrorBoundary>
    </div>
  );
}
```

**When to Use:**
- ✅ **Large applications** with many features
- ✅ **Complex UIs** with multiple independent sections
- ✅ Want **defense in depth** (multiple error boundaries)
- ✅ Need **different error handling** for different areas

**Benefits:**
- App-level catches catastrophic errors
- Component-level isolates feature failures
- Best of both worlds
- Maximum error recovery

---

## Decision Guide

### Use App-Level When:
```
✅ Small to medium app
✅ Simple error handling needs
✅ Want consistency
✅ Don't need granular recovery
```

### Use Component-Level When:
```
✅ Large, complex app
✅ Independent features/widgets
✅ Third-party components
✅ Need partial recovery
✅ Different error UIs per feature
```

### Use Hybrid When:
```
✅ Large enterprise app
✅ Multiple independent sections
✅ Want maximum error recovery
✅ Need defense in depth
```

---

## Current Project Strategy

**This project uses: App-Level Error Boundary**

- ✅ Simple and effective
- ✅ Catches all errors in one place
- ✅ Consistent error UI
- ✅ Easy to maintain

**Location:** `src/App.tsx`

```tsx
function App() {
  return (
    <ReactErrorBoundary>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ReactErrorBoundary>
  );
}
```

**If you need component-level boundaries later:**
- Add them around specific components
- They work alongside the app-level boundary
- Component-level catches first, then app-level

---

## When to Use

### Use React Error Boundary When:
- ✅ Component might throw during render
- ✅ Need to recover from errors without page reload
- ✅ Want better UX with reset capability
- ✅ Need error handling (app-level or component-level)

### Use Route Error Boundary When:
- ✅ Route loader/action fails
- ✅ Need route-level error handling
- ✅ Want to show error page for route

## Resources
- [react-error-boundary GitHub](https://github.com/bvaughn/react-error-boundary)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

