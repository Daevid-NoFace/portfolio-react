const Svg = ({ size = 16, strokeWidth = 2, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

export const GitHubIcon = ({ size = 16 }) => (
  <Svg size={size} strokeWidth={1.8}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1s-1.2-.4-3.9 1.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.3 6.7 6.4 7a3.4 3.4 0 0 0-.9 2.6V23" />
  </Svg>
)

export const ArrowDownRightIcon = ({ size = 16 }) => (
  <Svg size={size} strokeWidth={2.2}><path d="M7 7l10 10M17 7v10H7" /></Svg>
)

export const ArrowUpRightIcon = ({ size = 16 }) => (
  <Svg size={size}><path d="M7 17 17 7M8 7h9v9" /></Svg>
)

export const MailIcon = ({ size = 16 }) => (
  <Svg size={size}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>
)

export const MenuIcon = ({ size = 16 }) => (
  <Svg size={size} strokeWidth={2.2}><path d="M4 8h16M4 16h16" /></Svg>
)

export const CloseIcon = ({ size = 16 }) => (
  <Svg size={size} strokeWidth={2.2}><path d="M6 6l12 12M18 6 6 18" /></Svg>
)

export const BoltIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="bolt">
    <path d="M13 2 4 14h7l-2 8 9-12h-7l2-8z" />
  </svg>
)
