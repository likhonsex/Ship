# 📄 GitHub Pages Documentation

> Learn how to create a website directly from a repository on GitHub.

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Custom Domain](#custom-domain)
- [Jekyll Integration](#jekyll-integration)
- [Static Site Generators](#static-site-generators)
- [Troubleshooting](#troubleshooting)

---

## Overview

GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

### Key Features

| Feature | Description |
|---------|-------------|
| **Free Hosting** | Host your static sites for free |
| **Custom Domains** | Use your own domain name |
| **HTTPS** | Free SSL certificates |
| **Jekyll Support** | Built-in Jekyll processing |
| **GitHub Actions** | Custom build workflows |

---

## Getting Started

### 1. Enable GitHub Pages

```
Repository → Settings → Pages → Source
```

Choose your source:
- **Deploy from a branch** - Use a specific branch (e.g., `main`, `gh-pages`)
- **GitHub Actions** - Use a custom workflow

### 2. Choose Publishing Source

| Source | Best For |
|--------|----------|
| `main` branch | Simple sites |
| `main` branch `/docs` folder | Documentation |
| `gh-pages` branch | Build output |
| GitHub Actions | Custom builds (Next.js, etc.) |

### 3. Access Your Site

```
https://<username>.github.io/<repository>/
```

For Ship:
```
https://likhonsex.github.io/Ship/
```

---

## Configuration

### _config.yml (Jekyll)

```yaml
title: Ship
description: AI Coding Agent that ships faster with you
baseurl: "/Ship"
url: "https://likhonsex.github.io"

# Theme
theme: minima

# Plugins
plugins:
  - jekyll-feed
  - jekyll-seo-tag

# Exclude from build
exclude:
  - node_modules
  - .github
  - README.md
```

### Custom 404 Page

Create `404.html` or `404.md` in your root:

```html
---
permalink: /404.html
---

<!DOCTYPE html>
<html>
<head>
  <title>404 - Page Not Found | Ship</title>
</head>
<body>
  <h1>404</h1>
  <p>Page not found. <a href="/Ship/">Return home</a></p>
</body>
</html>
```

---

## Custom Domain

### 1. Add CNAME File

Create `CNAME` file in your publishing source:

```
ship.yourdomain.com
```

### 2. Configure DNS

For apex domain (`yourdomain.com`):

```
Type    Host    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
```

For subdomain (`ship.yourdomain.com`):

```
Type    Host    Value
CNAME   ship    likhonsex.github.io
```

### 3. Enable HTTPS

```
Settings → Pages → Enforce HTTPS ✓
```

---

## Jekyll Integration

### File Structure

```
.
├── _config.yml          # Site configuration
├── _layouts/            # Page layouts
│   └── default.html
├── _includes/           # Reusable components
│   ├── header.html
│   └── footer.html
├── _posts/              # Blog posts
│   └── 2024-01-01-hello.md
├── assets/              # Static assets
│   ├── css/
│   ├── js/
│   └── images/
└── index.md             # Home page
```

### Front Matter

```yaml
---
layout: default
title: Home
description: Ship - AI Coding Agent
permalink: /
---

# Welcome to Ship

Your AI coding agent that ships faster with you.
```

### Liquid Templates

```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html>
<head>
  <title>{{ page.title }} | {{ site.title }}</title>
  <meta name="description" content="{{ page.description }}">
</head>
<body>
  {% include header.html %}
  
  <main>
    {{ content }}
  </main>
  
  {% include footer.html %}
</body>
</html>
```

---

## Static Site Generators

### Next.js

Ship uses Next.js with static export. See `.github/workflows/nextjs-pages.yml`.

```javascript
// next.config.js
module.exports = {
  output: 'export',
  basePath: '/Ship',
  images: {
    unoptimized: true
  }
}
```

### Other Generators

| Generator | Workflow File |
|-----------|---------------|
| Next.js | `nextjs-pages.yml` |
| Astro | `astro.yml` |
| Hugo | `hugo.yml` |
| Nuxt | `nuxt.yml` |
| Jekyll | Built-in |

---

## Troubleshooting

### Common Issues

<details>
<summary><strong>❌ 404 Error on Subpages</strong></summary>

**Cause:** Missing `basePath` or incorrect links.

**Solution:**
```javascript
// next.config.js
module.exports = {
  basePath: '/Ship',
}
```

Use relative links or include basePath:
```html
<a href="/Ship/docs">Documentation</a>
```
</details>

<details>
<summary><strong>❌ CSS/JS Not Loading</strong></summary>

**Cause:** Incorrect asset paths.

**Solution:**
```html
<!-- Use relative or basePath-prefixed paths -->
<link rel="stylesheet" href="./styles.css">
<script src="./script.js"></script>
```
</details>

<details>
<summary><strong>❌ Build Failing</strong></summary>

**Cause:** Various build errors.

**Debug:**
1. Check Actions tab for error logs
2. Run build locally: `npm run build`
3. Verify Node.js version matches workflow
</details>

<details>
<summary><strong>❌ Custom Domain Not Working</strong></summary>

**Checklist:**
- [ ] CNAME file exists in publishing source
- [ ] DNS records are correct
- [ ] DNS propagation complete (wait 24-48h)
- [ ] HTTPS enforcement enabled
</details>

### Build Logs

```
Repository → Actions → pages-build-deployment
```

### Verify DNS

```bash
# Check A records
dig yourdomain.com +short

# Check CNAME
dig ship.yourdomain.com +short
```

---

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Next.js Static Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

<div align="center">

**[↑ Back to top](#-github-pages-documentation)**

</div>