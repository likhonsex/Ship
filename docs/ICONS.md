# Icons Guide

Ship uses **Geist Icons** from Vercel for consistent, professional iconography.

> **Important**: Never use emoji as icons. Always use SVG icons from the Geist library.

---

## Installation

```bash
# Using npm
npm install @geist-ui/icons

# Using yarn
yarn add @geist-ui/icons

# Using pnpm
pnpm add @geist-ui/icons
```

---

## Usage

### Single Icon Import (Recommended)

Best for tree-shaking and bundle size:

```tsx
import Github from '@geist-ui/icons/github'
import Code from '@geist-ui/icons/code'
import Terminal from '@geist-ui/icons/terminal'

function App() {
  return (
    <div>
      <Github size={24} />
      <Code size={24} />
      <Terminal size={24} />
    </div>
  )
}
```

### Named Import

```tsx
import { Github, Code, Terminal } from '@geist-ui/icons'

function App() {
  return (
    <div>
      <Github />
      <Code />
      <Terminal />
    </div>
  )
}
```

### Namespace Import

```tsx
import * as Icons from '@geist-ui/icons'

function App() {
  return (
    <div>
      <Icons.Github />
      <Icons.Code />
      <Icons.Terminal />
    </div>
  )
}
```

---

## Icon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Icon size in pixels |
| `color` | `string` | `currentColor` | Icon color |
| `...` | `SVGAttributes` | - | All native SVG attributes |

### Examples

```tsx
// Custom size
<Github size={32} />

// Custom color
<Github color="#8B5CF6" />

// With className
<Github className="icon-primary" />

// Accessibility
<Github aria-label="GitHub" role="img" />
```

---

## Icon Categories

### Navigation

| Icon | Name | Usage |
|------|------|-------|
| `<ArrowLeft />` | ArrowLeft | Back navigation |
| `<ArrowRight />` | ArrowRight | Forward navigation |
| `<ArrowUp />` | ArrowUp | Scroll to top |
| `<ArrowDown />` | ArrowDown | Dropdown indicator |
| `<ChevronLeft />` | ChevronLeft | Previous |
| `<ChevronRight />` | ChevronRight | Next |
| `<ChevronDown />` | ChevronDown | Expand |
| `<ChevronUp />` | ChevronUp | Collapse |
| `<ExternalLink />` | ExternalLink | External links |
| `<Menu />` | Menu | Mobile menu |
| `<Home />` | Home | Home page |

### Actions

| Icon | Name | Usage |
|------|------|-------|
| `<Plus />` | Plus | Add/Create |
| `<Minus />` | Minus | Remove |
| `<X />` | X | Close/Cancel |
| `<Check />` | Check | Confirm/Success |
| `<Edit />` | Edit | Edit action |
| `<Trash2 />` | Trash2 | Delete |
| `<Copy />` | Copy | Copy to clipboard |
| `<Download />` | Download | Download file |
| `<Upload />` | Upload | Upload file |
| `<Search />` | Search | Search |
| `<Settings />` | Settings | Settings/Config |
| `<RefreshCw />` | RefreshCw | Refresh/Reload |

### Status

| Icon | Name | Usage |
|------|------|-------|
| `<CheckCircle />` | CheckCircle | Success |
| `<XCircle />` | XCircle | Error |
| `<AlertTriangle />` | AlertTriangle | Warning |
| `<AlertCircle />` | AlertCircle | Info/Caution |
| `<Info />` | Info | Information |
| `<HelpCircle />` | HelpCircle | Help |
| `<Loader />` | Loader | Loading |

### Development

