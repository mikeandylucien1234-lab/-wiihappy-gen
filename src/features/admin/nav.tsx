import type { ReactNode } from 'react'

export interface AdminNavItem {
  id:
    | 'dashboard'
    | 'devis'
    | 'clients'
    | 'paiements'
    | 'categories'
    | 'contenu'
    | 'politiques'
    | 'faq'
    | 'statistiques'
    | 'equipe'
    | 'reservations'
    | 'callbacks'
    | 'notifications'
    | 'parametres'
  to: string
  icon: ReactNode
}

export const adminNavItems: AdminNavItem[] = [
  {
    id: 'dashboard',
    to: '/admin/dashboard',
    icon: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="5" rx="1.5" />
        <rect x="13" y="11" width="8" height="10" rx="1.5" />
        <rect x="3" y="14" width="8" height="7" rx="1.5" />
      </>
    ),
  },
  {
    id: 'devis',
    to: '/admin/devis',
    icon: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </>
    ),
  },
  {
    id: 'clients',
    to: '/admin/clients',
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
        <circle cx="17" cy="8.5" r="2.4" />
        <path d="M15.5 14.3c2.6.2 4.5 2.2 4.5 5.2" />
      </>
    ),
  },
  {
    id: 'paiements',
    to: '/admin/paiements',
    icon: (
      <>
        <rect x="2.5" y="6" width="19" height="13" rx="2" />
        <path d="M2.5 10h19" />
        <path d="M6 15h4" />
      </>
    ),
  },
  {
    id: 'categories',
    to: '/admin/categories',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    id: 'contenu',
    to: '/admin/contenu',
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    id: 'politiques',
    to: '/admin/politiques',
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    id: 'faq',
    to: '/admin/faq',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.2 2-2.5 3.5" />
        <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    id: 'statistiques',
    to: '/admin/statistiques',
    icon: <path d="M4 20V10M11 20V4M18 20v-7" />,
  },
  {
    id: 'equipe',
    to: '/admin/equipe',
    icon: (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.4" />
        <path d="M2.5 20c0-3.3 2.4-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
        <path d="M14.5 14.8c2.3.3 3.8 2.2 3.8 5.2" />
      </>
    ),
  },
  {
    id: 'reservations',
    to: '/admin/reservations',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <path d="M8 13h2m4 0h2M8 17h2m4 0h2" />
      </>
    ),
  },
  {
    id: 'callbacks',
    to: '/admin/callbacks',
    icon: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.98.68 2.92a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.16-1.16a2 2 0 0 1 2.11-.45c.94.32 1.92.55 2.92.68A2 2 0 0 1 22 16.92z" />
      </>
    ),
  },
  {
    id: 'notifications',
    to: '/admin/notifications',
    icon: (
      <>
        <path d="M18 8a6 6 0 1 0-12 0c0 4-2 5-2 7h16c0-2-2-3-2-7" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </>
    ),
  },
  {
    id: 'parametres',
    to: '/admin/parametres',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-1.7-1L15 3h-4l-.4 2.9a7.6 7.6 0 0 0-1.7 1l-2.3-.9-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 0 0 1.7 1L11 21h4l.4-2.9a7.6 7.6 0 0 0 1.7-1l2.3.9 2-3.4z" />
      </>
    ),
  },
]
