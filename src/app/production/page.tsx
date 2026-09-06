"use client";

import { FormEvent, useState } from "react";
import { createHourlyProduction } from "@/lib/production";

export default function ProductionPage() {
  const [form, setForm] = useState({ businessDate: "", shiftId: "", lineId: "", modelId: "", hourStart: "", planQty: "", actualQty: "", goodQty: "", defectQty: "", downtimeMinutes: "", enteredBy: "" });
  const [message, setMessage] = useState("");
  const set = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));
  async function submit(e: FormEvent) {
    e.preventDefault(); setMessage("جاري الحفظ…");
    try {
      await createHourlyProduction({ ...form, planQty: Number(form.planQty || 0), actualQty: Number(form.actualQty || 0), goodQty: Number(form.goodQty || 0), defectQty: Number(form.defectQty || 0), downtimeMinutes: Number(form.downtimeMinutes || 0) });
      setMessage("تم تسجيل ساعة الإنتاج بنجاح.");
    } catch (err) { setMessage(err instanceof Error ? err.message : "تعذر الحفظ"); }
  }
  const fields = [["businessDate","التاريخ","date"],["shiftId","الشيفت","text"],["lineId","خط الإنتاج","text"],["modelId","الموديل","text"],["hourStart","بداية الساعة","time"],["planQty","الخطة","number"],["actualQty","الإنتاج الفعلي","number"],["goodQty","السليم","number"],["defectQty","العيوب","number"],["downtimeMinutes","دقائق التوقف","number"],["enteredBy","معرّف المستخدم","text"]];
  return <main className="module-page"><header><a href="/">← مركز التحكم</a><p className="eyebrow">PRODUCTION / HOURLY</p><h1>الإنتاج بالساعة</h1><p>تسجيل معاملات الإنتاج مع منع التكرار والتحقق من الاتساق الحسابي.</p></header><form onSubmit={submit} className="form-grid">{fields.map(([key,label,type])=><label key={key}>{label}<input required={!["planQty","actualQty","goodQty","defectQty","downtimeMinutes"].includes(key)} type={type} min={type === "number" ? "0" : undefined} value={form[key as keyof typeof form]} onChange={e=>set(key,e.target.value)} /></label>)}<div className="form-actions"><button type="submit">حفظ المعاملة</button><span>{message}</span></div></form><section className="panel"><h2>قواعد البيانات</h2><ul><li>لا يسمح بقيم سالبة.</li><li>السليم + العيوب لا يتجاوز الإنتاج الفعلي.</li><li>المعاملة الفريدة هي: التاريخ + الشيفت + الخط + الموديل + الساعة.</li><li>الأهداف والمعايير غير المعرفة تظهر N/A ولا يتم افتراضها.</li></ul></section></main>;
}
