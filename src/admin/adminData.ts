export type CategoryId =
  | 'Supabase'
  | 'Email'
  | 'Authentication'
  | 'Storage'
  | 'AI Providers'
  | 'Communication'
  | 'Marketing'
  | 'Repository';

export type ConnectorStatus = 'connected' | 'disconnected' | 'configured' | 'error';
export type HealthStatus = 'healthy' | 'degraded' | 'unknown';

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
}

export interface ConnectorSetting {
  key: string;
  value: string;
}

export interface Connector {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  status: ConnectorStatus;
  health: HealthStatus;
  lastSync: string | null;
  settings: ConnectorSetting[];
  auditLog: AuditEntry[];
}

export const CATEGORIES: CategoryId[] = [
  'Supabase',
  'Email',
  'Authentication',
  'Storage',
  'AI Providers',
  'Communication',
  'Marketing',
  'Repository',
];

export type ArtifactType =
  | 'tables'
  | 'rls_policies'
  | 'functions'
  | 'triggers'
  | 'seed_data'
  | 'migration'
  | 'types';

export interface SupabaseArtifact {
  id: string;
  type: ArtifactType;
  title: string;
  description: string;
  language: 'sql' | 'typescript';
  code: string;
}

export const supabaseArtifacts: SupabaseArtifact[] = [
  {
    id: 'tables',
    type: 'tables',
    title: 'Tables',
    description: 'Core admin and authorization tables.',
    language: 'sql',
    code: `-- Sembros Admin Tables
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.connector_settings (
  id uuid primary key default gen_random_uuid(),
  connector_id text not null,
  key text not null,
  value text not null,
  updated_at timestamptz not null default now(),
  unique (connector_id, key)
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor text not null,
  action text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);`,
  },
  {
    id: 'rls',
    type: 'rls_policies',
    title: 'RLS Policies',
    description: 'Row-level security for all admin tables.',
    language: 'sql',
    code: `-- RLS Policies
alter table public.admin_users enable row level security;
alter table public.connector_settings enable row level security;
alter table public.audit_logs enable row level security;

create policy "Admins can read all users"
  on public.admin_users for select
  using (auth.role() = 'admin');

create policy "Admins can insert users"
  on public.admin_users for insert
  with check (auth.role() = 'admin');

create policy "Admins can manage connector settings"
  on public.connector_settings for all
  using (auth.role() = 'admin')
  with check (auth.role() = 'admin');

create policy "Audit logs are viewable by admins"
  on public.audit_logs for select
  using (auth.role() = 'admin');`,
  },
  {
    id: 'functions',
    type: 'functions',
    title: 'Functions',
    description: 'Server functions for connector health and sync.',
    language: 'sql',
    code: `-- Functions
create or replace function public.get_connector_health(connector_id text)
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'status', 'healthy',
    'last_sync', now() - interval '5 minutes'
  );
$$;

create or replace function public.sync_connector(connector_id text)
returns void
language plpgsql
security definer
as $$
begin
  update public.connector_settings
  set updated_at = now()
  where connector_id = sync_connector.connector_id;

  insert into public.audit_logs (actor, action, detail)
  values (auth.uid()::text, 'sync', jsonb_build_object('connector', connector_id));
end;
$$;`,
  },
  {
    id: 'triggers',
    type: 'triggers',
    title: 'Triggers',
    description: 'Automated audit logging and updated_at maintenance.',
    language: 'sql',
    code: `-- Triggers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger connector_settings_updated
  before update on public.connector_settings
  for each row
  execute function public.set_updated_at();

create or replace function public.log_connector_change()
returns trigger
language plpgsql
as $$
begin
  insert into public.audit_logs (actor, action, detail)
  values (auth.uid()::text, tg_op, to_jsonb(new));
  return new;
end;
$$;

create trigger connector_settings_audit
  after insert or update or delete on public.connector_settings
  for each row
  execute function public.log_connector_change();`,
  },
  {
    id: 'seed',
    type: 'seed_data',
    title: 'Seed Data',
    description: 'Baseline connector categories and settings.',
    language: 'sql',
    code: `-- Seed Data
insert into public.connector_settings (connector_id, key, value) values
  ('supabase-production', 'Project URL', 'https://sembros-admin.supabase.co'),
  ('supabase-production', 'API Key', '•••••••• (admin database)'),
  ('smtp-transactional', 'SMTP Host', 'smtp.sembros-electric.test'),
  ('smtp-transactional', 'Port', '587'),
  ('sso-auth', 'Issuer', 'sembros-sso'),
  ('sso-auth', 'Token TTL', '45 minutes')
on conflict (connector_id, key) do nothing;`,
  },
  {
    id: 'migration',
    type: 'migration',
    title: 'Migration Scripts',
    description: 'All schema changes as idempotent migrations.',
    language: 'sql',
    code: `-- Migration: 001_admin_core.sql
begin;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.connector_settings (
  id uuid primary key default gen_random_uuid(),
  connector_id text not null,
  key text not null,
  value text not null,
  updated_at timestamptz not null default now(),
  unique (connector_id, key)
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor text not null,
  action text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

commit;`,
  },
  {
    id: 'types',
    type: 'types',
    title: 'TypeScript Types',
    description: 'Generated types for the admin database schema.',
    language: 'typescript',
    code: `export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
  created_at: string;
}

export interface ConnectorSetting {
  id: string;
  connector_id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface AuditLog {
  id: number;
  actor: string;
  action: string;
  detail: Record<string, unknown> | null;
  created_at: string;
}

export interface ConnectorHealth {
  status: 'healthy' | 'degraded' | 'unknown';
  last_sync: string;
}`,
  },
];

