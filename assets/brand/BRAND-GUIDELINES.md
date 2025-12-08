# Ship Brand Guidelines

## Brand Colors

Our color palette is built on **purple** - representing creativity, innovation, and wisdom.

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Violet** | `#8B5CF6` | `139, 92, 246` | Primary brand color |
| **Indigo** | `#6366F1` | `99, 102, 241` | Secondary brand color |
| **Purple Light** | `#A78BFA` | `167, 139, 250` | Accents, highlights |
| **Purple Pale** | `#C4B5FD` | `196, 181, 253` | Borders, subtle elements |

### Background Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Dark Navy** | `#1E1B4B` | Dark mode backgrounds |
| **Deep Purple** | `#312E81` | Secondary dark backgrounds |
| **Light Purple** | `#F5F3FF` | Light mode backgrounds |
| **White** | `#FFFFFF` | Light mode primary |

### Accent Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Amber** | `#F59E0B` | Flame, energy, CTAs |
| **Gold** | `#FBBF24` | Highlights, success |
| **Cream** | `#FDE68A` | Subtle accents |

---

## Color Psychology

### Why Purple?

- **Creativity** - AI and innovation
- **Wisdom** - Intelligent code generation
- **Premium** - Professional quality
- **Technology** - Modern and forward-thinking

### Supporting Colors

- **Amber/Gold** - Energy, momentum, "shipping" speed
- **Navy** - Trust, stability, reliability

---

## Logo Variations

### Primary Logo
`ship-logo.svg` - Full color on dark background

### Wordmark
`ship-wordmark.svg` - Logo + "Ship" text + tagline

### Icon Only
- `ship-icon-light.svg` - For light backgrounds
- `ship-icon-dark.svg` - For dark backgrounds

### Badge
`ship-badge.svg` - "Powered by Ship" horizontal badge

---

## Usage Guidelines

### Do's
- Use consistent colors across all materials
- Maintain clear space around the logo
- Use the appropriate logo variant for background
- Keep the logo proportions intact

### Don'ts
- Don't change the logo colors
- Don't stretch or distort the logo
- Don't add effects (shadows, glows) to the logo
- Don't place on busy backgrounds

---

## Color Palette CSS

```css
:root {
  /* Primary */
  --ship-violet: #8B5CF6;
  --ship-indigo: #6366F1;
  --ship-purple-light: #A78BFA;
  --ship-purple-pale: #C4B5FD;
  
  /* Backgrounds */
  --ship-dark-navy: #1E1B4B;
  --ship-deep-purple: #312E81;
  --ship-light-purple: #F5F3FF;
  
  /* Accents */
  --ship-amber: #F59E0B;
  --ship-gold: #FBBF24;
  
  /* Text */
  --ship-text-light: #E0E7FF;
  --ship-text-dark: #1E1B4B;
}
```

---

## Tailwind CSS Config

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        ship: {
          violet: '#8B5CF6',
          indigo: '#6366F1',
          light: '#A78BFA',
          pale: '#C4B5FD',
          navy: '#1E1B4B',
          deep: '#312E81',
          bg: '#F5F3FF',
          amber: '#F59E0B',
          gold: '#FBBF24',
        }
      }
    }
  }
}
```
