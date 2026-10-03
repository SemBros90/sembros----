interface BreadcrumbsProps {
  crumbs: [string, string][];
  onNavigate: (p: string) => void;
}

export default function Breadcrumbs({ crumbs, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="breadcrumbs-inner">
        {crumbs.map(([label, path], i) => (
          <span key={path} className="crumb">
            {i > 0 && <span className="crumb-sep">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="crumb-current">{label}</span>
            ) : (
              <button className="crumb-link" onClick={() => onNavigate(path)}>
                {label}
              </button>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}