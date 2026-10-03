import { PageDef } from '../types';

interface HeaderProps {
  query: string;
  onQuery: (q: string) => void;
  results: PageDef[];
  onNavigate: (p: string) => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export default function Header({ query, onQuery, results, onNavigate, mobileOpen, onToggleMobile }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo" onClick={() => onNavigate('/')} aria-label="SemBros Electric Co. home">
          <span className="logo-mark">SE</span>
          <span className="logo-text">
            <strong>SemBros Electric Co.</strong>
            <small>Precision Manufacturing</small>
          </span>
          <span className="logo-status-dot" aria-hidden="true" title="Live status" />
        </button>

        <div className="header-right">
          <div className="search-wrap">
            <input
              type="search"
              className="search-box"
              placeholder="Search products, processes, pages…"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              aria-label="Search the website"
            />
            {results.length > 0 && (
              <div className="search-results">
                {results.map((r) => (
                  <button key={r.path} className="search-result" onClick={() => onNavigate(r.path)}>
                    <span className="search-result-title">{r.navLabel}</span>
                    <span className="search-result-meta">{r.sectionLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="hamburger"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={onToggleMobile}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}