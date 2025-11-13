---
name: project-design-system
description: Applies organization's design system including color scheme, spacing guidelines, and component patterns to code artifacts. Use when creating or modifying UI components, styling elements, working with the project's React/TypeScript codebase, or when the user references design system, color palette, spacing, or component usage.
---

# Project Design System

## Overview

This skill provides the organization's design system guidelines for consistent UI development. Apply these standards when creating or modifying components, styling, and layouts.

**Keywords**: design system, color palette, UI components, spacing, padding, theme colors, component library, badges, buttons, styling

## Color Palette

### Primary Colors
Use for main brand elements, CTAs, and primary interactions:

```typescript
primary: {
  100: '#fff5da',  // Lightest
  200: '#ffe7b6',
  300: '#ffd892',
  400: '#ffc777',
  500: '#ffac4a',  // Default
  600: '#ff964a',
  700: '#ff813a',
  800: '#fe6d1b',
  900: '#e65300',  // Darkest
  1000: '#f9d17b',
  DEFAULT: '#ffac4a',
}
```

### Secondary Colors
Use for text, backgrounds, and secondary elements:

```typescript
secondary: {
  100: '#ffffff',  // White
  500: '#30302f',  // Default - Dark text
  900: '#000000',  // Black
  DEFAULT: '#30302f',
}
```

### Tertiary Colors
Use for accents, highlights, and interactive elements:

```typescript
tertiary: {
  100: '#ccf9ff',  // Lightest
  200: '#99edff',
  300: '#66daff',
  400: '#3fc5ff',
  500: '#00a3ff',  // Default
  600: '#007edb',
  700: '#005eb7',
  800: '#004393',
  900: '#002f7a',  // Darkest
  DEFAULT: '#00a3ff',
}
```

### Grey Scale
Use for borders, dividers, and neutral elements:

```typescript
grey: {
  50: '#f0f0f0',   // Lightest
  100: '#f2f2f2',
  200: '#dedede',
  300: '#c6c6c6',
  400: '#acacac',
  500: '#949494',  // Default
  600: '#636363',
  700: '#313131',  // Darkest
  DEFAULT: '#949494',
}
```

### Common Utilities
Use for standard UI elements:

```typescript
common: {
  black: '#000000',
  divider: '#DEDEDE',
  white: '#ffffff',
  bg: '#f7f7f7',       // Background
  disable: '#f0f0f0',   // Disabled state
  DEFAULT: '#000000',
}
```

### Status Colors
Use for feedback, alerts, and state indicators:

```typescript
status: {
  danger: '#ff271c',    // Errors, destructive actions
  info: '#0075ff',      // Informational messages
  success: '#1cc500',   // Success states
  warning: '#ffe600',   // Warnings, caution
  connected: '#57B62D', // Connected/active states
}
```

### Other Colors

```typescript
other: {
  orange: '#FCA235',    // Alternative orange accent
}
```

## Spacing Guidelines

### Padding and Margins

**CRITICAL**: Always use tight spacing between elements. Avoid excessive padding or margins.

- **Between elements**: Use `gap-1` to `gap-3` (4px to 12px) for tight layouts
- **Within components**: Prefer `p-1` to `p-3` (4px to 12px) for internal padding
- **Section spacing**: Maximum `gap-4` or `p-4` (16px) for larger sections
- **Avoid**: Large spacing values like `gap-8`, `p-8`, or higher unless specifically required

### Spacing Examples

```typescript
// ✅ CORRECT - Tight spacing
<div className="flex gap-2 p-2">
  <Button />
  <Button />
</div>

// ❌ INCORRECT - Too much spacing
<div className="flex gap-8 p-8">
  <Button />
  <Button />
</div>
```

## Component Usage

### Component Source

**ALWAYS** import components from the design system folder:

```typescript
// ✅ CORRECT
import { Button } from '@/components/design-system/Button';
import { Badge } from '@/components/design-system/Badge';

// ❌ INCORRECT - Don't create new components
import { Button } from './components/Button';
```

### Component Discovery

Before creating a new component:
1. Check `@/components/design-system/` for existing components
2. Reuse and compose existing components when possible
3. Only create new components if truly necessary

### Button Usage

[TODO: Add specific button usage examples and patterns from the codebase]

**Placeholder guidance:**
- Reference existing button implementations in the design system
- Follow established patterns for variants (primary, secondary, tertiary)
- Apply proper color mapping from the palette above

### Badge Components

**Status Badges**: Use status colors for state indicators:

```typescript
// Status badge color mapping
danger → status.danger (#ff271c)
info → status.info (#0075ff)
success → status.success (#1cc500)
warning → status.warning (#ffe600)
connected → status.connected (#57B62D)
```

**Badge Styling**:
- Keep badges compact with tight padding (`px-2 py-1`)
- Use appropriate status colors
- Ensure text contrast meets accessibility standards
- Round corners appropriately (`rounded-md` or `rounded-full`)

[TODO: Add specific badge usage examples from the codebase]

## Best Practices

### Color Usage
- Use semantic color names (e.g., `text-primary-500` instead of `text-[#ffac4a]`)
- Reference colors via Tailwind config or theme object
- Maintain consistent color application across similar components

### Responsive Design
- Maintain tight spacing across all breakpoints
- Adjust spacing proportionally for mobile vs desktop
- Test components at all breakpoint sizes

### Accessibility
- Ensure sufficient color contrast ratios
- Use status colors appropriately for semantic meaning
- Don't rely solely on color to convey information

### Code Organization
- Group related components in the design system folder
- Create composition-friendly components
- Keep component APIs consistent across the design system

## Development Workflow

1. **Check design system first**: Always look for existing components
2. **Apply color palette**: Use defined theme colors, not arbitrary hex values
3. **Use tight spacing**: Follow spacing guidelines for consistent density
4. **Test responsive**: Verify spacing and colors across breakpoints
5. **Maintain consistency**: Follow established patterns in existing components