const categorySettings: Record<CategoryId, ConnectorSetting[]> = {
  Supabase: [
    { key: 'Project URL', value: 'https://sembros-admin.supabase.co' },
    { key: 'API Key', value: '•••••••• (admin database)' },
    { key: 'Region', value: 'eu-central-1' },
  ],
  Email: [
    { key: 'SMTP Host', value: 'smtp.sembros-electric.test' },
    { key: 'Port', value: '587' },
    { key: 'From Address', value: 'no-reply@sembros-electric.com' },
  ],
  Authentication: [
    { key: 'Issuer', value: 'sembros-sso' },
    { key: 'Token TTL', value: '45 minutes' },
    { key: 'MFA', value: 'enabled' },
  ],
  Storage: [
    { key: 'Bucket', value: 'sembros-admin-assets' },
    { key: 'Region', value: 'eu-west-1' },
    { key: 'CDN', value: 'enabled' },
  ],
  'AI Providers': [
    { key: 'Model', value: 'gpt-4.1' },
    { key: 'Temperature', value: '0.2' },
    { key: 'Provider', value: 'OpenAI-compatible endpoint' },
  ],
  Communication: [
    { key: 'Webhook URL', value: 'https://hooks.sembros.test/admin' },
    { key: 'Slack Channel', value: '#admin-ops' },
    { key: 'Retry Policy', value: 'exponential, 5 attempts' },
  ],
  Marketing: [
    { key: 'Segment Key', value: 'dummy-segment-key' },
    { key: 'Attribution Window', value: '30 days' },
    { key: 'Campaign Prefix', value: 'ADMIN-' },
  ],
  Repository: [
    { key: 'Provider', value: 'GitHub' },
    { key: 'Repository', value: 'sembros/admin-portal' },
    { key: 'Default Branch', value: 'main' },
  ],
};

interface ConnectorSeed {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  status: ConnectorStatus;
  health: HealthStatus;
  lastSync: string | null;
}

const connectorSeeds: ConnectorSeed[] = [
  {
    id: 'supabase-production',
    name: 'Supabase Production',
    category: 'Supabase',
    description: 'Primary Supabase project for the admin database and API.',
    status: 'connected',
    health: 'healthy',
    lastSync: '2026-09-30T09:45:00.000Z',
  },
  {
    id: 'supabase-staging',
    name: 'Supabase Staging',
    category: 'Supabase',
    description: 'Staging Supabase project for safe schema migrations.',
    status: 'configured',
    health: 'unknown',
    lastSync: '2026-09-29T16:20:00.000Z',
  },
  {
    id: 'smtp-transactional',
    name: 'Transactional Email',
    category: 'Email',
    description: 'SMTP relay for admin notifications and alerts.',
    status: 'connected',
    health: 'healthy',
    lastSync: '2026-09-30T08:10:00.000Z',
  },
  {
    id: 'sso-auth',
    name: 'Admin SSO',
    category: 'Authentication',
    description: 'Single sign-on provider for admin authentication.',
    status: 'connected',
    health: 'healthy',
    lastSync: '2026-09-30T07:55:00.000Z',
  },
  {
    id: 'storage-assets',
    name: 'Asset Storage',
    category: 'Storage',
    description: 'Object storage for admin-generated reports and exports.',
    status: 'disconnected',
    health: 'unknown',
    lastSync: null,
  },
  {
    id: 'openai-admin',
    name: 'OpenAI Admin Assistant',
    category: 'AI Providers',
    description: 'AI assistant for admin data analysis and health checks.',
    status: 'configured',
    health: 'degraded',
    lastSync: '2026-09-28T14:30:00.000Z',
  },
  {
    id: 'slack-admin',
    name: 'Slack Admin Alerts',
    category: 'Communication',
    description: 'Slack channel for real-time admin notifications.',
    status: 'connected',
    health: 'healthy',
    lastSync: '2026-09-30T09:00:00.000Z',
  },
  {
    id: 'segment-admin',
    name: 'Segment for Admin',
    category: 'Marketing',
    description: 'Marketing analytics for admin feature adoption.',
    status: 'disconnected',
    health: 'unknown',
    lastSync: null,
  },
  {
    id: 'github-admin',
    name: 'GitHub Repository',
    category: 'Repository',
    description: 'Code repository for generated migrations and scripts.',
    status: 'connected',
    health: 'healthy',
    lastSync: '2026-09-30T06:45:00.000Z',
  },
];

export const connectors: Connector[] = connectorSeeds.map((seed) => ({
  ...seed,
  settings: categorySettings[seed.category],
  auditLog: [
    {
      id: `${seed.id}-init`,
      timestamp: '2026-09-01T12:00:00.000Z',
      action: 'initialized',
      detail: `Connector ${seed.name} registered in admin database.`,
    },
    ...(seed.status === 'connected'
      ? [
          {
            id: `${seed.id}-connect`,
            timestamp: seed.lastSync ?? '2026-09-30T09:00:00.000Z',
            action: 'connected',
            detail: `Connection established for ${seed.name}.`,
          },
        ]
      : []),
  ],
}));