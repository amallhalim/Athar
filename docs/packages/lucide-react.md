# Lucide React Documentation

## Overview
**Lucide React 0.562.0** - Beautiful & consistent icon toolkit. A collection of open-source icons for React applications.

## Why Lucide React?
- **Consistent Design**: All icons follow the same design language
- **Tree-Shakable**: Only import icons you use
- **TypeScript**: Full TypeScript support
- **Customizable**: Size, color, stroke width, and more
- **Large Collection**: 1000+ icons available
- **Lightweight**: Small bundle size

## Key Features

### 1. Basic Usage

```tsx
import { Home, User, Settings } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Home />
      <User />
      <Settings />
    </div>
  );
}
```

### 2. Icon Props

#### Size
```tsx
<Home size={24} />        // Default: 24
<Home size={48} />        // Larger
<Home size={16} />        // Smaller
```

#### Color
```tsx
<Home color="red" />
<Home color="#3e9392" />
<Home color="currentColor" />  // Inherits text color
```

#### Stroke Width
```tsx
<Home strokeWidth={1} />      // Thin
<Home strokeWidth={2} />      // Default: 2
<Home strokeWidth={3} />      // Thick
```

#### Absolute Stroke Width
```tsx
<Home absoluteStrokeWidth />  // Stroke scales with size
```

### 3. Styling Icons

#### With CSS Classes
```tsx
<Home className="icon-large" />
```

```scss
.icon-large {
  width: 48px;
  height: 48px;
  color: #3e9392;
}
```

#### Inline Styles
```tsx
<Home style={{ color: 'red', width: 32, height: 32 }} />
```

### 4. Common Patterns

#### Navigation Icons
```tsx
import { Home, User, Settings, Search } from 'lucide-react';

function Navigation() {
  return (
    <nav>
      <Home />
      <User />
      <Settings />
      <Search />
    </nav>
  );
}
```

#### Button Icons
```tsx
import { ThumbsUp, Heart, Share } from 'lucide-react';

function ActionButtons() {
  return (
    <div>
      <button>
        <ThumbsUp size={20} />
        Like
      </button>
      <button>
        <Heart size={20} />
        Favorite
      </button>
      <button>
        <Share size={20} />
        Share
      </button>
    </div>
  );
}
```

#### Status Icons
```tsx
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

function Status({ status }) {
  if (status === 'success') return <CheckCircle color="green" />;
  if (status === 'error') return <XCircle color="red" />;
  return <AlertCircle color="orange" />;
}
```

## Usage in This Project

### Example from Home.tsx
```tsx
import {
  FolderLock,
  FolderLockIcon,
  PartyPopper,
  Smile,
  ThumbsUp,
} from 'lucide-react';

function Home() {
  return (
    <div>
      <Smile color="#3e9392" />
      <ThumbsUp size={64} />
      <PartyPopper className="w-24 h-144" color="red" />
      <FolderLockIcon strokeWidth={2} absoluteStrokeWidth={true} />
    </div>
  );
}
```

## Best Practices

### 1. Import Only What You Need
```tsx
// ✅ Good: Tree-shakable
import { Home, User } from 'lucide-react';

// ❌ Bad: Imports everything
import * as Icons from 'lucide-react';
```

### 2. Use Consistent Sizes
```tsx
// Define standard sizes
const iconSizes = {
  small: 16,
  medium: 24,
  large: 32,
};

<Home size={iconSizes.medium} />
```

### 3. Use Semantic Colors
```tsx
// ✅ Good: Semantic
<CheckCircle color="green" />
<XCircle color="red" />

// ❌ Avoid: Hard-coded colors everywhere
<CheckCircle color="#00ff00" />
```

### 4. Combine with Text
```tsx
<button>
  <ThumbsUp size={20} />
  <span>Like</span>
</button>
```

### 5. Accessibility
```tsx
<Home aria-label="Home page" />
// Or wrap in semantic HTML
<button aria-label="Home">
  <Home />
</button>
```

## Icon Categories

### Navigation
- `Home`, `Menu`, `ArrowLeft`, `ArrowRight`, `ChevronDown`

### Actions
- `Plus`, `Minus`, `Edit`, `Trash`, `Save`, `Download`

### Status
- `CheckCircle`, `XCircle`, `AlertCircle`, `Info`

### Social
- `Heart`, `ThumbsUp`, `Share`, `MessageCircle`

### Files
- `File`, `Folder`, `FolderOpen`, `Download`, `Upload`

### Search
- `Search`, `Filter`, `X` (close)

## Finding Icons

1. Visit [Lucide Icons](https://lucide.dev/icons/)
2. Search for the icon you need
3. Click on the icon to see usage
4. Import and use in your component

## Resources
- [Lucide Icons Website](https://lucide.dev/)
- [Lucide React GitHub](https://github.com/lucide-icons/lucide)
- [Icon Search](https://lucide.dev/icons/)

