import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileDrawer from './MobileDrawer';

function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer  = useCallback(() => setDrawerOpen(true),  []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={closeDrawer} />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={openDrawer} />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto scrollbar-thin"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
