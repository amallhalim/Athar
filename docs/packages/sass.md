# Sass/SCSS Documentation

## Overview
**Sass 1.97.1** - A CSS preprocessor that adds features like variables, nesting, mixins, and more to CSS.

## Why Sass?
- **Variables**: Reusable values (colors, sizes, etc.)
- **Nesting**: Better organization and readability
- **Mixins**: Reusable style blocks
- **Functions**: Built-in and custom functions
- **Partials**: Modular stylesheets
- **Better Organization**: Cleaner, more maintainable CSS

## Key Features

### 1. Variables
Store reusable values.

```scss
// Define variables
$primary-color: #3e9392;
$font-size-base: 16px;
$spacing-unit: 1rem;

// Use variables
.button {
  background-color: $primary-color;
  font-size: $font-size-base;
  padding: $spacing-unit;
}
```

### 2. Nesting
Nest selectors for better organization.

```scss
.navbar {
  background-color: #fff;
  
  .nav-item {
    padding: 1rem;
    
    &:hover {
      background-color: #f0f0f0;
    }
    
    a {
      text-decoration: none;
      color: #333;
    }
  }
}
```

**Compiles to:**
```css
.navbar { background-color: #fff; }
.navbar .nav-item { padding: 1rem; }
.navbar .nav-item:hover { background-color: #f0f0f0; }
.navbar .nav-item a { text-decoration: none; color: #333; }
```

### 3. Mixins
Reusable style blocks.

```scss
// Define mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Use mixin
.container {
  @include flex-center;
  height: 100vh;
}
```

**With Parameters:**
```scss
@mixin button($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

.primary-button {
  @include button(#007bff, #fff);
}

.danger-button {
  @include button(#dc3545, #fff);
}
```

### 4. Partials and Imports
Split styles into multiple files.

```scss
// _variables.scss (partial - starts with _)
$primary-color: #3e9392;
$secondary-color: #6c757d;

// _mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// main.scss
@import 'variables';
@import 'mixins';

.button {
  @include flex-center;
  background-color: $primary-color;
}
```

### 5. Functions
Built-in and custom functions.

```scss
// Built-in functions
$light-color: lighten($primary-color, 20%);
$dark-color: darken($primary-color, 20%);
$transparent: rgba($primary-color, 0.5);

// Custom function
@function calculate-rem($pixels) {
  @return $pixels / 16px * 1rem;
}

.font-size {
  font-size: calculate-rem(24px); // 1.5rem
}
```

### 6. Operators
Mathematical operations.

```scss
$base-size: 16px;

.container {
  width: $base-size * 10; // 160px
  padding: $base-size / 2; // 8px
  margin: $base-size + 4px; // 20px
}
```

### 7. Control Directives

#### @if, @else
```scss
$theme: 'dark';

.button {
  @if $theme == 'dark' {
    background-color: #333;
    color: #fff;
  } @else {
    background-color: #fff;
    color: #333;
  }
}
```

#### @for
```scss
@for $i from 1 through 5 {
  .col-#{$i} {
    width: percentage($i / 5);
  }
}
```

#### @each
```scss
$colors: red, blue, green;

@each $color in $colors {
  .text-#{$color} {
    color: $color;
  }
}
```

## Usage in This Project

### File Structure
```
src/
├── App.scss          # Main stylesheet
├── style.scss        # Global styles
└── components/
    └── Component.scss
```

### Import Pattern
```tsx
// In component
import './Component.scss';
```

### Global Styles
```scss
// style.scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## Best Practices

### 1. Use Variables for Colors
```scss
$primary-color: #3e9392;
$secondary-color: #6c757d;
$text-color: #333;
$bg-color: #fff;
```

### 2. Organize with Partials
```scss
// _variables.scss
// _mixins.scss
// _base.scss
// main.scss
```

### 3. Use Nesting Wisely
```scss
// ✅ Good: 2-3 levels max
.navbar {
  .nav-item {
    a { }
  }
}

// ❌ Bad: Too deep
.navbar {
  .nav-item {
    .link {
      .icon {
        .svg { } // Too deep!
      }
    }
  }
}
```

### 4. Use Mixins for Repeated Patterns
```scss
@mixin button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-primary {
  @include button-base;
  background-color: blue;
}
```

### 5. Use Functions for Calculations
```scss
@function spacing($multiplier) {
  @return $base-spacing * $multiplier;
}

.container {
  padding: spacing(2); // 2rem
}
```

## Common Patterns

### BEM with Sass
```scss
.block {
  &__element {
    // Block element
  }
  
  &--modifier {
    // Block modifier
  }
}
```

### Responsive Mixin
```scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'mobile' {
    @media (max-width: 768px) {
      @content;
    }
  }
  
  @if $breakpoint == 'tablet' {
    @media (min-width: 769px) and (max-width: 1024px) {
      @content;
    }
  }
}

.container {
  width: 100%;
  
  @include respond-to('mobile') {
    width: 100%;
  }
}
```

## Resources
- [Sass Documentation](https://sass-lang.com/documentation)
- [Sass Guide](https://sass-lang.com/guide)
- [Sass Functions](https://sass-lang.com/documentation/modules)

