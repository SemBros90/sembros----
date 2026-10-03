import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import ConnectorCenter from './ConnectorCenter';
import SupabaseManager from './SupabaseManager';

type AdminRoute = 'dashboard' | 'connectors' | 'supabase';

function parseAdminRoute(): AdminRoute {
  const hash = window.location.hash;
  if (hash.includes('/admin/connectors')) return 'connectors';
  if (hash.includes('/admin/supabase-manager')) return 'supabase';
  return 'dashboard';
}

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Control Center</h2>
      <p className="admin-dashboard-intro">
        Manage the operational connectors and Supabase schema behind the public
        Sembros Electric Co. website. This portal is fully isolated from the
        public site.
      </p>

      <div className="admin-dashboard-grid">
        <a className="admin-dashboard-card" href="#/admin/connectors">
          <span className="admin-dashboard-card-icon">C</span>
          <strong>Connector Center</strong>
          <p>Status, health checks, disconnect controls, and audit logs.</p>
        </a>
        <a className="admin-dashboard-card" href="#/admin/supabase-manager">
          <span className="admin-dashboard-card-icon">S</span>
          <strong>Supabase Manager</strong>
          <p>Tables, RLS policies, functions, triggers, seeds, migrations, and types.</p>
        </a>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [route, setRoute] = useState<AdminRoute>(parseAdminRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(parseAdminRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const active =
    route === 'dashboard' ? 'dashboard' : route === 'connectors' ? 'connectors' : 'supabase';

  return (
    <AdminLayout active={active}>
      {route === 'dashboard' && <AdminDashboard />}
      {route === 'connectors' && <ConnectorCenter />}
      {route === 'supabase' && <SupabaseManager />}
    </AdminLayout>
  );
}