| Icon | Name | Usage |
|------|------|-------|
| `<Code />` | Code | Code/Source |
| `<Terminal />` | Terminal | CLI/Terminal |
| `<Github />` | Github | GitHub |
| `<GitBranch />` | GitBranch | Branches |
| `<GitCommit />` | GitCommit | Commits |
| `<GitPullRequest />` | GitPullRequest | Pull Requests |
| `<GitMerge />` | GitMerge | Merge |
| `<FileText />` | FileText | Files |
| `<Folder />` | Folder | Folders |
| `<Database />` | Database | Database |
| `<Server />` | Server | Server |
| `<Cpu />` | Cpu | Processing |
| `<Zap />` | Zap | Performance/Fast |

### Communication

| Icon | Name | Usage |
|------|------|-------|
| `<MessageCircle />` | MessageCircle | Comments |
| `<MessageSquare />` | MessageSquare | Chat |
| `<Mail />` | Mail | Email |
| `<Bell />` | Bell | Notifications |
| `<Send />` | Send | Send message |

### Media

| Icon | Name | Usage |
|------|------|-------|
| `<Image />` | Image | Images |
| `<Play />` | Play | Play |
| `<Pause />` | Pause | Pause |
| `<Video />` | Video | Video |
| `<Volume2 />` | Volume2 | Audio |

### Security

| Icon | Name | Usage |
|------|------|-------|
| `<Lock />` | Lock | Locked/Private |
| `<Unlock />` | Unlock | Unlocked/Public |
| `<Shield />` | Shield | Security |
| `<Key />` | Key | API Keys/Auth |
| `<Eye />` | Eye | Visible |
| `<EyeOff />` | EyeOff | Hidden |

### UI Elements

| Icon | Name | Usage |
|------|------|-------|
| `<Sun />` | Sun | Light mode |
| `<Moon />` | Moon | Dark mode |
| `<Star />` | Star | Favorites |
| `<Heart />` | Heart | Like |
| `<Bookmark />` | Bookmark | Save |
| `<Link />` | Link | Links |
| `<Globe />` | Globe | Web/Public |
| `<User />` | User | User/Profile |
| `<Users />` | Users | Team |
| `<Clock />` | Clock | Time |
| `<Calendar />` | Calendar | Date |

---

## Complete Icon List

All available icons from `@geist-ui/icons`:

<details>
<summary>View all 250+ icons</summary>

