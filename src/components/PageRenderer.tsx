import { PageDef } from '../types';
import FormBlock from './FormBlock';

export default function PageRenderer({ page }: { page: PageDef }) {
  return (
    <article className="page">
      <header className="page-header">
        <h1>{page.navLabel === 'Home' ? page.sectionLabel : page.navLabel}</h1>
        <p className="page-summary">{page.summary}</p>
      </header>

      {page.blocks.map((block, i) => {
        switch (block.type) {
          case 'hero':
            return (
              <section key={i} className="hero">
                <h2>{block.title}</h2>
                <p>{block.text}</p>
              </section>
            );
          case 'heading':
            return <h2 key={i}>{block.text}</h2>;
          case 'paragraph':
            return <p key={i} className="block-paragraph">{block.text}</p>;
          case 'list':
            return (
              <section key={i} className="block">
                {block.title && <h2>{block.title}</h2>}
                <ul className="styled-list">
                  {block.items?.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </section>
            );
          case 'steps':
            return (
              <section key={i} className="block">
                {block.title && <h2>{block.title}</h2>}
                <ol className="steps-list">
                  {block.items?.map((item, j) => (
                    <li key={j}>
                      <span className="step-num">{j + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case 'table':
            return (
              <section key={i} className="block">
                {block.title && <h2>{block.title}</h2>}
                {block.table?.caption && <p className="table-caption">{block.table.caption}</p>}
                <div className="table-scroll">
                  <table className="spec-table">
                    <thead>
                      <tr>
                        {block.table?.headers.map((h, j) => (
                          <th key={j}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.table?.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          case 'stats':
            return (
              <section key={i} className="stats-grid">
                {block.stats?.map((s, j) => (
                  <div key={j} className="stat-card">
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </section>
            );
          case 'quote':
            return (
              <blockquote key={i} className="hero-quote">
                “{block.text}”
              </blockquote>
            );
          case 'gallery':
            return (
              <section key={i} className="block">
                <h2>Photo Gallery</h2>
                <div className="gallery-grid">
                  {block.photos?.map((p, j) => (
                    <figure key={j} className="gallery-item">
                      <div className={`photo-placeholder tone-${p.tone}`}>
                        <span>{p.label}</span>
                      </div>
                      <figcaption>
                        <strong>{p.label}</strong>
                        <span>{p.caption}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            );
          case 'images':
            return (
              <section key={i} className="block home-images-section">
                {block.title && <h2>{block.title}</h2>}
                <div className="home-images-grid">
                  {block.images?.map((image, j) => (
                    <figure key={j} className="home-image-card">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={800}
                        className="home-image"
                      />
                      {image.caption && <figcaption>{image.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </section>
            );
          case 'downloads':
            return (
              <section key={i} className="block">
                {block.title && <h2>{block.title}</h2>}
                <ul className="download-list">
                  {block.files?.map((f, j) => (
                    <li key={j} className="download-item">
                      <div className="download-icon">PDF</div>
                      <div className="download-info">
                        <strong>{f.name}</strong>
                        <span>{f.description}</span>
                        <small>
                          {f.type} · {f.size} · Updated {f.updated}
                        </small>
                      </div>
                      <button className="btn-secondary" onClick={() => alert(`Demo: download of ${f.name} is not available in the preview.`)}>
                        Download
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          case 'positions':
            return (
              <section key={i} className="block">
                {block.title && <h2>{block.title}</h2>}
                <div className="positions-list">
                  {block.positions?.map((p, j) => (
                    <div key={j} className="position-card">
                      <strong>{p.title}</strong>
                      <span>
                        {p.dept} · {p.loc} · {p.type}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            );
          case 'locations':
            return (
              <section key={i} className="block">
                <h2>Our Locations</h2>
                <div className="locations-grid">
                  {block.locations?.map((l, j) => (
                    <div key={j} className="location-card">
                      <h3>{l.name}</h3>
                      {l.lines.map((line, k) => (
                        <p key={k}>{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            );
          case 'form':
            return <FormBlock key={i} kind={block.formKind ?? 'contact'} title={block.title ?? 'Contact'} />;
          case 'news':
            return (
              <section key={i} className="block">
                {block.title && <h2>{block.title}</h2>}
                <div className="news-list">
                  {block.newsItems?.map((n, j) => (
                    <article key={j} className="news-item">
                      <span className="news-date">{n.date}</span>
                      <h3>{n.title}</h3>
                      <p>{n.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
          case 'links':
            return (
              <section key={i} className="block">
                {block.title && <h2>{block.title}</h2>}
                <ul className="styled-list">
                  {block.links?.map((l, j) => (
                    <li key={j}>
                      <a href={`#${l.path}`}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          case 'highlight':
            return (
              <section key={i} className="highlight-box">
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </section>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}