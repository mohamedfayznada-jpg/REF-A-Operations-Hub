# REF-A Operations Hub — Firestore Schema

All operational standards and limits are configurable. The application must show `N/A` when a required target/limit has not been configured; it must never invent factory standards.

## Core master data
- `organizations/{organizationId}` — company/site identity.
- `departments/{departmentId}` — department and ownership.
- `lines/{lineId}` — production lines.
- `stations/{stationId}` — workstations / process points.
- `models/{modelId}` — refrigerator models/SKUs.
- `shifts/{shiftId}` — shift code, start/end and active status.
- `employees/{employeeId}` — employee master data and role.

## Production
- `productionPlans/{planId}` — business date, shift, line, model, planned quantity, version, status.
- `productionHourly/{recordId}` — business date, shift, line, model, hour start, plan quantity, actual quantity, good quantity, defect quantity, downtime minutes, enteredBy, timestamps, status.

The logical uniqueness key for hourly production is:
`businessDate + shiftId + lineId + modelId + hourStart`.

## Quality
- `defectEvents/{defectId}` — defect code/category, quantity, source, station, model, shift, disposition, timestamps.
- `downtimeEvents/{downtimeId}` — start/end, duration, reason, station, owner, status.
- `criticalControlPoints/{ccpId}` — process control, specification, unit, limits, reaction plan.
- `criticalChecks/{checkId}` — observed value/result, status, operator, timestamp.
- `spcCharacteristics/{characteristicId}` — characteristic configuration and chart type.
- `spcSamples/{sampleId}` — measurements and calculated chart signals.

## Materials
- `materials/{materialId}` — material/SKU master.
- `materialStandards/{standardId}` — configurable standard usage per model/process.
- `materialTransactions/{transactionId}` — issue, return, adjustment and consumption transactions.

## Execution / improvement
- `checklistTemplates/{templateId}`
- `checklistRuns/{runId}`
- `checklistResponses/{responseId}`
- `capas/{capaId}` — problem, containment, root cause, corrective/preventive actions, owner, due date, verification.
- `sopDocuments/{sopId}` — controlled document metadata and Storage path.
- `auditLog/{auditId}` — append-only operational audit trail.

## KPI rules
- Plan attainment = actual / plan × 100 only when plan > 0.
- Yield = good / actual × 100 only when actual > 0.
- Defect rate = defects / actual × 100 only when actual > 0.
- Downtime = sum of recorded downtime minutes.

No KPI target, control limit, takt, standard consumption, staffing standard or threshold is assumed until configured in master data.
