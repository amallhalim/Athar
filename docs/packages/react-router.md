# React Router Documentation

## Overview
**React Router 7.11.0** - Declarative routing for React applications. Enables navigation between different views/components in a single-page application.

## Why React Router?
- **Declarative Routing**: Define routes as configuration
- **TypeScript Support**: Full type safety for routes
- **Data Loading**: Built-in loaders and actions
- **Nested Routing**: Support for complex route hierarchies
- **Code Splitting**: Easy integration with lazy loading
- **History Management**: Browser history API integration

## Key Features Used in This Project

### 1. Data Router (createBrowserRouter)
We use the Data Router API (not the Component Router) for modern features.

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './routes/RoutesApps';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
```

**Why Data Router?**
- ✅ Loaders (fetch data before render)
- ✅ Actions (handle form submissions)
- ✅ Better error handling
- ✅ Automatic revalidation
- ✅ Future-proof approach

### 2. Route Configuration
Routes are defined as objects in `src/routes/RoutesApps.tsx`.

```tsx
import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];
```

### 3. Route Types

#### Basic Route
```tsx
{
  path: "about",
  id: "about",
  element: <About />,
  handle: {
    title: "About",
    breadcrumb: "About",
  },
}
```

#### Index Route
```tsx
{
  index: true,  // No path needed!
  id: "home",
  element: <Home />,
}
```

#### Dynamic Route
```tsx
{
  path: ":id",  // Parameter
  id: "user-detail",
  element: <UserDetail />,
}

// Access in component:
import { useParams } from 'react-router';
const { id } = useParams();
```

#### Nested Routes
```tsx
{
  path: "dashboard",
  element: <Dashboard />,  // Must have <Outlet />
  children: [
    {
      index: true,
      element: <DashboardOverview />,
    },
    {
      path: "settings",
      element: <DashboardSettings />,
    },
  ],
}
```

### 4. Navigation Hooks

#### useNavigate
Programmatic navigation.

```tsx
import { useNavigate } from 'react-router';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/about');
    // or
    navigate('/about', { replace: true });
    // or
    navigate(-1); // Go back
  };
  
  return <button onClick={handleClick}>Go to About</button>;
}
```

#### useParams
Access route parameters.

```tsx
import { useParams } from 'react-router';

function UserDetail() {
  const { id } = useParams<{ id: string }>();
  return <div>User ID: {id}</div>;
}
```

#### useSearchParams
Access and modify URL query parameters.

```tsx
import { useSearchParams } from 'react-router';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const updateQuery = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };
  
  return <input value={query || ''} onChange={(e) => updateQuery(e.target.value)} />;
}
```

#### useLocation
Access current location object.

```tsx
import { useLocation } from 'react-router';

function MyComponent() {
  const location = useLocation();
  // location.pathname
  // location.search
  // location.hash
  // location.state
}
```

#### useRouteLoaderData
Access loader data from any route.

```tsx
import { useRouteLoaderData } from 'react-router';

function Component() {
  const data = useRouteLoaderData('route-id');
  return <div>{data}</div>;
}
```

### 5. Navigation Components

#### Link
Declarative navigation.

```tsx
import { Link } from 'react-router';

<Link to="/about">About</Link>
<Link to="/user/123" state={{ from: 'home' }}>User Profile</Link>
```

#### NavLink
Link with active state styling.

```tsx
import { NavLink } from 'react-router';

<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>
```

#### Navigate
Programmatic redirect component.

```tsx
import { Navigate } from 'react-router';

// In route config
{
  path: "old-path",
  element: <Navigate to="/new-path" replace />,
}
```

### 6. Outlet Component
Renders child routes in nested routing.

```tsx
import { Outlet } from 'react-router';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />  {/* Child routes render here */}
    </div>
  );
}
```

### 7. Route Handles
Custom metadata for routes (used extensively in this project).

```tsx
{
  path: "about",
  handle: {
    title: "About Us",
    breadcrumb: "About",
    icon: "ℹ️",
    description: "Learn about our company",
    // SEO
    metaTitle: "About - My App",
    metaDescription: "Learn about us",
    // Analytics
    analytics: {
      pageView: "about_page",
    },
  },
}
```

### 8. Error Handling

#### Error Boundaries
Route-level error handling.

```tsx
{
  path: "about",
  element: <About />,
  errorElement: <ErrorBoundary />,
}
```

### 9. Loaders (Data Loading)
Fetch data before rendering (not used yet, but available).

```tsx
// In route config
{
  path: "user/:id",
  loader: async ({ params }) => {
    const user = await fetchUser(params.id);
    return { user };
  },
  element: <UserDetail />,
}

// In component
import { useLoaderData } from 'react-router';

function UserDetail() {
  const { user } = useLoaderData();
  return <div>{user.name}</div>;
}
```

### 10. Actions (Form Handling)
Handle form submissions (not used yet, but available).

```tsx
{
  path: "user/:id/edit",
  action: async ({ request, params }) => {
    const formData = await request.formData();
    const user = await updateUser(params.id, formData);
    return redirect(`/user/${params.id}`);
  },
  element: <EditUser />,
}
```

## Protected Routes Pattern

We use a `ProtectedRoute` wrapper component:

```tsx
import { Navigate } from 'react-router';

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

// Usage in route config
{
  path: "dashboard",
  element: (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Dashboard />
    </ProtectedRoute>
  ),
}
```

## Lazy Loading Pattern

All routes are lazy loaded for code splitting:

```tsx
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));

// In route config
{
  path: "/",
  element: (
    <SuspenseRoute>
      <Home />
    </SuspenseRoute>
  ),
}
```

## Best Practices

### 1. Always Add Route ID
```tsx
{
  id: "about",  // ✅ Makes route identifiable
  path: "about",
  element: <About />,
}
```

### 2. Use Route Handles
```tsx
{
  handle: {
    title: "About",
    breadcrumb: "About",
    icon: "ℹ️",
  },
}
```

### 3. Error Boundaries
```tsx
{
  errorElement: <ErrorBoundary />,  // ✅ Route-level error handling
  element: <Component />,
}
```

### 4. Type Safety
```tsx
import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  // ...
];
```

## Common Patterns in This Project

### Route Configuration Structure
```tsx
{
  path: "route-name",
  id: "route-id",
  caseSensitive: false,
  element: (
    <SuspenseRoute>
      <Component />
    </SuspenseRoute>
  ),
  errorElement: <ErrorBoundary />,
  handle: {
    title: "Page Title",
    breadcrumb: "Breadcrumb",
    // ... metadata
  },
}
```

## Resources
- [React Router Documentation](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Data Router Guide](https://reactrouter.com/en/main/routers/data-router)

