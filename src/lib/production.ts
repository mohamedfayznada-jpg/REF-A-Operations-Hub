import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

export type ProductionHourlyInput = {
  businessDate: string;
  shiftId: string;
  lineId: string;
  modelId: string;
  hourStart: string;
  planQty: number;
  actualQty: number;
  goodQty: number;
  defectQty: number;
  downtimeMinutes: number;
  enteredBy: string;
};

export function validateProduction(input: ProductionHourlyInput) {
  const errors: string[] = [];
  for (const [key, value] of Object.entries(input)) {
    if (["planQty", "actualQty", "goodQty", "defectQty", "downtimeMinutes"].includes(key) && typeof value === "number" && value < 0) errors.push(`${key} must be non-negative`);
  }
  if (input.goodQty + input.defectQty > input.actualQty) errors.push("goodQty + defectQty cannot exceed actualQty");
  if (!input.businessDate || !input.shiftId || !input.lineId || !input.modelId || !input.hourStart) errors.push("businessDate, shift, line, model and hour are required");
  return errors;
}

export async function findHourlyProduction(input: Pick<ProductionHourlyInput, "businessDate" | "shiftId" | "lineId" | "modelId" | "hourStart">) {
  const q = query(collection(db, "productionHourly"), where("businessDate", "==", input.businessDate), where("shiftId", "==", input.shiftId), where("lineId", "==", input.lineId), where("modelId", "==", input.modelId), where("hourStart", "==", input.hourStart));
  return (await getDocs(q)).docs;
}

export async function createHourlyProduction(input: ProductionHourlyInput) {
  const errors = validateProduction(input);
  if (errors.length) throw new Error(errors.join("; "));
  const existing = await findHourlyProduction(input);
  if (existing.length) throw new Error("An hourly production record already exists for this date/shift/line/model/hour");
  return addDoc(collection(db, "productionHourly"), { ...input, status: "posted", createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
}

export async function getProductionRecord(id: string) {
  return getDoc(doc(db, "productionHourly", id));
}

export function productionKpis(records: Array<Partial<ProductionHourlyInput>>) {
  const plan = records.reduce((s, r) => s + (r.planQty ?? 0), 0);
  const actual = records.reduce((s, r) => s + (r.actualQty ?? 0), 0);
  const good = records.reduce((s, r) => s + (r.goodQty ?? 0), 0);
  const defects = records.reduce((s, r) => s + (r.defectQty ?? 0), 0);
  const downtime = records.reduce((s, r) => s + (r.downtimeMinutes ?? 0), 0);
  return { plan, actual, good, defects, downtime, planAttainment: plan > 0 ? actual / plan * 100 : null, yield: actual > 0 ? good / actual * 100 : null, defectRate: actual > 0 ? defects / actual * 100 : null };
}
