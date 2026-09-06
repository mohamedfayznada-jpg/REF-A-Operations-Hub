# REF-A Operations Hub

A new, standalone Manufacturing Operations Management System for the Final Assembly & Packaging department.

## Project principles

- This repository is independent and starts from zero.
- No code, database, UI, Firebase project, or business logic is inherited from previous factory applications.
- Arabic-first and RTL by default, with English-ready architecture.
- Configuration before assumptions: real production standards must be entered as master data, never invented in code.
- Transaction history is auditable and should not be destructively overwritten.
- Analytics must be traceable back to stored source records.

## Target platform

- Next.js + TypeScript
- PostgreSQL / Supabase
- Authentication + RBAC + Row Level Security
- Responsive web application for management, supervisors, engineers, and shop-floor users

## Core domains

Production, quality, defects, scrap, rework, manpower, attendance, materials, returns, downtime, critical processes, checklists, SPC/control charts, CAPA, SOP/work instructions, KPIs, reporting, and audit trail.

## Current status

Initial project bootstrap. Application code and database migrations will be added incrementally with every functional milestone kept reviewable in GitHub.

## Non-negotiable rule

A missing factory standard is displayed as **N/A / Not configured**. The system must never silently fabricate a target, limit, takt time, consumption standard, defect threshold, or acceptance criterion.
