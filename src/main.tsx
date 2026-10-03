import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AdminApp from './admin/AdminApp';
import './styles.css';
import './admin/admin.css';

type View = 'public' | 'admin';

function getView(): View {
  if (typeof window === 'undefined') {
    return 'public';
  }

  const path = window.location.pathname;
  if (path === '/admin' || path.startsWith('/admin/')) {
    return 'admin';
  }

  const hash = window.location.hash;
  if (hash.startsWith('#/admin')) {
    return 'admin';
  }

  return 'public';
}

function RootRouter() {
  const [view, setView] = useState<View>(getView);

  useEffect(() => {
    const onRouteChange = () => setView(getView());

    window.addEventListener('popstate', onRouteChange);
    window.addEventListener('hashchange', onRouteChange);

    return () => {
      window.removeEventListener('popstate', onRouteChange);
      window.removeEventListener('hashchange', onRouteChange);
    };
  }, []);

  return view === 'admin' ? <AdminApp /> : <App />;
}

const rootEl = document.getElementById('root');

if (rootEl) {
  createRoot(rootEl).render(<RootRouter />);
}

export default RootRouter;