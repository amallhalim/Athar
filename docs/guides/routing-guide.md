# 📚 Complete React Router Guide

---

## 🎯 How Routes Work

React Router uses a **route configuration** to map URLs to components. When a user navigates to a URL, React Router:

1. Matches the URL against route patterns
2. Renders the matching component
3. Handles nested routes with `<Outlet />`
4. Manages navigation state and history

---

## 🏗️ Route Architecture

### Data Router vs Component Router

We use **Data Router** (`createBrowserRouter`) because:

#### ✅ **Better Features:**
- Loaders (fetch data before render)
- Actions (handle form submissions)
- Better error handling
- Automatic revalidation
- Future-proof (React Router's direction)

#### ❌ **Component Router** (`BrowserRouter`) limitations:
- No loaders/actions
- Less powerful error handling
- Older approach

> **💡 Why Data Router?** It's the modern, recommended approach with more features.

---

## 📋 Route Types & How to Add Them

### 1️⃣ Basic Route

**What it is:** Simple route with a path and component.

**When to use:** Standard pages like About, Contact, Home.

**How to add:**

```tsx
{
  path: "about",
  id: "about",
  element: <About />,
  handle: {
    title: "About Us",
    breadcrumb: "About",
    icon: "ℹ️",
  },
}
```

**Example URLs:**
- `/contact` - Contact page
- `/settings` - Settings page
- `/about` - About page

---

### 2️⃣ Index Route

**What it is:** Default route for a parent path (renders at parent's path).

**When to use:** Home page, default dashboard view.

**How to add:**

```tsx
{
  index: true,  // ✅ No path needed!
  id: "home",
  element: <Home />,
  handle: {
    title: "Home",
    breadcrumb: "Home",
  },
}
```

**Example URL:**
- `/` - Home page (index of root)

---

### 3️⃣ Dynamic Route

**What it is:** Route with parameters (like `/users/:id`).

**When to use:** Detail pages, edit pages, user profiles.

**How to add:**

```tsx
{
  path: ":pid",  // ✅ :pid is the parameter
  id: "project-detail",
  element: <ProjectDetail />,
  handle: {
    title: "Project Details",
    breadcrumb: "Project",
  },
}
```

**Example URLs:**
- `/projects/1` - Project with ID 1
- `/projects/abc` - Project with ID "abc"

**Access parameter in component:**
```tsx
import { useParams } from 'react-router';

function ProjectDetail() {
  const { pid } = useParams<{ pid: string }>();
  return <div>Project ID: {pid}</div>;
}
```

---

### 4️⃣ Nested Route

**What it is:** Routes inside other routes (parent-child relationship).

**When to use:** Dashboard with sub-pages, settings sections.

**How to add:**

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

**Parent component must have `<Outlet />`:**
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

**Example URLs:**
- `/dashboard` - Dashboard overview (index)
- `/dashboard/settings` - Dashboard settings

---

### 5️⃣ Protected Route

**What it is:** Route that requires authentication.

**When to use:** Admin pages, user dashboard, private content.

**How to add:**

```tsx
{
  path: "dashboard",
  element: (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Dashboard />
    </ProtectedRoute>
  ),
  handle: {
    requiresAuth: true,
    roles: ["user", "admin"],
  },
}
```

**ProtectedRoute component:**
```tsx
import { Navigate } from 'react-router';

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
```

---

### 6️⃣ Query Parameters

**What it is:** URL parameters after `?` (e.g., `/search?q=react&page=1`).

**When to use:** Search, filters, pagination.

**How to use:**

```tsx
import { useSearchParams } from 'react-router';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  const updateQuery = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: '1' });
  };
  
  return (
    <div>
      <input 
        value={query || ''} 
        onChange={(e) => updateQuery(e.target.value)} 
      />
      <p>Page: {page}</p>
    </div>
  );
}
```

**Example URLs:**
- `/search?q=react` - Search for "react"
- `/products?category=electronics&page=2` - Filtered products

---

### 7️⃣ Case-Sensitive Route

**What it is:** Route that matches exact case.

**When to use:** API endpoints, special paths.

**How to add:**

```tsx
{
  path: "CaseSensitive",
  caseSensitive: true,  // ✅ Must match exact case
  id: "case-sensitive-route",
  element: <CaseSensitivePage />,
}
```

**Example URLs:**
- `/CaseSensitive` ✅ - Matches
- `/casesensitive` ❌ - Doesn't match
- `/CASESENSITIVE` ❌ - Doesn't match

---

### 8️⃣ Redirect Route

**What it is:** Route that automatically redirects to another path.

**When to use:** Old URLs, deprecated routes, URL changes.

**How to add:**

```tsx
{
  path: "old-path",
  id: "old-path-redirect",
  element: <Navigate to="/new-path" replace />,
}
```

**Example:**
- User visits `/old-path` → Automatically redirected to `/new-path`

---

### 9️⃣ 404 Catch-All Route

**What it is:** Route that matches any unmatched URL.

**When to use:** 404 Not Found page.

**How to add:**

```tsx
{
  path: "*",  // ✅ Must be LAST in routes array!
  id: "not-found",
  element: <NotFound />,
}
```

**⚠️ Important:** Must be the last route in the array!

---

## 🎯 Route Type Decision Tree

```
Need authentication?
├─ Yes → Use ProtectedRoute wrapper
└─ No → Continue

Need URL parameters?
├─ Yes → Use :param in path (e.g., ":id")
└─ No → Continue

Need nested pages?
├─ Yes → Use children array + <Outlet />
└─ No → Continue

Need query params?
├─ Yes → Use useSearchParams() hook
└─ No → Continue

Default route for parent?
├─ Yes → Use index: true
└─ No → Use path: "route-name"
```

---

## ✅ Best Practices

### 1. Always Add `id`
```tsx
{
  id: "about",  // ✅ Makes route identifiable
  path: "about",
  element: <About />,
}
```

### 2. Always Add `handle`
```tsx
{
  handle: {
    title: "About",
    breadcrumb: "About",
    icon: "ℹ️",
  },
}
```

### 3. Use `errorElement` for Error Handling
```tsx
{
  errorElement: <ErrorBoundary />,  // ✅ Route-level error handling
  element: <Component />,
}
```

### 4. Organize Routes Logically
```tsx
// ✅ Group related routes
{
  path: "dashboard",
  children: [
    { path: "overview", ... },
    { path: "settings", ... },
  ],
}
```

### 5. Use Descriptive IDs
```tsx
id: "project-detail"  // ✅ Clear and descriptive
id: "pd"              // ❌ Too short, unclear
```

---

## 🔍 Route Matching Rules

1. **Exact Match First:** `/projects/1` matches before `/projects/:id`
2. **Longest Path First:** `/projects/1/edit` matches before `/projects/:id`
3. **Index Routes:** Match when parent path is exact match
4. **Catch-All Last:** `*` must be last route

---

## 📊 Route Examples by Type

| Type | Code Example | URL Example |
|:----:|:------------|:------------|
| **Basic** | `{ path: "about", element: <About /> }` | `/about` |
| **Index** | `{ index: true, element: <Home /> }` | `/` |
| **Dynamic** | `{ path: ":id", element: <Detail /> }` | `/123`, `/abc` |
| **Nested** | `{ path: "dashboard", children: [...] }` | `/dashboard/settings` |
| **Protected** | `<ProtectedRoute><Admin /></ProtectedRoute>` | `/admin` |
| **Query Params** | Use `useSearchParams()` hook | `/search?q=react&page=1` |
| **Case Sensitive** | `{ path: "API", caseSensitive: true }` | `/API` ✅ |
| **Redirect** | `{ element: <Navigate to="/new" replace /> }` | `/old` → `/new` |
| **404** | `{ path: "*", element: <NotFound /> }` | Any unmatched |

---

## 🚀 Quick Reference

### Add Basic Route

1. Create component
2. Import component
3. Add route object with `path`, `id`, `element`, `handle`
4. Add link in Header (optional)

### Add Dynamic Route

1. Use `:param` in path
2. Access with `useParams()` hook
3. Add `handle` with dynamic title if needed

### Add Nested Route

1. Parent route needs `children` array
2. Parent component needs `<Outlet />`
3. Child routes use relative paths

### Add Protected Route

1. Wrap element with `<ProtectedRoute>`
2. Add `requiresAuth: true` in handle
3. Check authentication in ProtectedRoute component

---

## 💡 Why This Approach?

### ✅ Data Router (`createBrowserRouter`)

- Modern and recommended
- Supports loaders/actions
- Better error handling
- Future-proof

### ✅ Route Objects (not JSX)

- Easier to manage
- Better TypeScript support
- Can be generated dynamically
- Cleaner code

### ✅ Handle Property

- Centralized metadata
- Easy breadcrumbs
- SEO-friendly
- Navigation menus

---

## 📚 Summary

| # | Route Type | Syntax |
|:-:|:----------|:-------|
| 1 | **Basic Route** | `{ path: "about", element: <About /> }` |
| 2 | **Index Route** | `{ index: true, element: <Home /> }` |
| 3 | **Dynamic Route** | `{ path: ":id", element: <Detail /> }` |
| 4 | **Nested Route** | `{ path: "parent", children: [...] }` |
| 5 | **Protected Route** | Wrap with `<ProtectedRoute>` |
| 6 | **Query Params** | Use `useSearchParams()` hook |
| 7 | **Case Sensitive** | `caseSensitive: true` |
| 8 | **Redirect** | `<Navigate to="/new" replace />` |
| 9 | **404** | `{ path: "*", element: <NotFound /> }` |

