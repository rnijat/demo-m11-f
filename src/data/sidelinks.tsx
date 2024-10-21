import {
  IconApps,
  IconChecklist,
  IconLayoutDashboard
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Orders',
    label: '',
    href: '/orders',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Products',
    label: '',
    href: '/products',
    icon: <IconApps size={18} />,
  },
]
