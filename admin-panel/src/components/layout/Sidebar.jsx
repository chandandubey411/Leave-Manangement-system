import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';

const NAV_ITEMS = [
  { path: '/manage-leaves', label: 'Manage Leaves', icon: FileText },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/profile', label: 'Profile Settings', icon: Settings },
];

export default function Sidebar() {
  const { logout } = useAdminAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-slate-200 sticky top-0">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg text-slate-900 tracking-tight">AdminPanel</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button
          onClick={logout}
          className="sidebar-link w-full text-slate-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
