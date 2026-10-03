import { useEffect, useState } from 'react';
import { findPage, searchPages } from './data/siteData';
import { PageDef } from './types';
import Header from './components/Header';
import TopNav from './components/TopNav';
import Breadcrumbs from './components/Breadcrumbs';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PageRenderer from './components/PageRenderer';
import { navigation } from './data/siteData';

function currentPath(): string {
  const h = window.location.hash.replace(/^#/, '');
  if (!h || h === '/') return '/';
  return h.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [path, setPath] = useState<string>(currentPath());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PageDef[]>([]);

  useEffect(() => {
    const onHash = () => {
      setPath(currentPath());
      setMobileOpen(false);
      setQuery('');
      setResults([]);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const page = findPage(path) ?? findPage('/')!;
  const sectionNav = navigation.find((n) => n.id === page.section)!;

  const navigate = (p: string) => {
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateQuery = (q: string) => {
    setQuery(q);
    setResults(q.trim() ? searchPages(q) : []);
  };

  return (
    <div className="site">
      <Header
        query={query}
        onQuery={updateQuery}
        results={results}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((v) => !v)}
      />
      <TopNav current={page.section} mobileOpen={mobileOpen} onNavigate={navigate} />
      <Breadcrumbs crumbs={page.breadcrumb} onNavigate={navigate} />
      <div className="layout">
        <Sidebar items={sectionNav.children} active={page.path} sectionLabel={sectionNav.label} onNavigate={navigate} />
        <main className="content">
          <PageRenderer page={page} />
        </main>
      </div>
      <Footer onNavigate={navigate} />
    </div>
  );
}