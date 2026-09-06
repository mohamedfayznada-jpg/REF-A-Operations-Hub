-- Demo configuration only. No real factory standards are embedded here.
insert into organizations (code, name)
values ('DEMO', 'Demo Organization')
on conflict (code) do nothing;

insert into departments (organization_id, code, name)
select id, 'REF-A-FAP', 'Final Assembly & Packaging'
from organizations where code = 'DEMO'
on conflict (organization_id, code) do nothing;

insert into lines (department_id, code, name)
select id, 'LINE-01', 'Configurable Production Line'
from departments where code = 'REF-A-FAP'
on conflict (department_id, code) do nothing;

insert into shifts (code, name, start_time, end_time)
values
  ('S1', 'Shift 1', '07:30', '15:30'),
  ('S2', 'Shift 2', '15:30', '23:30')
on conflict (code) do nothing;

insert into models (code, name)
values ('MODEL-DEMO', 'Demo Model — Configure real models')
on conflict (code) do nothing;

insert into stations (line_id, code, name, sequence_no)
select id, 'ST-01', 'Station 01 — Configure name', 1
from lines where code = 'LINE-01'
on conflict (line_id, code) do nothing;

insert into processes (station_id, code, name, description)
select id, 'PROC-01', 'Process 01 — Configure', 'Demo process. Configure the real operation before production use.'
from stations where code = 'ST-01'
on conflict (station_id, code) do nothing;