```
Activity, Airplay, AlertCircle, AlertCircleFill, AlertOctagon,
AlertTriangle, AlertTriangleFill, AlignCenter, AlignJustify,
AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown,
ArrowDownCircle, ArrowDownLeft, ArrowDownRight, ArrowLeft,
ArrowLeftCircle, ArrowRight, ArrowRightCircle, ArrowRightCircleFill,
ArrowUp, ArrowUpCircle, ArrowUpLeft, ArrowUpRight, AtSign, Award,
BarChart, BarChart2, Battery, BatteryCharging, Bell, BellOff,
Bluetooth, Bold, Book, BookOpen, Bookmark, Box, Briefcase,
Calendar, Camera, CameraOff, Cast, Check, CheckCircle, CheckInCircle,
CheckInCircleFill, CheckSquare, Checkbox, CheckboxFill, ChevronDown,
ChevronDownCircle, ChevronDownCircleFill, ChevronLeft,
ChevronLeftCircle, ChevronLeftCircleFill, ChevronRight,
ChevronRightCircle, ChevronRightCircleFill, ChevronUp,
ChevronUpCircle, ChevronUpCircleFill, ChevronUpDown, ChevronsDown,
ChevronsLeft, ChevronsRight, ChevronsUp, Chrome, Circle, Clipboard,
Clock, Cloud, CloudDrizzle, CloudLightning, CloudOff, CloudRain,
CloudSnow, Code, Codepen, Codesandbox, Coffee, Columns, Command,
Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown,
CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft,
CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete,
Disc, Display, Divider, DollarSign, Download, DownloadCloud, Droplet,
Edit, Edit2, Edit3, Emoji, ExternalLink, Eye, EyeOff, Facebook,
FastForward, Feather, Figma, File, FileFunction, FileFunctionFill,
FileLambda, FileLambdaFill, FileMinus, FilePlus, FileText, Film,
Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown,
FullScreen, FullScreenClose, Function, Gift, GitBranch, GitCommit,
GitMerge, GitPullRequest, Github, Gitlab, Globe, Grid, HardDrive,
Hash, Headphones, Heart, HeartFill, HelpCircle, Hexagon, Home, Image,
Inbox, Infinity, Info, InfoFill, Instagram, Italic, Key, Lambda,
Layers, Layout, LifeBuoy, Link, Link2, Linkedin, List, Loader, Lock,
LogIn, LogOut, Mail, Map, MapPin, Maximize, Maximize2, Meh, Menu,
MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2,
Minus, MinusCircle, MinusSquare, Monitor, Moon, MoreHorizontal,
MoreVertical, MousePointer, Move, Music, Navigation, Navigation2,
Octagon, Package, Paperclip, Pause, PauseCircle, PauseFill, PenTool,
Percent, Phone, PhoneCall, PhoneForwarded, PhoneIncoming,
PhoneMissed, PhoneOff, PhoneOutgoing, PieChart, Pin, Play,
PlayCircle, PlayFill, Plus, PlusCircle, PlusSquare, Pocket, Power,
Printer, QuestionCircle, Radio, RefreshCcw, RefreshCw, Repeat,
Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search, Send,
Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBag,
ShoppingCart, Shuffle, Sidebar, SkipBack, SkipForward, Slack, Slash,
Sliders, Smartphone, Smile, Speaker, Square, Star, StopCircle, Sun,
Sunrise, Sunset, Tablet, Tag, Target, Terminal, Thermometer,
ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, Tool, Trash, Trash2,
Trello, TrendingDown, TrendingUp, Triangle, Truck, Tv, Twitch,
Twitter, Type, Umbrella, Underline, Unlock, Upload, UploadCloud,
User, UserCheck, UserMinus, UserPlus, UserX, Users, Video, VideoOff,
Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi, WifiOff,
Wind, X, XCircle, XCircleFill, XOctagon, XSquare, Youtube, Zap,
ZapOff, ZeroConfig, ZoomIn, ZoomOut
```

</details>

---

## CSS/Tailwind Integration

### With Tailwind CSS

```tsx
import { Github } from '@geist-ui/icons'

// Using Tailwind classes
<Github className="w-6 h-6 text-gray-600 hover:text-gray-900" />
<Github className="w-5 h-5 text-purple-500" />
```

### CSS Variables

```css
:root {
  --icon-size-sm: 16px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-color: var(--foreground);
}

.icon {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
  color: var(--icon-color);
}
```

---

## Accessibility

### Decorative Icons

For icons that are purely decorative:

```tsx
<Github aria-hidden="true" />
```

### Meaningful Icons

For icons that convey meaning:

```tsx
<Github aria-label="View on GitHub" role="img" />
```

### Icon Buttons

```tsx
<button aria-label="Close dialog">
  <X aria-hidden="true" />
</button>
```

### Icons with Text

```tsx
<button>
  <Github aria-hidden="true" />
  <span>GitHub</span>
</button>
```

---

## Best Practices

### Do

- Use consistent icon sizes throughout the UI
- Pair icons with text labels when possible
- Ensure sufficient color contrast
- Use `aria-label` for icon-only buttons
- Import icons individually for smaller bundles

### Do Not

- Use emoji as icons
- Mix icon libraries in the same project
- Use icons without accessible labels
- Make icons too small (minimum 16px)
- Use decorative icons for critical actions

---

## Resources

- [Geist Icons - Vercel](https://vercel.com/geist/icons)
- [Geist UI Icons](https://geist-ui.dev/en-us/components/icons)
- [GitHub Repository](https://github.com/geist-org/icons)
- [npm Package](https://www.npmjs.com/package/@geist-ui/icons)

---

<div align="center">

[Back to top](#icons-guide)

</div>
