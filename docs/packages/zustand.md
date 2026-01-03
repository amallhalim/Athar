# Zustand Documentation

## Overview
**Zustand 5.0.9** - A small, fast, and scalable state management solution. Minimal boilerplate, no providers needed.

## Why Zustand?
- **Simple API**: Easy to learn and use
- **No Boilerplate**: No providers, reducers, or actions
- **TypeScript**: Excellent type inference
- **Performance**: Selective subscriptions prevent unnecessary re-renders
- **Small Size**: ~1KB bundle size
- **Flexible**: Works for both simple and complex state

## Key Features

### 1. Creating a Store

```typescript
import { create } from 'zustand';

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useBear = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useBear;
```

### 2. Using a Store in Components

#### Basic Usage
```tsx
import useBear from '../store/bear.store';

function BearCounter() {
  const bears = useBear((state) => state.bears);
  const increasePopulation = useBear((state) => state.increasePopulation);
  
  return (
    <div>
      <p>{bears} bears around here...</p>
      <button onClick={increasePopulation}>Add Bear</button>
    </div>
  );
}
```

#### Multiple Selectors
```tsx
// ✅ Good: Single selector for multiple values
const { bears, increasePopulation, removeAllBears } = useBear((state) => ({
  bears: state.bears,
  increasePopulation: state.increasePopulation,
  removeAllBears: state.removeAllBears,
}));

// ❌ Avoid: Multiple hook calls (causes multiple re-renders)
const bears = useBear((state) => state.bears);
const increasePopulation = useBear((state) => state.increasePopulation);
```

#### Selective Subscriptions
```tsx
// Only re-renders when 'bears' changes
const bears = useBear((state) => state.bears);

// Only re-renders when 'user.name' changes
const userName = useUser((state) => state.user.name);
```

### 3. Updating State

#### Simple Updates
```typescript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```

#### Async Updates
```typescript
const useStore = create((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true });
    const data = await fetch('/api/data').then(res => res.json());
    set({ data, loading: false });
  },
}));
```

#### Complex State Updates
```typescript
const useStore = create((set) => ({
  user: { name: '', age: 0 },
  setUser: (user) => set({ user }),
  updateUserName: (name) => set((state) => ({
    user: { ...state.user, name }
  })),
}));
```

### 4. Store Patterns in This Project

#### User Store Example
```typescript
// src/store/user.store.ts
import { create } from "zustand";

interface User {
  name: string;
  age: number;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const useUser = create<UserStore>((set) => ({
  user: {
    name: "",
    age: 0,
  },
  setUser: (user: User) => set({ user }),
}));

export default useUser;
```

#### Bear Store Example
```typescript
// src/store/bear.store.ts
import { create } from 'zustand';

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const useBear = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export default useBear;
```

### 5. Advanced Features

#### Middleware (Persistence)
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage', // localStorage key
    }
  )
);
```

#### DevTools
```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: 'BearStore' }
  )
);
```

#### Immer (for complex state)
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create(
  immer((set) => ({
    items: [],
    addItem: (item) => set((state) => {
      state.items.push(item); // Can mutate directly with Immer
    }),
  }))
);
```

## Best Practices

### 1. Type Your Stores
```typescript
// ✅ Always define interface
interface StoreState {
  count: number;
  increment: () => void;
}

const useStore = create<StoreState>((set) => ({
  // ...
}));
```

### 2. Use Selective Subscriptions
```tsx
// ✅ Good: Only subscribes to 'count'
const count = useStore((state) => state.count);

// ❌ Bad: Subscribes to entire store
const store = useStore();
```

### 3. Group Related State
```typescript
// ✅ Good: Related state together
interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}
```

### 4. Keep Stores Focused
```typescript
// ✅ Good: Single responsibility
const useUser = create<UserStore>(...);
const useCart = create<CartStore>(...);

// ❌ Bad: Too many responsibilities
const useApp = create<AppStore>(...); // Everything in one store
```

### 5. Use Actions, Not Direct Setters
```typescript
// ✅ Good: Semantic actions
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// ❌ Avoid: Generic setter
const useStore = create((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
}));
```

## Common Patterns in This Project

### Store File Structure
```typescript
// src/store/[name].store.ts
import { create } from 'zustand';

interface StoreState {
  // State properties
  // Action methods
}

const useStore = create<StoreState>((set) => ({
  // Initial state
  // Actions
}));

export default useStore;
```

### Component Usage Pattern
```tsx
import useStore from '../store/store';

function Component() {
  const { state, action } = useStore((state) => ({
    state: state.state,
    action: state.action,
  }));
  
  return <div>{/* ... */}</div>;
}
```

## When to Use Zustand vs Other Solutions

### Use Zustand When:
- ✅ Need simple global state
- ✅ Want minimal boilerplate
- ✅ Need good TypeScript support
- ✅ Want small bundle size
- ✅ Need selective subscriptions

### Consider Alternatives When:
- ❌ Need time-travel debugging (use Redux)
- ❌ Need server state management (use React Query)
- ❌ Need form state (use React Hook Form)
- ❌ Need component-level state (use useState)

## Resources
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Zustand Middleware](https://github.com/pmndrs/zustand#middleware)

