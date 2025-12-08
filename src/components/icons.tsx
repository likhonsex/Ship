import {
  Loader2,
  Moon,
  Sun,
  Send,
  Plus,
  Settings,
  LogOut,
  User,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Check,
  Copy,
  MoreHorizontal,
  Trash,
  Edit,
  Github,
  MessageSquare,
  RefreshCw,
} from 'lucide-react'

export const Icons = {
  logo: ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  spinner: Loader2,
  moon: Moon,
  sun: Sun,
  send: Send,
  plus: Plus,
  settings: Settings,
  logout: LogOut,
  user: User,
  close: X,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  copy: Copy,
  moreHorizontal: MoreHorizontal,
  trash: Trash,
  edit: Edit,
  github: Github,
  message: MessageSquare,
  refresh: RefreshCw,
}
