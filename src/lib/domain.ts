export type ModuleKey =
  | "production"
  | "quality"
  | "manpower"
  | "materials"
  | "critical-processes"
  | "spc"
  | "checklists"
  | "capa"
  | "reports";

export type RecordStatus = "draft" | "active" | "closed" | "cancelled";

export interface ProductionHourlyRecord {
  businessDate: string;
  shiftId: string;
  lineId: string;
  modelId: string;
  hourStart: string;
  planQty: number | null;
  actualQty: number | null;
  goodQty: number | null;
  defectQty: number | null;
  downtimeMinutes: number | null;
}

export interface DefectEvent {
  id: string;
  eventTime: string;
  lineId: string;
  modelId: string;
  defectCode: string;
  quantity: number;
  disposition: "rework" | "scrap" | "use-as-is" | "hold" | "unknown";
}

export interface MaterialTransaction {
  id: string;
  timestamp: string;
  materialId: string;
  transactionType: "issue" | "return" | "adjustment";
  quantity: number;
  reference: string | null;
}

export interface CriticalCheck {
  id: string;
  checkedAt: string;
  ccpId: string;
  stationId: string;
  result: "pass" | "fail" | "not-checked";
  measuredValue: number | null;
  unit: string | null;
  reactionRequired: boolean;
}
