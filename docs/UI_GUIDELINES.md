# 🎨 Ship UI/UX Guidelines

Concise rules for building accessible, fast, delightful interfaces in Ship. Use **MUST/SHOULD/NEVER** to guide decisions.

> Based on [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)

---

## Table of Contents

- [Interactions](#interactions)
- [Animation](#animation)
- [Layout](#layout)
- [Content & Accessibility](#content--accessibility)
- [Forms](#forms)
- [Performance](#performance)
- [Design](#design)

---

## Interactions

### Keyboard

| Rule | Description |
|------|-------------|
| **MUST** | Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/) |
| **MUST** | Visible focus rings (`:focus-visible`; group with `:focus-within`) |
| **MUST** | Manage focus (trap, move, and return) per APG patterns |

### Targets & Input

| Rule | Description |
|------|-------------|
| **MUST** | Hit target ≥24px (mobile ≥44px). If visual <24px, expand hit area |
| **MUST** | Mobile `<input>` font-size ≥16px to prevent iOS Safari auto-zoom |
| **NEVER** | Disable browser zoom |
| **MUST** | `touch-action: manipulation` to prevent double-tap zoom |

```html
<!-- Prevent iOS auto-zoom on input focus -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover">
```

### State & Navigation

| Rule | Description |
|------|-------------|
| **MUST** | URL reflects state (deep-link filters/tabs/pagination/expanded panels) |
| **MUST** | Back/Forward restores scroll position |
| **MUST** | Links are links—use `<a>/<Link>` for navigation |
| **MUST** | Support Cmd/Ctrl+Click and middle-click to open in new tab |

### Feedback

| Rule | Description |
|------|-------------|
| **SHOULD** | Optimistic UI; reconcile on response |
| **MUST** | Confirm destructive actions or provide Undo window |
| **MUST** | Use polite `aria-live` for toasts/inline validation |
| **SHOULD** | Ellipsis (`…`) for follow-ups ("Rename…") and loading ("Saving…") |

### Touch/Drag/Scroll

| Rule | Description |
|------|-------------|
| **MUST** | Design forgiving interactions (generous targets, clear affordances) |
| **MUST** | Delay first tooltip; subsequent peers have no delay |
| **MUST** | Set `overscroll-behavior: contain` in modals/drawers |
| **MUST** | During drag, disable text selection and set `inert` |
| **MUST** | No "dead-looking" interactive zones |

---

## Animation

| Rule | Description |
|------|-------------|
| **MUST** | Honor `prefers-reduced-motion` (provide reduced variant) |
| **SHOULD** | Prefer CSS > Web Animations API > JS libraries |
| **MUST** | Animate compositor-friendly props (`transform`, `opacity`) |
| **NEVER** | Animate layout props (`top`, `left`, `width`, `height`) |
| **MUST** | Animations are interruptible and input-driven (avoid autoplay) |
| **MUST** | Correct `transform-origin` anchored to where motion starts |

```css
/* Honor reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Minimum Loading Duration

```typescript
// Prevent flash on fast responses
const MIN_LOADING_DURATION = 300; // ms
const SHOW_DELAY = 150; // ms

async function withLoadingState<T>(fn: () => Promise<T>) {
  const start = Date.now();
  const result = await fn();
  const elapsed = Date.now() - start;
  
  if (elapsed < MIN_LOADING_DURATION) {
    await delay(MIN_LOADING_DURATION - elapsed);
  }
  
  return result;
}
```

---

## Layout

| Rule | Description |
|------|-------------|
| **SHOULD** | Optical alignment; adjust ±1px when perception beats geometry |
| **MUST** | Deliberate alignment—no accidental placement |
| **SHOULD** | Balance icon/text lockups (stroke/weight/size/spacing/color) |
| **MUST** | Verify mobile, laptop, ultra-wide viewports |
| **MUST** | Respect safe areas with `env(safe-area-inset-*)` |
| **MUST** | Avoid unwanted scrollbars; fix overflow issues |
| **SHOULD** | Let the browser size things (flex/grid over JS measuring) |

### Responsive Testing

```bash
# Simulate ultra-wide at 50% browser zoom
# Test on:
# - Mobile: 375px (iPhone SE)
# - Tablet: 768px (iPad)
# - Laptop: 1280px
# - Desktop: 1920px
# - Ultra-wide: 2560px+
```

---

## Content & Accessibility

### Hierarchy

| Rule | Description |
|------|-------------|
| **MUST** | `<title>` matches current context |
| **MUST** | Hierarchical `<h1–h6>` structure |
| **MUST** | Include "Skip to content" link |
| **MUST** | `scroll-margin-top` on headings for anchored links |

### States

| Rule | Description |
|------|-------------|
| **MUST** | Design empty/sparse/dense/error states |
| **MUST** | No dead ends; always offer next step/recovery |
| **MUST** | Skeletons mirror final content to avoid layout shift |

### Labels & Names

| Rule | Description |
|------|-------------|
| **MUST** | Redundant status cues (not color-only) |
| **MUST** | Icons have text labels for screen readers |
| **MUST** | Icon-only buttons have descriptive `aria-label` |
| **MUST** | Prefer native semantics (`button`, `a`, `label`, `table`) before ARIA |

### Typography

| Rule | Description |
|------|-------------|
| **SHOULD** | Curly quotes (" ") over straight quotes |
| **SHOULD** | Avoid widows/orphans |
| **MUST** | Tabular numbers for comparisons: `font-variant-numeric: tabular-nums` |
| **MUST** | Use ellipsis character `…` (not `...`) |
| **MUST** | Non-breaking spaces for glued terms: `10&nbsp;MB` |

### Localization

| Rule | Description |
|------|-------------|
| **MUST** | Locale-aware dates/times/numbers/currency |
| **MUST** | Prefer language settings over location (Accept-Language header) |
| **MUST** | Resilient to user-generated content (short/avg/very long) |

---

## Forms

### Input Behavior

| Rule | Description |
|------|-------------|
| **MUST** | Hydration-safe inputs (no lost focus/value) |
| **NEVER** | Block paste in `<input>/<textarea>` |
| **MUST** | Loading buttons show spinner and keep original label |
| **MUST** | Enter submits focused text input |
| **MUST** | In `<textarea>`, ⌘/Ctrl+Enter submits; Enter adds newline |

### Validation

| Rule | Description |
|------|-------------|
| **MUST** | Keep submit enabled until request starts |
| **MUST** | Don't block typing; accept free text and validate after |
| **MUST** | Allow submitting incomplete forms to surface validation |
| **MUST** | Errors inline next to fields; on submit, focus first error |

### Attributes

| Rule | Description |
|------|-------------|
| **MUST** | Set `autocomplete` + meaningful `name` |
| **MUST** | Use correct `type` and `inputmode` |
| **SHOULD** | Disable spellcheck for emails/codes/usernames |
| **SHOULD** | Placeholders end with ellipsis and show example pattern |

```html
<!-- Good placeholder examples -->
<input type="email" placeholder="you@example.com…" />
<input type="tel" placeholder="+1 (123) 456-7890…" />
<input type="text" placeholder="sk-012345679…" name="api_key" />
```

### Security

| Rule | Description |
|------|-------------|
| **MUST** | Warn on unsaved changes before navigation |
| **MUST** | Compatible with password managers & 2FA |
| **MUST** | Allow pasting one-time codes |
| **MUST** | Trim values to handle text expansion trailing spaces |
| **MUST** | No dead zones on checkboxes/radios |

---

## Performance

### Measurement

| Rule | Description |
|------|-------------|
| **SHOULD** | Test iOS Low Power Mode and macOS Safari |
| **MUST** | Measure reliably (disable extensions that skew runtime) |
| **MUST** | Track and minimize re-renders (React DevTools/React Scan) |
| **MUST** | Profile with CPU/network throttling |

### Optimization

| Rule | Description |
|------|-------------|
| **MUST** | Batch layout reads/writes; avoid unnecessary reflows |
| **MUST** | Mutations (`POST/PATCH/DELETE`) target <500ms |
| **SHOULD** | Prefer uncontrolled inputs; make controlled loops cheap |
| **MUST** | Virtualize large lists (e.g., `virtua`, `content-visibility: auto`) |

### Assets

| Rule | Description |
|------|-------------|
| **MUST** | Preload only above-the-fold images; lazy-load the rest |
| **MUST** | Prevent CLS from images (explicit dimensions) |
| **MUST** | Preconnect to asset/CDN domains |
| **MUST** | Preload critical fonts |
| **SHOULD** | Subset fonts (ship only code points you use) |

```html
<!-- Preconnect and preload -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossorigin />
```

---

## Design

### Shadows & Borders

| Rule | Description |
|------|-------------|
| **SHOULD** | Layered shadows (ambient + direct light) |
| **SHOULD** | Crisp edges via semi-transparent borders + shadows |
| **SHOULD** | Nested radii: child ≤ parent; concentric curves align |
| **SHOULD** | Hue consistency: tint borders/shadows/text toward bg hue |

### Contrast & Color

| Rule | Description |
|------|-------------|
| **MUST** | Accessible charts (color-blind-friendly palettes) |
| **MUST** | Meet contrast—prefer [APCA](https://apcacontrast.com/) over WCAG 2 |
| **MUST** | Increase contrast on `:hover/:active/:focus` |
| **SHOULD** | Match browser UI to page background |
| **SHOULD** | Avoid gradient banding (use masks when needed) |

```html
<!-- Match browser chrome to your theme -->
<meta name="theme-color" content="#0a0a0a" />

<style>
  html {
    color-scheme: dark; /* Proper scrollbar contrast */
  }
</style>
```

### CSS Best Practices

```css
/* Nested border radius formula */
.parent {
  --parent-radius: 16px;
  --parent-padding: 8px;
  border-radius: var(--parent-radius);
  padding: var(--parent-padding);
}

.child {
  /* Child radius = parent radius - parent padding */
  border-radius: calc(var(--parent-radius) - var(--parent-padding));
}

/* Layered shadow (ambient + direct) */
.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),   /* Ambient */
    0 4px 16px rgba(0, 0, 0, 0.1);   /* Direct light */
}

/* Semi-transparent border for clarity */
.button {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
```

---

## Quick Reference

### Always Do ✅

- Full keyboard support
- Visible focus states
- URL as state
- Honor `prefers-reduced-motion`
- Accessible labels on all controls
- Locale-aware formatting
- Image dimensions to prevent CLS

### Never Do ❌

- Disable browser zoom
- Block paste
- Animate layout properties
- Color-only status indicators
- Dead-end screens
- Block typing during validation

---

<div align="center">

**[↑ Back to top](#-ship-uiux-guidelines)**

Built with 💜 following [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)

</div>