/**
 * Design tokens extracted from the Wiihappy Gen reference prototypes
 * (Wiihappy_Landing_Page.html — public site, Admin_Equipe_Page.html — back-office).
 *
 * These mirror tailwind.config.js. Use the Tailwind classes (e.g. `bg-accent`,
 * `text-slate`, `rounded-xl`) in components; reach for these constants only
 * when a raw value is needed outside of a className (inline SVG strokes,
 * canvas/chart colors, computed styles, etc.).
 */

export const colors = {
  primary: {
    DEFAULT: '#0057D9',
    light: '#00C2FF',
    dark: '#061A4A',
    hover: '#00A8E8',
  },
  accent: {
    DEFAULT: '#FF8C00',
    light: '#FFB800',
  },
  ink: '#101F33',
  slate: '#5B6B82',
  muted: '#9AA5B4',
  surface: '#F7F8FA',
  surfaceAdmin: '#F1F3F7',
  navy: '#0A2A66',
  success: '#1A9E5C',
  danger: '#D9480F',
  white: '#FFFFFF',
} as const

export const gradients = {
  primary: 'linear-gradient(90deg,#00C2FF,#0057D9)',
  primaryDiag: 'linear-gradient(135deg,#00C2FF,#0057D9)',
  accent: 'linear-gradient(90deg,#FF8C00,#FFB800)',
  accentDiag: 'linear-gradient(135deg,#FF8C00,#FFB800)',
  hero: 'linear-gradient(135deg,#0057D9,#00A8E8)',
  footer: 'linear-gradient(135deg,#061A4A,#0057D9)',
  fab: 'linear-gradient(135deg,#00C2FF,#0057D9,#FF8C00)',
  avatarNeutral: 'linear-gradient(135deg,#9AA5B4,#5B6B82)',
} as const

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  pill: '999px',
  full: '50%',
} as const

export const shadows = {
  card: '0 4px 16px rgba(10,42,102,0.05)',
  cardMd: '0 6px 20px rgba(10,42,102,0.06)',
  cardLg: '0 8px 30px rgba(10,42,102,0.06)',
  cardHover: '0 20px 44px rgba(10,42,102,0.16)',
  modal: '0 20px 50px rgba(10,42,102,0.25)',
  button: '0 6px 16px rgba(255,140,0,0.3)',
  buttonLg: '0 10px 26px rgba(255,140,0,0.35)',
  fab: '0 10px 30px rgba(10,42,102,0.35)',
} as const

export const typography = {
  fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const

export const layout = {
  contentMaxWidth: '1280px',
  narrowMaxWidth: '820px',
  sectionPaddingX: '24px',
  sectionPaddingYTop: '100px',
} as const

export const statusColors = {
  active: { bg: 'rgba(26,158,92,0.12)', text: colors.success },
  inactive: { bg: 'rgba(91,107,130,0.12)', text: colors.slate },
  danger: { bg: 'rgba(217,72,15,0.08)', border: 'rgba(217,72,15,0.2)', text: colors.danger },
} as const
