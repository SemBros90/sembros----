import { useMemo, useState } from 'react';
import type { ArtifactType, SupabaseArtifact } from './adminData';
import { supabaseArtifacts } from './adminData';

const artifactLabels: Record<ArtifactType, string> = {
  tables: 'Tables',
  rls_policies: 'RLS Policies',
  functions: 'Functions',
  triggers: 'Triggers',
  seed_data: 'Seed Data',
  migration: 'Migration Scripts',
  types: 'TypeScript Types',
};

const artifactOrder: ArtifactType[] = [
  'tables',
  'rls_policies',
  'functions',
  'triggers',
  'seed_data',
  'migration',
  'types',
];

export default function SupabaseManager() {
  const [selectedType, setSelectedType] = useState<ArtifactType>('tables');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentArtifact = useMemo<SupabaseArtifact | undefined>(
    () => supabaseArtifacts.find((artifact) => artifact.type === selectedType),
    [selectedType],
  );

  const copyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  const downloadText = (artifact: SupabaseArtifact) => {
    const extension = artifact.language === 'sql' ? 'sql' : 'ts';
    const blob = new Blob([artifact.code], {
      type: artifact.language === 'sql' ? 'application/sql' : 'text/typescript',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sembros-${artifact.type}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const allCode = supabaseArtifacts
      .map((artifact) => `-- ${artifact.title}\n${artifact.code}`)
      .join('\n\n');
    const blob = new Blob([allCode], { type: 'application/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sembros-supabase-all.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="supabase-manager">
      <header className="supabase-header">
        <h1>Supabase Manager</h1>
        <p>
          Generate tables, RLS policies, functions, triggers, seed data,
          migration scripts, and TypeScript types for the admin database.
        </p>
        <div className="supabase-safety-badge">Safe mode · no destructive migrations</div>
      </header>

      <nav className="supabase-tabs" aria-label="Supabase artifact types">
        {artifactOrder.map((type) => (
          <button
            key={type}
            className={`supabase-tab ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {artifactLabels[type]}
          </button>
        ))}
      </nav>

      {currentArtifact ? (
        <section className="supabase-artifact-card">
          <div className="supabase-preview-header">
            <div>
              <h2>{currentArtifact.title}</h2>
              <p>{currentArtifact.description}</p>
            </div>
            <div className="supabase-actions">
              <button
                className="supabase-copy-btn"
                onClick={() => copyText(currentArtifact.code, currentArtifact.id)}
              >
                {copiedId === currentArtifact.id ? 'Copied!' : `Copy ${currentArtifact.language === 'sql' ? 'SQL' : 'Types'}`}
              </button>
              <button
                className="supabase-download-btn"
                onClick={() => downloadText(currentArtifact)}
              >
                Download {currentArtifact.language === 'sql' ? 'SQL' : 'Types'}
              </button>
            </div>
          </div>

          <div className="supabase-code-preview">
            <pre>
              <code>{currentArtifact.code}</code>
            </pre>
          </div>
        </section>
      ) : (
        <p className="supabase-empty">No artifact available for this type.</p>
      )}

      <footer className="supabase-footer">
        <button className="supabase-copy-all" onClick={() => copyText(
          supabaseArtifacts.map((a) => a.code).join('\n\n'),
          'all',
        )}>
          {copiedId === 'all' ? 'Copied all!' : 'Copy All SQL/Types'}
        </button>
        <button className="supabase-download-all" onClick={downloadAll}>
          Download All
        </button>
      </footer>
    </div>
  );
}