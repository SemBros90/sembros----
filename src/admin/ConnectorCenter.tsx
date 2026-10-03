import { useState } from 'react';
import {
  CATEGORIES,
  connectors as initialConnectors,
  type Connector,
  type ConnectorStatus,
  type HealthStatus,
} from './adminData';

function makeId(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function timestamp(): string {
  return new Date().toISOString();
}

function logEntry(action: string, detail: string) {
  return {
    id: makeId('log'),
    timestamp: timestamp(),
    action,
    detail,
  };
}

function updateConnector(
  connectors: Connector[],
  id: string,
  patch: Partial<Connector>,
  action: string,
  detail: string
): Connector[] {
  return connectors.map((connector) => {
    if (connector.id !== id) return connector;
    const updated = {
      ...connector,
      ...patch,
      auditLog: [logEntry(action, detail), ...connector.auditLog].slice(0, 12),
    };
    return updated;
  });
}

export default function ConnectorCenter() {
  const [connectors, setConnectors] = useState<Connector[]>(initialConnectors);
  const [notice, setNotice] = useState<string | null>(null);

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2600);
  };

  const handleConnect = (connector: Connector) => {
    setConnectors((prev) =>
      updateConnector(
        prev,
        connector.id,
        { status: 'connected' as ConnectorStatus, lastSync: timestamp() },
        'connected',
        `${connector.name} connected successfully.`
      )
    );
    flash(`${connector.name} connected.`);
  };

  const handleDisconnect = (connector: Connector) => {
    setConnectors((prev) =>
      updateConnector(
        prev,
        connector.id,
        { status: 'disconnected' as ConnectorStatus, lastSync: null, health: 'unknown' as HealthStatus },
        'disconnected',
        `${connector.name} disconnected by admin.`
      )
    );
    flash(`${connector.name} disconnected.`);
  };

  const handleTestConnection = (connector: Connector) => {
    const passed = Math.random() > 0.18;
    const nextStatus: ConnectorStatus = passed
      ? connector.status === 'disconnected'
        ? 'configured'
        : connector.status
      : 'error';
    setConnectors((prev) =>
      updateConnector(
        prev,
        connector.id,
        { status: nextStatus, lastSync: timestamp() },
        'test_connection',
        passed
          ? `${connector.name} responded successfully.`
          : `${connector.name} test failed; check settings in admin database.`
      )
    );
    flash(`${connector.name} test ${passed ? 'passed' : 'failed'}.`);
  };

  const handleHealthCheck = (connector: Connector) => {
    const health: HealthStatus = Math.random() > 0.25 ? 'healthy' : 'degraded';
    setConnectors((prev) =>
      updateConnector(
        prev,
        connector.id,
        { health, lastSync: timestamp() },
        'health_check',
        `${connector.name} health check returned "${health}".`
      )
    );
    flash(`${connector.name} health check complete.`);
  };

  return (
    <section>
      <div className="admin-notice">
        <p>
          All connector settings are stored in the <strong>admin database</strong>.
          Credentials are masked and never exposed to the public site.
        </p>
      </div>

      {notice && <div className="admin-toast">{notice}</div>}

      {CATEGORIES.map((category) => {
        const items = connectors.filter((c) => c.category === category);
        if (items.length === 0) return null;

        return (
          <div className="connector-category" key={category}>
            <div className="connector-category-heading">
              <h2>{category}</h2>
              <span>{items.length} connector{items.length === 1 ? '' : 's'}</span>
            </div>

            <div className="connector-grid">
              {items.map((connector) => (
                <article className="connector-card" key={connector.id}>
                  <header className="connector-card-header">
                    <div>
                      <h3>{connector.name}</h3>
                      <p>{connector.description}</p>
                    </div>
                  </header>

                  <div className="connector-badges">
                    <span className={`status-badge status-${connector.status}`}>
                      {connector.status}
                    </span>
                    <span className={`health-badge health-${connector.health}`}>
                      {connector.health}
                    </span>
                  </div>

                  <div className="connector-meta-row">
                    <span>Last Sync</span>
                    <strong>
                      {connector.lastSync
                        ? new Date(connector.lastSync).toLocaleString()
                        : 'Never'}
                    </strong>
                  </div>

                  <details className="connector-settings">
                    <summary>Settings stored in admin database</summary>
                    <table>
                      <tbody>
                        {connector.settings.map((setting) => (
                          <tr key={setting.key}>
                            <td>{setting.key}</td>
                            <td>{setting.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </details>

                  <details className="connector-audit">
                    <summary>Audit Log ({connector.auditLog.length})</summary>
                    <ul>
                      {connector.auditLog.map((entry) => (
                        <li key={entry.id}>
                          <time>{new Date(entry.timestamp).toLocaleString()}</time>
                          <span className="audit-action">{entry.action}</span>
                          <span>{entry.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="connector-actions">
                    <button
                      className="admin-btn"
                      onClick={() => handleConnect(connector)}
                      disabled={connector.status === 'connected'}
                    >
                      Connect
                    </button>
                    <button
                      className="admin-btn admin-btn-secondary"
                      onClick={() => handleDisconnect(connector)}
                      disabled={connector.status === 'disconnected'}
                    >
                      Disconnect
                    </button>
                    <button className="admin-btn" onClick={() => handleTestConnection(connector)}>
                      Test Connection
                    </button>
                    <button className="admin-btn" onClick={() => handleHealthCheck(connector)}>
                      Health Check
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}