import { NavChild } from '../types';

interface SidebarProps {
  items: NavChild[];
  active: string;
  sectionLabel: string;
  onNavigate: (p: string) => void;
}

export default function Sidebar({ items, active, sectionLabel, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label={`${sectionLabel} navigation`}>
      <h2 className="sidebar-title">{sectionLabel}</h2>
      <ul className="sidebar-list">
        {items.map((item) => (
          <li key={item.path}>
            <button
              className={`sidebar-link ${active === item.path ? 'active' : ''}`}
              onClick={() => onNavigate(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}