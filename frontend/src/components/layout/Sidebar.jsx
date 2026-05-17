import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  UserCircle,
  Building2,
} from 'lucide-react';
import { clsx } from '../../utils/clsx';

const navItems = [
  { to: '/dashboard',     label: 'Dashboard',      icon: LayoutDashboard },
  { to: '/apply-leave',   label: 'Apply Leave',     icon: CalendarPlus   },
  { to: '/leave-history', label: 'Leave History',   icon: ClipboardList  },
  { to: '/profile',       label: 'My Profile',      icon: UserCircle     },
];

function SidebarNav({ onLinkClick }) {
  return (
    <nav className="mt-2 flex flex-col gap-0.5">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onLinkClick}
          className={({ isActive }) =>
            clsx('sidebar-link', isActive && 'active')
          }
        >
          <Icon className="w-[18px] h-[18px] shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

function Sidebar({ onLinkClick }) {
  return (
    <aside className="flex flex-col h-full w-60 bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-slate-200 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 leading-none">LeaveTrack</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Employee Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>
        <SidebarNav onLinkClick={onLinkClick} />
      </div>

      {/* Footer version tag */}
      <div className="px-4 py-3 border-t border-slate-200">
        <p className="text-[11px] text-slate-400">v1.0.0 · Leave Management System</p>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
