/**
 * Design system extracted from the Wiihappy Gen reference prototypes
 * (Wiihappy_Landing_Page.html + Admin_Equipe_Page.html).
 * See src/lib/design-tokens.ts for the same values as typed JS constants.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary blue system (gradients + solid)
        primary: {
          DEFAULT: '#0057D9', // solid brand blue (links, icons, eyebrow text)
          light: '#00C2FF', // gradient start (hero title, icon tiles)
          dark: '#061A4A', // gradient end (footer, dark panels)
          hover: '#00A8E8', // link hover / "comment ça marche" gradient end
        },
        // Accent orange system (gradients + solid) — primary CTA color
        accent: {
          DEFAULT: '#FF8C00', // gradient start (buttons, badges, icons)
          light: '#FFB800', // gradient end
        },
        // Text
        ink: '#101F33', // headings / primary text
        slate: '#5B6B82', // body / secondary text
        muted: '#9AA5B4', // tertiary text, neutral avatar gradient
        // Backgrounds
        surface: '#F7F8FA', // public site section background
        'surface-admin': '#F1F3F7', // admin shell background
        // Neutral navy used only for border/shadow tint (via /opacity, e.g. border-navy/10)
        navy: '#0A2A66',
        // Status
        success: '#1A9E5C',
        danger: '#D9480F',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg,#00C2FF,#0057D9)',
        'gradient-primary-diag': 'linear-gradient(135deg,#00C2FF,#0057D9)',
        'gradient-accent': 'linear-gradient(90deg,#FF8C00,#FFB800)',
        'gradient-accent-diag': 'linear-gradient(135deg,#FF8C00,#FFB800)',
        'gradient-hero': 'linear-gradient(135deg,#0057D9,#00A8E8)',
        'gradient-footer': 'linear-gradient(135deg,#061A4A,#0057D9)',
        'gradient-fab': 'linear-gradient(135deg,#00C2FF,#0057D9,#FF8C00)',
        'gradient-avatar-neutral': 'linear-gradient(135deg,#9AA5B4,#5B6B82)',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Semantic type scale (size, { lineHeight, letterSpacing, fontWeight })
        hero: ['clamp(2.125rem,4.6vw,3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '800' }],
        h1: ['clamp(2.125rem,4.6vw,3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '800' }],
        h2: ['clamp(1.625rem,3.2vw,2.25rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '800' }],
        h3: ['1.125rem', { lineHeight: '1.3', fontWeight: '700' }],
        h4: ['1rem', { lineHeight: '1.3', fontWeight: '700' }],
        eyebrow: ['0.78125rem', { lineHeight: '1.3', letterSpacing: '0.12em', fontWeight: '800' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.6' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        // Named radii used across cards / buttons / inputs / badges
        sm: '8px', // small chips, tags
        md: '12px', // inputs, icon tiles, list rows
        lg: '16px', // small cards (table container, FAQ card)
        xl: '20px', // standard cards, service cards
        '2xl': '24px', // large cards, modals
        '3xl': '28px', // hero/about panels, consultation panel
        pill: '999px', // buttons, badges, pill toggles
      },
      boxShadow: {
        card: '0 4px 16px rgba(10,42,102,0.05)',
        'card-md': '0 6px 20px rgba(10,42,102,0.06)',
        'card-lg': '0 8px 30px rgba(10,42,102,0.06)',
        'card-hover': '0 20px 44px rgba(10,42,102,0.16)',
        modal: '0 20px 50px rgba(10,42,102,0.25)',
        button: '0 6px 16px rgba(255,140,0,0.3)',
        'button-lg': '0 10px 26px rgba(255,140,0,0.35)',
        fab: '0 10px 30px rgba(10,42,102,0.35)',
      },
      maxWidth: {
        content: '1280px', // main page/section content width
        narrow: '820px', // FAQ / consultation heading width
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
