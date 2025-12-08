import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Copy,
  Cpu,
  ExternalLink,
  FileText,
  Github,
  Loader2,
  Moon,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Trash2,
  User,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
  logo: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  arrowRight: ArrowRight,
  check: Check,
  x: X,
  circle: Circle,
  plus: Plus,
  copy: Copy,
  trash: Trash2,
  search: Search,
  settings: Settings,
  user: User,
  externalLink: ExternalLink,
  moreHorizontal: MoreHorizontal,
  alertCircle: AlertCircle,
  fileText: FileText,
  send: Send,
  github: Github,
  sun: Sun,
  moon: Moon,
  sparkles: Sparkles,
  cpu: Cpu,
  shield: Shield,
  zap: Zap,
  refresh: RefreshCw,
}
