import { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, LogOut, Bell, ChevronDown } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { getInitials } from '../../utils/formatters';

const routeTitles = {
  '/dashboard':     'Dashboard',
  '/apply-leave':   'Apply Leave',
  '/leave-history': 'Leave History',
  '/profile':       'My Profile',
};

function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pageTitle = routeTitles[pathname] ?? 'Employee Portal';

  const handleLogout = useCallback(() => {
    setDropdownOpen(false);
    logout();
  }, [logout]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0">
      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-btn"
          aria-label="Toggle menu"
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-base font-semibold text-slate-900 hidden sm:block">
          {pageTitle}
        </h2>
      </div>

      {/* Right: notifications + user menu */}
      <div className="flex items-center gap-2">
        <button
          id="notifications-btn"
          aria-label="Notifications"
          className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-600 rounded-full" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            id="user-menu-btn"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">
                {getInitials(user?.fullName)}
              </span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[140px] truncate">
              {user?.fullName}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
                aria-hidden="true"
              />
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-slate-200 shadow-dropdown z-20 py-1"
              >
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800 truncate">{user?.fullName}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <button
                  id="logout-btn"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(Topbar);
