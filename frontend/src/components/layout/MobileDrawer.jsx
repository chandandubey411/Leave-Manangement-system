import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Building2, LayoutDashboard, CalendarPlus, ClipboardList, UserCircle } from 'lucide-react';
import { clsx } from '../../utils/clsx';

const navItems = [
  { to: '/dashboard',     label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/apply-leave',   label: 'Apply Leave',  icon: CalendarPlus   },
  { to: '/leave-history', label: 'Leave History', icon: ClipboardList  },
  { to: '/profile',       label: 'My Profile',   icon: UserCircle     },
];

function MobileDrawer({ isOpen, onClose }) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel — always in DOM, slides in/out */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 lg:hidden bg-white shadow-2xl flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header with logo + close button */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-none">LeaveTrack</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Employee Portal</p>
            </div>
          </div>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Menu</p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => clsx('sidebar-link', isActive && 'active')}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-200">
          <p className="text-[11px] text-slate-400">v1.0.0 · Leave Management System</p>
        </div>
      </div>
    </>
  );
}

export default MobileDrawer;

