create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists departments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  code text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (organization_id, code)
);

create table if not exists lines (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references departments(id),
  code text not null,
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (department_id, code)
);

create table if not exists stations (
  id uuid primary key default gen_random_uuid(),
  line_id uuid not null references lines(id),
  code text not null,
  name text not null,
  sequence_no integer not null,
  active boolean not null default true,
  unique (line_id, code),
  unique (line_id, sequence_no)
);

create table if not exists processes (
  id uuid primary key default gen_random_uuid(),
  station_id uuid not null references stations(id),
  code text not null,
  name text not null,
  description text,
  active boolean not null default true,
  unique (station_id, code)
);

create table if not exists models (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  active boolean not null default true
);

create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  start_time time not null,
  end_time time not null,
  active boolean not null default true
);

create table if not exists production_plans (
  id uuid primary key default gen_random_uuid(),
  business_date date not null,
  shift_id uuid not null references shifts(id),
  line_id uuid not null references lines(id),
  model_id uuid not null references models(id),
  planned_qty integer,
  status text not null default 'draft' check (status in ('draft','released','closed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists production_hourly (
  id uuid primary key default gen_random_uuid(),
  business_date date not null,
  shift_id uuid not null references shifts(id),
  line_id uuid not null references lines(id),
  model_id uuid not null references models(id),
  hour_start time not null,
  plan_qty integer,
  actual_qty integer,
  good_qty integer,
  defect_qty integer,
  downtime_minutes integer,
  created_at timestamptz not null default now(),
  unique (business_date, shift_id, line_id, model_id, hour_start),
  check (plan_qty is null or plan_qty >= 0),
  check (actual_qty is null or actual_qty >= 0),
  check (good_qty is null or good_qty >= 0),
  check (defect_qty is null or defect_qty >= 0),
  check (downtime_minutes is null or downtime_minutes >= 0)
);

create table if not exists defect_events (
  id uuid primary key default gen_random_uuid(),
  event_time timestamptz not null default now(),
  line_id uuid not null references lines(id),
  model_id uuid not null references models(id),
  process_id uuid references processes(id),
  defect_code text not null,
  quantity integer not null check (quantity > 0),
  disposition text not null default 'unknown' check (disposition in ('rework','scrap','use-as-is','hold','unknown')),
  notes text
);

create table if not exists downtime_events (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null,
  ended_at timestamptz,
  line_id uuid not null references lines(id),
  station_id uuid references stations(id),
  reason_code text not null,
  minutes integer check (minutes is null or minutes >= 0),
  notes text,
  status text not null default 'open' check (status in ('open','closed','cancelled'))
);

create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  uom text not null,
  active boolean not null default true
);

create table if not exists material_standards (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references models(id),
  material_id uuid not null references materials(id),
  standard_qty numeric(18,6),
  effective_from date not null,
  effective_to date,
  unique (model_id, material_id, effective_from)
);

create table if not exists material_transactions (
  id uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  material_id uuid not null references materials(id),
  line_id uuid references lines(id),
  transaction_type text not null check (transaction_type in ('issue','return','adjustment')),
  quantity numeric(18,6) not null check (quantity <> 0),
  reference text,
  notes text
);

create table if not exists critical_control_points (
  id uuid primary key default gen_random_uuid(),
  process_id uuid not null references processes(id),
  code text not null,
  name text not null,
  unit text,
  lower_spec numeric(18,6),
  upper_spec numeric(18,6),
  reaction_plan text,
  active boolean not null default true,
  unique (process_id, code)
);

create table if not exists critical_checks (
  id uuid primary key default gen_random_uuid(),
  checked_at timestamptz not null default now(),
  ccp_id uuid not null references critical_control_points(id),
  station_id uuid not null references stations(id),
  result text not null check (result in ('pass','fail','not-checked')),
  measured_value numeric(18,6),
  reaction_required boolean not null default false,
  notes text
);

create table if not exists checklist_templates (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  version integer not null default 1,
  active boolean not null default true
);

create table if not exists checklist_items (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references checklist_templates(id) on delete cascade,
  sequence_no integer not null,
  prompt text not null,
  response_type text not null check (response_type in ('yes-no','pass-fail','numeric','text')),
  required boolean not null default true,
  unique (template_id, sequence_no)
);

create table if not exists checklist_runs (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references checklist_templates(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'open' check (status in ('open','completed','cancelled'))
);

create table if not exists checklist_responses (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references checklist_runs(id) on delete cascade,
  item_id uuid not null references checklist_items(id),
  text_value text,
  numeric_value numeric(18,6),
  boolean_value boolean,
  passed boolean,
  unique (run_id, item_id)
);

create table if not exists capa_actions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_type text not null,
  source_id uuid,
  root_cause text,
  action text not null,
  owner_name text,
  due_date date,
  completed_at timestamptz,
  status text not null default 'open' check (status in ('open','in-progress','completed','cancelled'))
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  actor text,
  entity_name text not null,
  entity_id uuid,
  action text not null,
  before_data jsonb,
  after_data jsonb
);

create index if not exists idx_production_hourly_date_shift on production_hourly (business_date, shift_id);
create index if not exists idx_defect_events_time on defect_events (event_time);
create index if not exists idx_downtime_events_start on downtime_events (started_at);
create index if not exists idx_material_transactions_time on material_transactions (occurred_at);
create index if not exists idx_critical_checks_time on critical_checks (checked_at);
create index if not exists idx_audit_log_time on audit_log (occurred_at);
