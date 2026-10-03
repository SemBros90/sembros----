import type { ReactNode } from 'react';

type AdminSection = 'dashboard' | 'connectors' | 'supabase';

interface AdminLayoutProps {
  active: AdminSection;
  children: ReactNode;
}

function navClass(current: AdminSection, target: AdminSection): string {
  return current === target ? 'admin-nav-link admin-nav-link-active' : 'admin-nav-link';
}

export default function AdminLayout({ active, children }: AdminLayoutProps) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">SE</span>
          <div>
            <strong>Sembros Admin</strong>
            <small>Connector Center</small>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          <a className={navClass(active, 'dashboard')} href="#/admin">
            Dashboard
          </a>
          <a className={navClass(active, 'connectors')} href="#/admin/connectors">
            Connector Center
          </a>
          <a className={navClass(active, 'supabase')} href="#/admin/supabase-manager">
            Supabase Manager
          </a>
        </nav>

        <div className="admin-sidebar-footer">
          <span className="admin-db-status">Admin database: simulated</span>
          <a className="admin-back-link" href="#/">
            ← Back to public site
          </a>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">Admin Portal / Internal</p>
            <h1>
              {active === 'dashboard' && 'Admin Dashboard'}
              {active === 'connectors' && 'Connector Center'}
              {active === 'supabase' && 'Supabase Manager'}
            </h1>
          </div>
          <div className="admin-topbar-actions">
            <span className="admin-safe-badge">Safe mode enabled</span>
            <span className="admin-admin-avatar">AD</span>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}