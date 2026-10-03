import { navigation } from '../data/siteData';
import { SectionId } from '../types';

interface TopNavProps {
  current: SectionId;
  mobileOpen: boolean;
  onNavigate: (p: string) => void;
}

export default function TopNav({ current, mobileOpen, onNavigate }: TopNavProps) {
  return (
    <nav className={`top-nav ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
      <div className="nav-inner">
        {navigation.map((item) => (
          <div key={item.id} className={`nav-group ${current === item.id ? 'active' : ''}`}>
            <button className="nav-top-link" onClick={() => onNavigate(item.path)}>
              {item.label}
              {item.children.length > 0 && <span className="caret">▾</span>}
            </button>
            {item.children.length > 0 && (
              <div className="dropdown">
                {item.children.map((child) => (
                  <button key={child.path} className="dropdown-link" onClick={() => onNavigate(child.path)}>
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}