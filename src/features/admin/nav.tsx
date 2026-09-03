import type { ReactNode } from 'react'

export interface AdminNavItem {
  id: 'dashboard' | 'devis' | 'clients' | 'paiements' | 'categories' | 'contenu' | 'statistiques' | 'equipe' | 'notifications' | 'parametres'
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
