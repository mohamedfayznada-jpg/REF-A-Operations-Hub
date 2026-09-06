# REF-A Operations Hub — Architecture

## Scope

This is a greenfield application for the Final Assembly & Packaging department. It has no technical or data dependency on earlier factory applications.

## Layers

1. **Experience** — Next.js App Router, TypeScript, RTL Arabic-first UX.
2. **Application** — domain-oriented modules and server-side validation.
3. **Data** — PostgreSQL/Supabase with normalized transactional tables, constraints, indexes, and auditable history.
4. **Security** — authentication, role-based access control, and row-level security before production rollout.
5. **Analytics** — server-side aggregations/views so KPI values can be reconciled with source transactions.

## Configuration policy

The system distinguishes between:

- **Configured** — a standard/limit/target exists and is effective for the selected date/context.
- **N/A / Not configured** — configuration is missing; the UI must not substitute an invented value.
- **Observed** — an actual transaction or measurement recorded by an authorized user.

## Module boundaries

### Production
Plans and hourly actuals keyed by business date, shift, line and model.

### Quality
Defect events, disposition, rework/scrap and traceability back to process/model/time.

### Manpower
Employees, attendance, skills, training and station assignment.

### Materials
Material master, effective standards, issue/return/adjustment transactions and variance analysis.

### Critical processes
Critical control points, specifications, measurement records and reaction plans.

### SPC
Control chart calculations based only on stored observations. Chart type and limits depend on configured measurement/attribute characteristics and sampling rules.

### Checklists
Versioned templates, execution instances and item-level responses.

### CAPA
Corrective/preventive actions linked to a source problem, owner, due date and closure evidence.

## Production-readiness gates

Before real shop-floor use, the project must have:

- Supabase project connected through environment variables.
- Authentication and RBAC enabled.
- RLS policies verified.
- Production master data configured by authorized users.
- Real standards and specifications entered and approved.
- Automated tests and CI green.
- Backup/recovery strategy documented.
- Audit trail validated.
- Operational reports reconciled against source transactions.
